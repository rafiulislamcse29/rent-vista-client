import { BASE_URL } from './baseUrl.js';

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('authToken');

// checking auth
if (!token && !userId) {
  location.href = 'login.html'
}

const loadRequestOnMyRent = () => {
  fetch(`${BASE_URL}/advertisement/rent_request/?owner_id=${userId}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        document.getElementById('rent_request_table').innerHTML = `
          <div class="overflow-hidden text-center mt-4" id="nodata">
               <img class="h-25 w-25 object-fit-cover" style='width:150px;height:140px' src="./Images/no-data-found.jpg" alt="not data found image">
          </div>
        `;
      } else {
        displayRequestOnMyRent(data);
      }
    });
};

function displayRequestOnMyRent(rent_requests) {

  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
  rent_requests.forEach((rent, i) => {
    const date = new Date(rent.created_at);
    const tr = document.createElement('tr');
    fetch(`${BASE_URL}/advertisement/list/${rent.advertisement}/`)
      .then(res => res.json())
      .then(data => {

        fetch(`${BASE_URL}/users/${rent.requester}/`)
          .then(res => res.json())
          .then(user => {
            tr.innerHTML = `
          <th scope="row">${i + 1}</th>
          <td class='text-center '>${user.first_name} ${user.last_name}</td>
           <td class='text-center '>${user.username}</td>
          <td>${data.title}</td>
          <td class='text-center '>${data.location}</td>
           <td class='text-center '>${data.price}</td>
           <td class='text-center '>${rent.is_accepted ? `<span class='text-success'>Success</span>` : `<span class='text-danger'>Pending</span>`}</td>
          <td>${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}</td>
          <td class='text-center h4 d-flex gap-3'>
            <a href="advertise_details.html?advertiseId=${rent.advertisement}">
           <ion-icon class='text-success' name="eye-outline"></ion-icon>
             </a>
      
             <a href="#">
           <ion-icon onclick="handleRequestOnMyRentEdit(
          '${rent.id}', 
          '${rent.is_accepted}', 
          '${rent.created_at}', 
          '${rent.advertisement}', 
          '${rent.requester}'
        )"  name="create-outline"></ion-icon>
           </a>

           <a href="#">
            <ion-icon class='text-danger' onclick="handleRequestOnMyRentDel( '${rent.id}')" name="close-circle-outline"></ion-icon>
           </a>

          </td>
    `;
            tableBody.insertAdjacentElement('afterbegin', tr);

          })

      })
  });
}

window.handleRequestOnMyRentDel = (id) => {


  // update advertisement is_request first false then delete request advertisement

  fetch(`${BASE_URL}/advertisement/rent_request/${id}/`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  })
    .then((res) => {
      console(res.json())
      if (res.ok) {
        // loadRequestOnMyRent();
      } else {
        console.error('Failed to delete Request On My Rent');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  // if (is_accepted == 'true') {

  //   fetch(`${BASE_URL}/advertisement/rent_request/${id}/`, {
  //     method: 'PUT',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Authorization': `Token ${token}`,
  //     },
  //     body: JSON.stringify({
  //       is_accepted: true,
  //       created_at,
  //       advertisement,
  //       requester
  //     })
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         // delete rent quest form owner
  //         fetch(`${BASE_URL}/advertisement/rent_request/${id}/`, {
  //           method: 'DELETE',
  //           headers: {
  //             'content-type': 'application/json',
  //             'Authorization': `Token ${token}`,
  //           },
  //         })
  //           .then((res) => {
  //             if (res.ok) {
  //               loadRequestOnMyRent();
  //             } else {
  //               console.error('Failed to delete Request On My Rent');
  //             }
  //           })
  //           .catch((error) => {
  //             console.error('Error:', error);
  //           });

  //       } else {
  //         console.error('Failed to update Request On My Rent');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // } else {

  //   // delete rent quest form owner
  //   fetch(`${BASE_URL}/advertisement/rent_request/${id}/`, {
  //     method: 'DELETE',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Authorization': `Token ${token}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         loadRequestOnMyRent();
  //       } else {
  //         console.error('Failed to delete Request On My Rent');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }
};



window.handleRequestOnMyRentEdit = (id, is_accepted, created_at, advertisement, requester) => {
  console.log('click')
  // fetch(`${BASE_URL}/advertisement/rent_request/?advertisement_id=${advertisement}`, {
  //   headers: {
  //     'content-type': 'application/json',
  //     'Authorization': `Token ${token}`,
  //   }
  // })
  //   .then(res => res.json())
  //   .then(data => {
  //     const isAppectedAdvetisement = data?.filter((reAdver => reAdver.is_accepted == true))
  //     if (isAppectedAdvetisement.length == 0) {
        fetch(`${BASE_URL}/advertisement/rent_request/${id}/`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Token ${token}`,
          },
          body: JSON.stringify({
            is_accepted: is_accepted,
            created_at,
            advertisement,
            requester
          })
        })
          .then((res) => res.json())
          .then(data=>{
            {
              if (data) {
                loadRequestOnMyRent();
              } else {
                console.error('Failed to update Request On My Rent');
              }
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });

      // } else {
      //   alert(`Rent Request already accepted!  `)
      //   loadRequestOnMyRent();
      // }
    // })
};

document.addEventListener('DOMContentLoaded', loadRequestOnMyRent);
