fetch('navbar.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data
        // auth element
        let navElement = document.getElementById('navbarSupportedContent');
        const token = localStorage.getItem('authToken')
        const userId = localStorage.getItem('userId')
        const loadUser = () => {
            fetch(`https://rent-vista-7tlr.onrender.com/users/${userId}/`)
                .then(res => res.json())
                .then(user => {
                    if (user.role == 'admin' && token) {
                        navElement.innerHTML = `
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 navbar-menu">
                <li class="nav-item">
                     <a class="text-decoration-none text-black" href="all_advertisement.html">Rent</a>
                </li>
                <li class="nav-item">
                    <a class="text-decoration-none text-black" href="favourite_rent.html">Favourite Rent</a>
                </li>
                 <li class="nav-item">
                  <a class="text-decoration-none text-black" href="post_rent.html"> Post a Rent</a>
                </li>
                 <li class="nav-item">
                  <a class="text-decoration-none text-black" href="my_rent_post.html"> My Rent Post </a>
                </li>
                 <li class="nav-item">
                     <a class="text-decoration-none text-black" href="about-us.html">About Us</a>
                </li>
                <li class="nav-item">
                       <a class="text-decoration-none text-black" href="contact-us.html">Contact Us</a>
                </li>
                <!-- dropdown -->
                <li class="nav-item dropdown border  rounded px-2">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Dashboard
                    </a>
                    <ul class="dropdown-menu ">
                       
                              <li>
                                  <a class="dropdown-item" href="user_profile.html">Profile</a>
                                  
                              </li>
                                <li>
                                  <a class="dropdown-item" href="all_rents.html">All Rent </a>
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
            </ul>

            `
            } else if (token) {
                        navElement.innerHTML = `
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item nav-menu-item">
                     <a class="text-decoration-none text-black" href="all_advertisement.html">Rent</a>
                </li>
                <li class="nav-item">
                    <a class="text-decoration-none text-black" href="favourite_rent.html">Favourite Rent</a>
                </li>
                 <li class="nav-item">
                  <a class="text-decoration-none text-black" href="post_rent.html"> Post a Rent</a>
                </li>
                 <li class="nav-item">
                  <a class="text-decoration-none text-black" href="my_rent_post.html"> My Rent Post </a>
                </li>
                 <li class="nav-item">
                     <a class="text-decoration-none text-black" href="about-us.html">About Us</a>
                </li>
                <li class="nav-item">
                       <a class="text-decoration-none text-black" href="contact-us.html">Contact Us</a>
                </li>
                <!-- dropdown -->
                <li class="nav-item dropdown  border  rounded px-2">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Dashboard
                    </a>
                    <ul class="dropdown-menu ">
                        <li>
                            <a class="dropdown-item" href="user_profile.html">Profile</a>   
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
            </ul>
            `
                    } else {
                        navElement.innerHTML = `
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="text-decoration-none text-black" href="all_advertisement.html">Rent</a>
                        </li>
                         <li class="nav-item">
                            <a class="text-decoration-none text-black" href="about-us.html">About Us</a>
                        </li>
                        <li class="nav-item">
                            <a class="text-decoration-none text-black" href="contact-us.html">Contact Us</a>
                        </li>
                        <li class="nav-item">
                             <a class="text-decoration-none btn btn-primary" href="registration.html">SignUp</a>
                        </li>
                        <li class="nav-item">
                             <a class="text-decoration-none btn btn-primary" href="login.html">Login</a>
                        </li>
                    </ul>
                   `;
                    }

                })
        }
        loadUser()
    })
