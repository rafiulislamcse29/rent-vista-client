import { BASE_URL } from "./baseUrl.js"
const token=localStorage.getItem('authToken')
const userId=localStorage.getItem('userId')

// checking auth
if(!token && !userId){
  location.href='login.html'
  
}

const loadUserProfile = () => {
  fetch(`${BASE_URL}/users/${userId}/`)
    .then(res => res.json())
    .then(user => {
      if (!user) {
     document.getElementById('profile_not_found').innerHTML = "Profile not found"
      } else {

        const parEl = document.getElementById('user-profile-information')
        parEl.innerHTML = `
      
       <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-column gap-1">
                  <h6 class="fw-bold">User Name:</h6>
                  <p class="text-white bg-info p-2 rounded m-neg">${user.username}</p>
                </div>
                <div className="d-flex flex-column gap-1">
                  <h6 class="fw-bold">Full Name:</h6>
                  <p class="text-white bg-info p-2 rounded m-neg">${user.first_name} ${user.last_name}</p>
                </div>
                <div className="d-flex flex-column">
                  <h6 class="fw-bold">Eamil:</h6>
                  <p class="text-white bg-info p-2 rounded m-neg">${user.email}</p>
                </div>
                <div className="d-flex flex-column">
                  <h6 class="fw-bold">Role:</h6>
                  <p class="text-white bg-info p-2 rounded m-neg">${user.role}</p>
                </div>
                <div class="d-flex justify-content-center gap-4">
                  <button class="btn btn-primary">Edit Profile</button>
                  <!-- <button class="btn btn-danger">Delete Account</button> -->
                </div>
              </div>
      `
      }
    })
}

loadUserProfile()