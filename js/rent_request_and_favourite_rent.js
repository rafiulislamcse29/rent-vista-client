
const getParams = () => {
  const param = new URLSearchParams(window.location.search).get("advertiseId");
  return param
}

const userId = localStorage.getItem('userId')
const token = localStorage.getItem('authToken')

const handleRequestRent = () => {
  const param = getParams()

  if (!userId && !token) {
    window.location.href = 'login.html'
    return
  }

  fetch(`http://127.0.0.1:8000/advertisement/rent_request/`, {
    method: "POST",
    headers: { 
      "content-type": "application/json",
      'Authorization':`Token ${token}`
     },
    body: JSON.stringify({
      advertisement: param,
      requester: userId
    })
  }).then(res => res.json())
    .then(data =>{
      if(data?.id){
        window.location.href='my_requested_rent.html'
      }
    })
}


const handleFavouriteRent=()=>{
  const param = getParams()

  if (!userId && !token) {
    window.location.href = 'login.html'
    return
  }
  fetch(`http://127.0.0.1:8000/advertisement/favourite/`, {
    method: "POST",
    headers: { 
      "content-type": "application/json",
      'Authorization':`Token ${token}`
     },
    body: JSON.stringify({
      advertisement: param,
      user: userId
    })
  }).then(res => res.json())
    .then(data => {
      if(data?.id){
        window.location.href='favourite_rent.html'
      }
    })
}