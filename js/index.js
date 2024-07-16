import { BASE_URL } from "./baseUrl.js";


export const loadAdvertisements = (search) => {

  document.getElementById('advertisements').innerHTML = "";

  fetch(`${BASE_URL}/advertisement/list/?search=${search ? search : ""}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displayAdvertisements(data)
      } else {
        document.getElementById('advertisements').innerHTML = "";
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "block";
      }

    })
}

export function displayAdvertisements(advertisements) {

  advertisements.forEach((advertise) => {
    const advertisements = document.getElementById('advertisements')
    const div = document.createElement('div')

    fetch(`${BASE_URL}/category/list/${advertise.category}/`)
    .then(res => res.json())
    .then(category => {
      
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
       <a href="advertise_details.html?advertiseId=${advertise.id}">
         <img class="card-img-top" style="height: 12rem;" src="${advertise.image}" alt="${advertise.title}">
       </a>
       <div class="card-body">
         <h5 class="card-title">${advertise.title.slice(0, 30)}...</h5>
         <span class="card-text bg-info p-1 rounded">${category.name}</span>
         <p class="card-text text-justify">${advertise.description.slice(0, 40)}...</p>
         <div class='d-flex justify-content-between'>
         <span class=''>${advertise.bedrooms} Bedrooms</span>
         <span class='text-primary'> ${advertise.price}৳</span>
         </div>
         <div class='d-flex flex-column'>
           <a href="advertise_details.html?advertiseId=${advertise.id}" class="mt-1 w-full btn btn-primary">view</a>
         </div>
       </div>
        
     </div>
   `
   advertisements.appendChild(div)
    })

  })
}



export const loadCategory = () => {
  fetch(`${BASE_URL}/category/list/`)
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        const parentEl = document.getElementById('accordion-body-container')
        const li = document.createElement('li')
        li.style.cursor='pointer';
        li.classList.add('bg-info','mb-1','rounded','p-1')
        // li.style.backgroundColor='';
        li.textContent = item.name;

        li.addEventListener('click', () => loadAdvertisements(item.name));
        
        parentEl.appendChild(li)
        
       })
    })
}

loadCategory()
loadAdvertisements()






