import { BASE_URL } from './baseUrl.js';

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('authToken');

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
        document.getElementById('rent_request_table').innerHTML = 'Request On My Rent  not found';
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
        tr.innerHTML = `
          <th scope="row">${i + 1}</th>
          <td>${data.title}</td>
          <td class='text-center '>${data.location}</td>
           <td class='text-center '>${data.price}</td>
           <td class='text-center '>${rent.is_accepted? "Success" :'Pending'}</td>
          <td>${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}</td>
          <td class='text-center h4 d-flex gap-1'>
           <a href="#">
            <ion-icon onclick="handleRequestOnMyRentDel('${rent.id}')" name="close-circle-outline"></ion-icon>
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
          </td>
    `;
        tableBody.insertAdjacentElement('afterbegin', tr);
      })
  });
}

window.handleRequestOnMyRentDel = (id) => {
  fetch(`${BASE_URL}/advertisement/rent_request/${id}/`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        loadRequestOnMyRent();
      } else {
        console.error('Failed to delete Request On My Rent');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};



window.handleRequestOnMyRentEdit = (id,is_accepted,adcreated_at,advertisement,requester) => {
  
  fetch(`${BASE_URL}/advertisement/rent_request/${id}/`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body:JSON.stringify({
      is_accepted:!is_accepted,
      adcreated_at,
      advertisement,
      requester
    })
  })
    .then((res) => {
      if (res.ok) {
        loadRequestOnMyRent();
      } else {
        console.error('Failed to update Request On My Rent');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

document.addEventListener('DOMContentLoaded', loadRequestOnMyRent);
