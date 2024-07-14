import { loadCategory ,loadAdvertisements,displayAdvertisements } from "./index.js";
// loadCategory()
// loadAdvertisements()
// displayAdvertisements()


// const displayAdvertiseReviews = (reviews) => {
//   console.log(reviews)
  // reviews.forEach(review => {
  //   const parentEl = document.getElementById('reviews-cart-container')
  //   const article = document.createElement('article')
  //   article.classList.add('box', 'mb-3', 'shadow-lg', 'p-3', 'border', 'border-secondary', 'rounded')
  //   // fetch user name
  //   fetch(`${BASE_URL}/users/${review.reviewer}/`)
  //     .then(res => res.json())
  //     .then(user => {
  //       if (user) {
  //         article.innerHTML = `
  //               <div class="icontext w-100">
  //                 <img src="./Images/user.png"   style="width: 50px; height: 50px; background-color: rgba(212, 210, 227, 1);"class="img-xs icon rounded-circle">
  //                      <div class="text">
  //                        <span class="date text-muted float-md-right">24.04.2020 </span>
  //                            <h6 class="mb-1">${user.first_name}</h6>
    
  //                           </div>
  //                               </div> <!-- icontext.// -->
  //                           <div class="mt-2">
  //                            <p>
  //                               Dummy comment Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
  //                                    eiusmod
  //                                     tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
  //                                  quis nostrud exercitation ullamco laboris nisi ut aliquip
  //                              </p>
  //                               </div>
                        
  //      `
  //         parentEl.appendChild(article)
  //       }

  //     })

  // });

// }