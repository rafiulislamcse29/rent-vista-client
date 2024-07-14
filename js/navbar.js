fetch('navbar.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data
        // auth element
        let navElement = document.getElementById('menu-element');
        const token = localStorage.getItem('authToken')
        const userId = localStorage.getItem('userId')
        const loadUser = () => {
            fetch(`${BASE_URL}/users/${userId}/`)
                .then(res => res.json())
                .then(user => {
              
                    if (user.role == 'admin' && token) {
                        navElement.innerHTML = `
                    <li class="menu">
                              <a class="text-decoration-none text-black" href="all_advertisement.html">rent</a>
                    </li>
                    <li class="dropdown">
                          <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton2"
                              data-bs-toggle="dropdown" aria-expanded="false">
                              Dashboard
                          </button>
                          <ul class="dropdown-menu dropdown-menu-white" aria-labelledby="dropdownMenuButton2">
                              <li>
                                  <a class="dropdown-item" href="user_profile.html">Profile</a>
                                  
                              </li>
                                <li>
                                  <a class="dropdown-item" href="all_rents.html">All Rent </a>
                              </li>
                              <li>
                                  <a class="dropdown-item" href="favourite_rent.html">Favourite Rent</a>
                              </li>
                              <li>
                                  <a class="dropdown-item" href="post_rent.html"> Post a Rent</a>
                              </li>
                              <li>
                                  <a class="dropdown-item" href="my_rent_post.html"> My Rent Post </a>
                              </li>
                              <li>
                                  <a class="dropdown-item" href="my_requested_rent.html">My Requested Rent</a>
                              </li>
                              <li>
                                  <a class="dropdown-item" href="request_on_my_rent.html">Request on my Rent</a>
                              </li>
                              <li onclick="handlelogOut()">
                                  <a class="dropdown-item">Logout</a>
                              </li>
                          </ul>
                      </li>
            `
                    } else if (token) {
                        navElement.innerHTML = `
                    <li class="menu">
                              <a class="text-decoration-none text-black" href="all_advertisement.html">rent</a>
                    </li>
                    <li class="dropdown">
                          <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton2"
                              data-bs-toggle="dropdown" aria-expanded="false">
                              Dashboard
                          </button>
                          <ul class="dropdown-menu dropdown-menu-white" aria-labelledby="dropdownMenuButton2">
                              <li>
                                  <a class="dropdown-item" href="user_profile.html">Profile</a>
                              </li>
                              <li>
                                  <a class="dropdown-item" href="favourite_rent.html">Favourite Rent</a>
                              </li>
                              <li>
                                  <a class="dropdown-item" href="post_rent.html"> Post a Rent</a>
                              </li>
                              <li>
                                  <a class="dropdown-item" href="my_rent_post.html"> My Rent Post </a>
                              </li>
                              <li>
                                  <a class="dropdown-item" href="my_requested_rent.html">My Requested Rent</a>
                              </li>
                              <li>
                                  <a class="dropdown-item" href="request_on_my_rent.html">Request on my Rent</a>
                              </li>
                              <li onclick="handlelogOut()">
                                  <a class="dropdown-item">Logout</a>
                              </li>
                          </ul>
                      </li>
            `
                    } else {
                        navElement.innerHTML = `
                    <li class="menu">
                             <a class="text-decoration-none text-black" href="all_advertisement.html">rent</a>
                         </li>
                   <li class=" bg-primary px-3 py-2 rounded-3">
                     <a class="text-decoration-none text-white" href="login.html">Login</a>
                   </li>
                   `;
                    }

                })
        }

        loadUser()


    })

