
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('authToken');

const loadAllRentPost = () => {
  fetch(`${BASE_URL}/advertisement/list/?owner_id=${userId}`,{
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.length === 0) {
        document.getElementById('my_rent_post_table').innerHTML = 'my rent post not found';
      } else {
        console.log(data)
        displayAllRentPost(data);
      }
    });
};

function displayAllRentPost(rentposts) {

  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
  rentposts.forEach((rentpost, i) => {
    // const date = new Date(rent.created_at);
    const tr = document.createElement('tr');
        tr.innerHTML = `
          <th scope="row">${i + 1}</th>
          <td>${rentpost.title.slice(0,20)}..</td>
          <td class='text-center '>${rentpost.location}</td>
           <td class='text-center '>${rentpost.price}</td>
           <td class='text-center '>${rentpost.is_approved? "Success" :'Pending'}</td>
            <td>${rentpost.bedrooms}</td>
          <td>${rentpost.amenities}</td>
          <td class='text-center h4'>
           <a href="#">
            <ion-icon onclick="handleRentPostDelete('${rentpost.id}')" name="close-circle-outline"></ion-icon>
           </a>
          </td>
    `;

        tableBody.insertAdjacentElement('beforeend', tr);
  
  });
}

window.handleRentPostDelete = (id) => {
  fetch(`${BASE_URL}/advertisement/rent_request/${id}/`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        loadRequestRent();
      } else {
        console.error('Failed to delete favourite rent');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

document.addEventListener('DOMContentLoaded', loadAllRentPost);
