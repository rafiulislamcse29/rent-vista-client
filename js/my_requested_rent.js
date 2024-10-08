import { BASE_URL } from './baseUrl.js';

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('authToken');

// checking auth
if(!token && !userId){
  location.href='login.html'
}


const loadRequestRent = () => {
  fetch(`${BASE_URL}/advertisement/rent_request/?requester_id=${userId}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        document.getElementById('rent_request_table').innerHTML =  `
        <div class='text-center'>
              <a href="all_advertisement.html">
                <img class="h-25 w-25" src="./Images/request-rent.jpg" alt="">
              </a>
              </div>
        `;
      } else {
        displayRequestRent(data);
      }
    });
};

function displayRequestRent(rent_requests) {

  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
  rent_requests.forEach((rent, i) => {
    const date = new Date(rent.created_at);
    const tr = document.createElement('tr');
   
    fetch(`${BASE_URL}/advertisement/list/${rent.advertisement}/`)
      .then(res => res.json())
      .then(data => {
        tr.innerHTML = `
          <th scope="row">${i + 1}</th>
          <td>${data.title}</td>
          <td class='text-center '>${data.location}</td>
           <td class='text-center '>${data.price}</td>
           <td class='text-center '>${rent.is_accepted? `<span class='text-success'>Success</span>` : `<span class='text-danger'>Pending</span>` }</td>
          <td>${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}</td>
          <td class='text-center h4 d-flex gap-3'>
            <a href="advertise_details.html?advertiseId=${rent.advertisement}">
           <ion-icon class='text-success' name="eye-outline"></ion-icon>
            </a>
           <a href="#">
            <ion-icon class='text-danger' onclick="handleRequestRentDel('${rent.id}')"  name="close-circle-outline"></ion-icon>
           </a>
          </td>
    `;

        tableBody.insertAdjacentElement('afterbegin', tr);
      })
  });
}

window.handleRequestRentDel = (id) => {
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

document.addEventListener('DOMContentLoaded', loadRequestRent);
