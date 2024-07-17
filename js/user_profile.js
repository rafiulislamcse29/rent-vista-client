import { BASE_URL } from "./baseUrl.js"
const userId = localStorage.getItem('userId')

const loadUserProfile = () => {
  fetch(`${BASE_URL}/users/${userId}/`)
    .then(res => res.json())
    .then(data => {
      if (!data) {

        document.getElementById('profile_not_found').innerHTML = "Profile not found"
      } else {

        const parEl = document.getElementById('profile_data')
        parEl.innerHTML = `
      
      <h6 class="">:  ${data.username}</h6>
      <h6 class="">:  ${data.first_name} ${data.last_name}</h6>
       <h6 class="">:  ${data.email}</h6>
      <h6 class="">:   ${data.role}</h6>
      `
      }
    })
}

loadUserProfile()