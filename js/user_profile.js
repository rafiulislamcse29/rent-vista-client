import { BASE_URL } from "./baseUrl.js"
const token = localStorage.getItem('authToken')
const userId = localStorage.getItem('userId')

// checking auth
if (!token && !userId) {
  location.href = 'login.html'
}
// <!-- http://127.0.0.1:8000/user-bank-accounts/?user_id=2 -->
const loadUserProfile = () => {
  fetch(`${BASE_URL}/users/${userId}/`)
    .then(res => res.json())
    .then(user => {
      if (!user) {
        document.getElementById('profile_not_found').innerHTML = "Profile not found"
      } else {
        fetch(`${BASE_URL}/user-bank-accounts/?user_id=2`)
        .then(res => res.json())
        .then(account=>{
          const parEl = document.getElementById('user-profile-information')
          parEl.innerHTML = `
          <!-- User Image and Title -->
                <div class="text-center user p-3">
                  <h3 class="mb-3 fw-bold">Personal Information</h3>
                  <div>
                    <img class="rounded-circle border border-1 img-fluid" src="./Images/user.png" alt="user pic"
                      style="max-width: 150px;">
                  </div>
                </div>
    
                <!-- User Profile Information -->
                <div class="user-profile-information" >
                  <hr>
                  <div class="row px-3">
                    <div class="col-sm-5">
                      <p class="mb-0 fw-bold">User Name</p>
                    </div>
                    <div class="col-sm-7">
                      <p class="text-muted mb-0">${user.username}</p>
                    </div>
                  </div>
                  <hr>
                  <div class="row px-3">
                    <div class="col-sm-5">
                      <p class="mb-0 fw-bold">Full Name</p>
                    </div>
                    <div class="col-sm-7">
                      <p class="text-muted mb-0">${user.first_name} ${user.last_name}</p>
                    </div>
                  </div>
                  <hr>
                  <div class="row px-3">
                    <div class="col-sm-5">
                      <p class="mb-0 fw-bold">Email</p>
                    </div>
                    <div class="col-sm-7">
                      <p class="text-muted mb-0">${user.email}</p>
                    </div>
                  </div>
                  <hr>
                  <div class="row px-3">
                    <div class="col-sm-5">
                      <p class="mb-0 fw-bold">Role</p>
                    </div>
                    <div class="col-sm-7">
                      <p class="text-muted mb-0">${user.role}</p>
                    </div>
                  </div>
                  <hr>
                  <div class="row px-3">
                    <div class="col-sm-5">
                      <p class="mb-0 fw-bold">Account Number</p>
                    </div>
                    <div class="col-sm-7">
                      <p class="text-muted mb-0">${account[0]?.account_no}</p>
                    </div>
                  </div>
                  <hr>
                  <div class="row px-3">
                    <div class="col-sm-5">
                      <p class="mb-0 fw-bold">Account Balance</p>
                    </div>
                    <div class="col-sm-7 pb-3">
                      <p class="text-muted mb-0">${account[0]?.balance} ৳</p>
                    </div>
                  </div>
                </div>
          `
        })
     
      }
    })
}

loadUserProfile()