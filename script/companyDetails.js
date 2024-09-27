let userObject = JSON.parse(sessionStorage.getItem('userInfo'));
let loginCheck = JSON.parse(sessionStorage.getItem('loginChecker'));
let appliedCheck = JSON.parse(sessionStorage.getItem('applied'));

//check apakah sudah terApply
if(appliedCheck)
{
  console.log('udah apply');
  let appliedArr = JSON.parse(sessionStorage.getItem('appliedArr'));
  for(let i=0;i<appliedArr.length;i++)
  {
    let companyNameDiv = document.getElementById('company-info-row2-middle-name');
    if(companyNameDiv.innerText == appliedArr[i])
    {
      //buttom adjustment
      let applyButton = document.getElementById('apply-button');
      applyButton.style.backgroundColor = "#808080";
      applyButton.innerText = 'Applied';
      applyButton.disabled = true;
    }
  }
} else console.log('belum apply');

//add logout function
let logoutDiv = document.getElementById('logout-button');
logoutDiv.addEventListener('click', function()
{
  console.log('logout clicked');
  sessionStorage.removeItem('loginChecker');
  sessionStorage.removeItem('login-force');

  const accountDiv = document.getElementById('account');
  const emailDiv = document.getElementById('email');
  accountDiv.textContent = 'Sign Up';
  emailDiv.innerHTML = '';

  //bikin si anchor gabisa di click lagi kalo dah login
  accountDiv.addEventListener('click', (e) => 
  {
    console.log('masuk sini');
    window.location.href = 'signup.html';
  })
})

if(loginCheck===true) //udah login
{
  const accountDiv = document.getElementById('account');
  const emailDiv = document.getElementById('email');
  accountDiv.textContent = userObject.firstName + ' ' + userObject.lastName;
  emailDiv.innerHTML = userObject.email;

  //bikin si anchor gabisa di click lagi kalo dah login
  accountDiv.addEventListener('click', (e) => 
  {
    console.log('masuk sini');
    e.preventDefault();
  })

} 
else {
  sessionStorage.setItem('login-force', true);
  window.location.href = 'signup.html';
}

//tambahin jumlah appliants
let companyObjects = JSON.parse(sessionStorage.getItem('companyObjects'));
if(!companyObjects)
{
  companyObjects = JSON.parse(sessionStorage.getItem('companyObjectsSorted'));
}
let companyAppliantsDiv = document.getElementById('company-info-row2-right-appliants');
let companyNameDiv = document.getElementById('company-info-row2-middle-name');
for(let i=0;i<9;i++)
{
  if(companyNameDiv.innerText===companyObjects[i].companyName)
  {
    companyAppliantsDiv.innerText=companyObjects[i].companyAppliers + ' Appliants';
  }
}

let applyButton = document.getElementById('apply-button');
console.log(applyButton.innerHTML);
applyButton.addEventListener('click', (e) => 
{
  console.log('clicked');
  let companyObjects = JSON.parse(sessionStorage.getItem('companyObjects'));
  let companyObjectsSorted = JSON.parse(sessionStorage.getItem('companyObjectsSorted'));
  let companyNameDiv = document.getElementById('company-info-row2-middle-name');
  let companyAppliantsDiv = document.getElementById('company-info-row2-right-appliants');
  console.log(companyNameDiv.innerText);
  console.log(companyAppliantsDiv.innerText);

  //get Index company in companyObjects
  for(let i=0;i<9;i++)
  {
    if(companyNameDiv.innerText===companyObjects[i].companyName)
    {
      console.log(companyObjects[i].companyName);
      companyObjects[i].companyAppliers++;
      console.log(companyObjects[i].companyAppliers);
      //refresh applier count
      companyAppliantsDiv.innerText = companyObjects[i].companyAppliers + ' Appliants';
      break;
    }
  }
  
  //get Index company in companyObjectsSorted
  for(let i=0;i<9;i++)
  {
    if(companyNameDiv.innerText===companyObjectsSorted[i].companyName)
    {
      console.log(companyObjectsSorted[i].companyName);
      companyObjectsSorted[i].companyAppliers++;
      console.log(companyObjectsSorted[i].companyAppliers);
      break;
    }
  }

  //buttom adjustment
  applyButton.style.backgroundColor = "#808080";
  applyButton.innerText = 'Applied';
  applyButton.disabled = true;

  // save information to sessionStorage;
  sessionStorage.setItem('companyObjects', JSON.stringify(companyObjects));
  sessionStorage.setItem('companyObjectsSorted', JSON.stringify(companyObjectsSorted));

  let appliedArr = JSON.parse(sessionStorage.getItem('appliedArr'));
  appliedArr.push(companyNameDiv.innerText);

  sessionStorage.setItem('appliedArr', JSON.stringify(appliedArr));
  sessionStorage.setItem('applied', true);
  
})
