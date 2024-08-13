
const token=localStorage.getItem('authToken')
const userId=localStorage.getItem('userId')

// checking auth
if(!token && !userId){
  location.href='login.html'
  
}

const loadAllRentPost = () => {
  fetch(`${BASE_URL}/advertisement/list/?owner_id=${userId}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        document.getElementById('my_rent_post_table').innerHTML = `
          <div class='text-center mt-2'>
           <div class="overflow-hidden text-center" id="nodata">
                            <img class="h-25 w-25 object-fit-cover" style='width:100px;height:100px' src="./Images/no-data-found.jpg" alt="not data found image">
                        </div>  
             <a href='post_rent.html' class='text-decoration-none btn btn-primary'>Please Post Rent</a> 
          </div>
        `
      } else {

        displayAllRentPost(data);
      }
    });
};

function displayAllRentPost(rentposts) {

  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
  rentposts?.forEach((rentpost, i) => {
    // const date = new Date(rent.created_at);
    const tr = document.createElement('tr');
    tr.innerHTML = `
          <th scope="row">${i + 1}</th>
          <td>${rentpost.title.slice(0, 20)}..</td>
          <td class='text-center '>${rentpost.location}</td>
           <td class='text-center '>${rentpost.price}</td>
           <td class='text-center '>${rentpost.is_approved ? `<span class='text-success'>Success</span>` : `<span class='text-danger'>Pending</span>`}</td>
            <td>${rentpost.bedrooms}</td>
          <td>${rentpost.amenities}</td>
          <td class='text-center h4 d-flex gap-1 justify-content-center'>

          ${rentpost.is_approved ? `<a href="advertise_details.html?advertiseId=${rentpost.id}">
           <ion-icon class='text-success' name="eye-outline"></ion-icon>
             </a>`: ``}
          
           <a href="#">
            <ion-icon class='text-danger' onclick="handleRentPostDelete('${rentpost.id}')" name="close-circle-outline"></ion-icon>
           </a>
          </td>
    `;

    tableBody.insertAdjacentElement('beforeend', tr);

  });
}

window.handleRentPostDelete = (id) => {
  fetch(`${BASE_URL}/advertisement/list/${id}/`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  })
    .then((res) => {
      loadAllRentPost();
      if (res.ok) {
        console.log(res.json())
      } else {
        console.error('Failed to delete  rent');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

document.addEventListener('DOMContentLoaded', loadAllRentPost);
