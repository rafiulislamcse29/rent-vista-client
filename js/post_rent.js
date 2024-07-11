
const token=localStorage.getItem('authToken')
const userId=localStorage.getItem('userId')

const loadCategory = () => {
  fetch(`${BASE_URL}/category/list/`)
    .then(res => res.json())
    .then(data =>displayCategory(data))
}


const displayCategory = (categories) => {
  categories.forEach(category => {
    const parentEl = document.getElementById('category-container')
    const option = document.createElement('option')
    option.value = category.id
    option.innerText = category.name
    parentEl.appendChild(option)
  })
}

loadCategory()


const handleRentPost = (event) => {
  event.preventDefault()

  const form = document.getElementById('advertisement-form')

  const formData = new FormData(form)
  formData.append('owner', userId);
  formData.append('category',document.getElementById('category-container').value)

  // const postData = {
  //   title: formData.get('title'),
  //   description: formData.get('description'),
  //   price: formData.get('price'),
  //   category: document.getElementById('category-container').value,
  //   image:formData.get('image'),
  //   location: formData.get('location'),
  //   bedrooms: formData.get('bedrooms'),
  //   amenities: formData.get('amenities'),
  //   owner:userId
  // }
  fetch(`${BASE_URL}/advertisement/list/`,{
    method:"POST",
    headers:{
      // "content-type":'application/json',
      'Authorization':`Token ${token}`
    },
    body:formData
  }).then(res=>res.json())
  .then(data=>console.log(data))
}


