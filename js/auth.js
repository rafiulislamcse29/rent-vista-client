const BASE_URL = 'https://rent-vista-7tlr.onrender.com'
// const  BASE_URL='http://127.0.0.1:8000'

document.getElementById("error").style.display='none'

const handleRegistration = (event) => {
  document.getElementById("error").style.display='inline-block'
  event.preventDefault()
  const form = document.getElementById('registration-form')
  const formData = new FormData(form)

  const registrationData = {
    username: formData.get('username'),
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
    role: 'user'
  }

  if (registrationData.password === registrationData.confirm_password) {
    document.getElementById("error").innerText = "";
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        registrationData.password
      )
    ) {
      fetch(`${BASE_URL}/api/auth/register/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(registrationData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data?.error) {
            document.getElementById("error").innerText = data.error;
          } else if (data?.username) {
            document.getElementById("error").innerText = data.username[0];
          }
          else {
            alert(`Registration Successful ${data}`)
            window.location.href = 'login.html'
          }

        });
    } else {
      document.getElementById("error").innerText =
        "pasword must contain eight characters, at least one letter, one number and one special character:";
    }
  } else {
    document.getElementById("error").innerText =
      "password and confirm password do not match";
  }
}



const handleLogin = (event) => {
  event.preventDefault()
  const form = document.getElementById('login-form')
  const formData = new FormData(form)

  const loginData = {
    username: formData.get('username'),
    password: formData.get('password')
  }
  fetch(`${BASE_URL}/api/auth/login/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(loginData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.error) {
        document.getElementById("error").style.display = "inline-block";
        document.getElementById("error").innerText = data.error
      } else {
        localStorage.setItem("authToken", data.token)
        localStorage.setItem('userId', data.user_id)
        window.location.href = 'index.html'
      }
    })
    .catch(error => console.log(error))
}


function handlelogOut() {
  const token = localStorage.getItem('authToken')
  fetch(`${BASE_URL}/api/auth/logout/`, {
    headers: {
      "content-type": "application/json",
      'Authorization': `Token ${token}`
    },
  }).then(res => {
    console.log(res); 
    if (res.ok) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      window.location.href = 'index.html';
    }{
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      window.location.href = 'index.html';
    }
  }).catch(error => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    window.location.href = 'index.html';
    console.log("Logout Error", error)
  });
}
