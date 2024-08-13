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
  div.classList.add('row','g-0','g-lg-3')
  fetch(`${BASE_URL}/category/list/${advertise.category}/`)
    .then(res => res.json())
    .then(category => {
      div.innerHTML = `
    <div class="col-md-6 overflow-hidden">
        <img class='h-100 w-100 object-fit-cover' src='${advertise.image}' alt='${advertise.title}'>
    </div>
    <div class="col-md-6 p-3 d-flex flex-column justify-content-center gap-2">
      <div class='p-lg-3 p-0'>
       <h3 class="text-info">${advertise.title}</h3>
        <div class="row">
            <div class="col-md-6">
                <p><span>Rent Category:</span> <span class="text-info">${category.name}</span></p>
                <p><span>Rent Amount:</span> <span class="text-primary">${advertise.price}৳</span></p>
                <p><span>Bedrooms:</span> <span class="text-info">${advertise.bedrooms}</span></p>
            </div>
            <div class="col-md-6">
                <p><span>Location:</span> <span class="text-info">${advertise.location}</span></p>
                <p><span>Amenities:</span> <span class="text-info">${advertise.amenities}</span></p>
            </div>
        </div>
        <p class=''>${advertise.description}</p>
        <div class="d-flex gap-2">
            <div>
                ${advertise.request_accepted ? ` <buttton class='btn btn-success'>Rent Booked Already</button>` : `
                    <buttton onclick="handleRequestRent()" class='btn btn-outline-primary'>Rent Request</button>`
                        }
            </div>
            <div>
                <buttton onclick="handleFavouriteRent()"
                    class='btn btn-outline-primary d-flex justify-content-center align-items-center gap-1'>
                    <span>Favourite Rent</span>
                    <ion-icon name="heart-outline"></ion-icon></button>
            </div>
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
      if (data?.length == 0) {
        document.getElementById('reviews-section').style.display = 'none'
      } else {
        document.getElementById('reviews-section').style.display = 'block'
        displayAdvertiseReviews(data)
      }
    })
}

const displayAdvertiseReviews = (reviews) => {
  reviews.forEach(review => {
    const parentEl = document.getElementById('reviews-cart-container')
    const div = document.createElement('div')
    div.classList.add('col-md-6', 'col-lg-3', 'col-md-4', 'mb-4')
    const date = new Date(review.created_at);
    // fetch user name
    fetch(`${BASE_URL}/users/${review.reviewer}/`)
      .then(res => res.json())
      .then(user => {
        if (user) {
          div.innerHTML = `
                <article class="card p-3 h-100">
                    <div class="icontext d-flex gap-3 align-items-center">
                        <img src="./Images/user.png" class="img-xs icon rounded-circle" style="width: 75px; height: 75px;">
                        <h6 class="text-uppercase fw-bold">${user.first_name} ${user.last_name}</h6>
                    </div>
                    <p class="mt-3">
                      ${review.comment}
                    </p>
                    <p class="d-flex align-items-center justify-content-between">
                          ${review.rating}
                          <span class="date text-muted float-md-right">${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</span>
                    </p>
                </article>
       `
          parentEl.appendChild(div)
        }
      })
  });
}

loadReviews()

// add new reviews
const reviewForm = document.getElementById('review-form')
const reviewsSection = document.getElementById('review-section')
document.getElementById("error").style.display = "none";

// if (!userId && !token) {
//   reviewsSection.style.display='none'
// }else{
//   reviewsSection.style.display='block'
// }


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

      if (data?.id) {
        window.location.href = `advertise_details.html?advertiseId=${id}`
      }
      if (data?.detail) {
        document.getElementById("error").style.display = "inline-block";
        document.getElementById("error").innerText = data.detail;
      }
    })
})




