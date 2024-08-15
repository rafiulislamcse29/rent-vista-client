const userId = localStorage.getItem('userId');
const token = localStorage.getItem('authToken');

const handleDeposit = (event) => {
 
  event.preventDefault()
  document.getElementById("error").style.display = "none";
  document.getElementById("success-msg").style.display = "none";

  const form = document.getElementById('deposit-form')
  const formData = new FormData(form)
  account_no = formData.get('account_no')
  balance = formData.get('balance')
  
  fetch(`https://rent-vista-7tlr.onrender.com/user-bank-accounts/deposit/`,{
    method: "POST",
    headers: {
      "content-type":'application/json',
      // 'Authorization': `Token ${token}`
    },
    body: JSON.stringify({account_no,balance})
  }).then(res => res.json())
    .then(data => {
      console.log(data)
      if(data?.message && data?.new_balance){
        document.getElementById("success-msg").style.display = "inline-block";
        document.getElementById("success-msg").classList.add('p-1', 'rounded', 'text-white','bg-success')
        document.getElementById("success-msg").innerText=`${data.message} your total balance ${data.new_balance}`
      } 
      else if(data?.error){
        document.getElementById("error").style.display = "inline-block";
       
        document.getElementById("error").innerText = data.error
      }
    })
}