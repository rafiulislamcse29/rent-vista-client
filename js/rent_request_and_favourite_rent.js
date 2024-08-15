const userId = localStorage.getItem('userId');
const token = localStorage.getItem('authToken');



const getParams = () => {
  const param = new URLSearchParams(window.location.search).get("advertiseId");
  return param
}




const handleRequestRent = () => {

  const param = getParams()

  if (!userId && !token) {
    window.location.href = 'login.html'
    return
  }

  // check is already rent request 
  fetch(`${BASE_URL}/advertisement/rent_request/?requester_id=${userId}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const isRequest = data?.filter((req => req.advertisement == getParams() && req.requester))

      if (isRequest.length == 0) {
        fetch(`${BASE_URL}/advertisement/rent_request/`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({
            advertisement: param,
            requester: userId
          })
        }).then(res => res.json())
          .then(data => {
            console.log(data)
            if (data?.id) {
              window.location.href = 'my_requested_rent.html'
            }
            if(data?.error){
              alert(`${data.error}!.Please deposit account balance`)
               window.location.href = 'deposit_balance.html'
            }
          })
      } else {
        alert("Already Send Rent Request")
      }
    });

}


const handleFavouriteRent = () => {
  const param = getParams()

  if (!userId && !token) {
    window.location.href = 'login.html'
    return
  }
  fetch(`${BASE_URL}/advertisement/favourite/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({
      advertisement: param,
      user: userId
    })
  }).then(res => res.json())
    .then(data => {
      if (data?.id) {
        window.location.href = 'favourite_rent.html'
      }
    })
}