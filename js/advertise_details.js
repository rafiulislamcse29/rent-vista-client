import { BASE_URL } from "./baseUrl.js";

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('authToken');

const getParams = () => {
  const param = new URLSearchParams(window.location.search).get("advertiseId");
  return param
}

function loadAdvertisementsDetails() {

  const id = getParams()
  fetch(`${BASE_URL}/advertisement/list/${id}/`)
    .then(res => res.json())
    .then(data => {
      if (data?.title) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displayAdvertisementsDetails(data)
      } else {
        document.getElementById('body').innerHTML = "";
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "block";
      }

    })
}
loadAdvertisementsDetails()

const displayAdvertisementsDetails = (advertise) => {

  const parentEl = document.getElementById('advertise-details')
  const div = document.createElement('div')
  div.classList.add('row')
  fetch(`${BASE_URL}/category/list/${advertise.category}/`)
    .then(res => res.json())
    .then(category => {
      div.innerHTML = `
    <div class="col-md-6 overflow-hidden ">
        <img class='h-100 w-100 object-fit-cover'  src='${advertise.image}' alt='${advertise.title}'>
    </div>
    <div class="col-md-6">
      <h2 class='text-info'>${advertise.title}</h2>
      <div class='row'>
        <div class='col-md-6'>
          <p><span>Rent Category :</span>  <span class='text-info'>${category.name}</span></p> 
          <p><span>Rent Amount :</span>  <span class='text-primary'>${advertise.price}৳</span></p>  
          <p><span> Bedrooms:</span>  <span class='text-info'>${advertise.bedrooms}</span></p> 
        </div>
        <div class='col-md-6'>
            <p><span> Location:</span>  <span class='text-info'>${advertise.location}</span></p> 
            <p><span> Amenities:</span>  <span class='text-info'>${advertise.amenities}</span></p> 
        </div>
      </div>
      <p>${advertise.description}</p>
      <div class='d-flex gap-2'>
      <div>
        <buttton onclick="handleRequestRent()" class='btn btn-outline-primary'> Request Rent</button>
      </div>
      <div>
        <buttton onclick="handleFavouriteRent()" class='btn btn-outline-primary'>Favourite Rent</button>
      </div>
      </div>
      
    </div>
    
    `
      parentEl.appendChild(div)
    })
}


// show for the specific advertisement review
const loadReviews = () => {
  const param = getParams()
  fetch(`${BASE_URL}/advertisement/reviews/?advertisement_id=${param}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.length == 0) {
        document.getElementById('review_container').innerHTML = 'no review here'
      } else {
        displayAdvertiseReviews(data)
      }
    })
}

const displayAdvertiseReviews = (reviews) => {
  reviews.forEach(review => {
    const parentEl = document.getElementById('reviews-cart-container')
    const article = document.createElement('article')
    article.classList.add('box', 'mb-3', 'shadow-lg', 'p-2', 'border', 'border-secondary', 'rounded')
    const date = new Date(review.created_at);
    console.log(date)
    // fetch user name
    fetch(`${BASE_URL}/users/${review.reviewer}/`)
      .then(res => res.json())
      .then(user => {
        if (user) {
          article.innerHTML = `
          <div class="icontext w-100">
              <img src="./Images/user.png"   style="width: 50px; height: 50px; background-color: rgba(212, 210, 227, 1);"class="img-xs icon rounded-circle">
                <div class="text">
                  <span class="date text-muted float-md-right">${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}</span>
                      <h6 class="mb-1">${user.first_name} ${user.last_name}</h6>
                      </div>
                           </div> 
                     <div class="mt-2">
                            <p>
                            ${review.comment}
                           </p>
                           <p>
                            ${review.rating}
                           </p>
                     </div>
               
       `
          parentEl.appendChild(article)
        }

      })

  });

}

loadReviews()




// add new reviews
const reviewForm = document.getElementById('review-form')

reviewForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const id = getParams()

  if (!userId && !token) {
    window.location.href = 'login.html'
    return
  }

  const form = new FormData(reviewForm)
  const formData = {
    comment: form.get('comment'),
    rating: document.getElementById('rating').value,
    advertisement: id,
    reviewer: userId
  }
  fetch(`${BASE_URL}/advertisement/reviews/`, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify(formData)
  }).then(res => res.json())
    .then(data => {
      if (data) {
        window.location.href = `advertise_details.html?advertiseId=${id}`
      }
    })
})




