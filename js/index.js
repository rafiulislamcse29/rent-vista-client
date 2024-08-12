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
    div.classList.add( 'col-md-6', 'col-lg-4','mb-4')
    fetch(`${BASE_URL}/category/list/${advertise.category}/`)
      .then(res => res.json())
      .then(category => {
        div.innerHTML = `
      <div class="card overflow-hidden" >
      <a href="advertise_details.html?advertiseId=${advertise.id}" >
        <div class='overflow-hidden' style="height: 12rem;">
          <img class="card-img-top hover-scale w-100 h-100 " src="${advertise.image}" alt="${advertise.title}">
        </div>
       </a>
       <div class="card-body">
         <h5 class="card-title mb-2">${advertise.title.slice(0, 35)}...</h5>
         <span class="card-text bg-info p-1  rounded">${category.name}</span>
         <p class="card-text text-justify mt-2">${advertise.description.slice(0, 50)}...</p>
         <div class='d-flex justify-content-between '>
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
        li.style.cursor = 'pointer';
        li.classList.add('category_item','link-secondary', 'rounded', 'p-1')

        li.textContent = item.name;
        li.addEventListener('click', () => loadAdvertisements(item.name));

        parentEl.appendChild(li)

      })
    })
}

loadCategory()
loadAdvertisements()



const FAQDLists = [
  {
    id: 1,
    question: "How do I find the perfect rental home on RentVista?",
    answer: "Use our advanced search filters to narrow down listings by location, price, property type, and amenities. You can also save your favorite properties and set up alerts to get notified when new listings match your criteria."
  },
  {
    id: 2,
    question: "Are the listings on RentVista verified?",
    answer: "Yes, all our listings go through a thorough verification process to ensure they are accurate and up-to-date, giving you peace of mind while searching for your next home."
  },
  {
    id: 3,
    question: "Can I schedule a tour through RentVista?",
    answer: "Absolutely! Once you find a property you’re interested in, you can schedule an in-person or virtual tour directly through our platform at a time that’s convenient for you."
  },
  {
    id: 4,
    question: "How do I apply for a rental property on RentVista?",
    answer: "Applying is simple. Click on the listing of your choice and follow the step-by-step application process, which includes submitting required documents and, if needed, a credit check."
  },
  {
    id: 5,
    question: "What should I do if I have a problem with my rental after moving in?",
    answer: "RentVista partners with property managers to ensure any issues you encounter are addressed promptly. Contact your property manager directly, or reach out to our support team if you need additional assistance."
  },
  {
    id: 6,
    question: "What if I have a problem with a landlord or property manager?",
    answer: "If you encounter any issues with a landlord or property manager, you can report it to our support team via the “Contact Us” page. We take all complaints seriously and will investigate the matter promptly."
  },
  {
    id: 7,
    question: "Can I save my favorite listings?",
    answer: "Yes, you can save your favorite listings by clicking the “Save” button on the property’s page. You’ll need to create a free account with RentVista to save and view your favorite listings at any time."
  }
];

function test(n) {
  if (n < 0)
    return false;
 let single_digit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
 let double_digit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
 let below_hundred = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
if (n === 0) return 'Zero'
function translate(n) {
 let  word = ""
  if (n < 10) {
    word = single_digit[n] + ' '
  }
  else if (n < 20) {
    word = double_digit[n - 10] + ' '
  }
  else if (n < 100) {
    rem = translate(n % 10)
    word = below_hundred[(n - n % 10) / 10 - 2] + ' ' + rem
  }
  else if (n < 1000) {
    word = single_digit[Math.trunc(n / 100)] + ' Hundred ' + translate(n % 100)
  }
  else if (n < 1000000) {
    word = translate(parseInt(n / 1000)).trim() + ' Thousand ' + translate(n % 1000)
  }
  else if (n < 1000000000) {
    word = translate(parseInt(n / 1000000)).trim() + ' Million ' + translate(n % 1000000)
  }
  else {
    word = translate(parseInt(n / 1000000000)).trim() + ' Billion ' + translate(n % 1000000000)
  }
  return word
}
 let result = translate(n) 
return result.trim()
}

const loadFAQData = (FAQDLists) => {
  const accordionFlushExample = document.getElementById('accordionFlushExample')
  FAQDLists.forEach((FAQDList) => {
 
    const div = document.createElement('div')
    div.classList.add('accordion-item')
    const option=test(FAQDList.id)
    div.innerHTML = `
        <h2 class="accordion-header" id=flush-heading${option}">
             <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse${option}" aria-expanded="false"
                   aria-controls="flush-collapse${option}">
                       ${FAQDList?.question}
              </button>
       </h2>
        <div id="flush-collapse${option}" class="accordion-collapse collapse"
                  aria-labelledby="flush-heading${option}" data-bs-parent="#accordionFlushExample">
                     <div class="accordion-body outline">  ${FAQDList?.answer}</div>
        </div>
              
    `
    accordionFlushExample.appendChild(div)
  })
}


loadFAQData(FAQDLists)



const discoverData=[
  {
      "id": 1,
      "title": "Find Your Ideal Flatmate Today!"
  },
  {
      "id": 2,
      "title": "Explore Your Perfect Home and Roommate"
  },
  {
      "id": 3,
      "title": "Discover Your Next Home and Ideal Flatmate"
  },
  {
      "id": 4,
      "title": "Find the Perfect Flatmate and Home for Your Lifestyle"
  },
  {
      "id": 5,
      "title": "Explore Top-Rated Flatmates and Rentals"
  },
  {
      "id": 6,
      "title": "Your Ideal Flatmate Awaits – Start Discovering!"
  },
  {
      "id": 7,
      "title": "Connect with Perfect Roommates and Rentals"
  },
  {
      "id": 8,
      "title": "Discover Your Perfect Living Arrangement Today"
  }
]


function loadDiscoverData(discoverData){
  const discoverListsEL=document.getElementById('discover-lists')

  if(discoverData.length===0){
    discoverListsEL.innerHTML='No data found'
  }else{
    discoverData?.forEach((item)=>{
      let li = document.createElement('li')
      li.classList.add('d-flex','gap-2')
      li.innerHTML=`
      <span class='fw-bold'>${item.id}.</span>
      <span>${item.title}</span>
      `
      discoverListsEL.appendChild(li)
    })
  }

}
loadDiscoverData(discoverData)

