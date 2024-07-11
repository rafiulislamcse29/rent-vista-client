import { BASE_URL } from './baseUrl.js';

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('authToken');

const loadFavouriteRent = () => {
  fetch(`${BASE_URL}/advertisement/favourite/?user_id=${userId}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        document.getElementById('favourite_rent_table').innerHTML = 'Favourite rent not found';
      } else {
        displayFavoriteRent(data);
      }
    });
};

function displayFavoriteRent(favRents) {
  console.log(favRents);
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
  favRents.forEach((fav, i) => {
    const date = new Date(fav.created_at);
    const tr = document.createElement('tr');
    let title = {}
    fetch(`${BASE_URL}/advertisement/list/${fav.advertisement}/`)
      .then(res => res.json())
      .then(data => {
        tr.innerHTML = `
          <th scope="row">${i + 1}</th>
          <td>${data.title}</td>
          <td>${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}</td>
          <td class='text-center h4'>
           <a href="#">
            <ion-icon onclick="handleFavouriteRentDel('${fav.id}')" name="close-circle-outline"></ion-icon>
           </a>
          </td>
    `;

        tableBody.insertAdjacentElement('afterbegin', tr);
      })
  });
}

window.handleFavouriteRentDel = (id) => {
  fetch(`${BASE_URL}/advertisement/favourite/${id}/`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        loadFavouriteRent();
      } else {
        console.error('Failed to delete favourite rent');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

document.addEventListener('DOMContentLoaded', loadFavouriteRent);
