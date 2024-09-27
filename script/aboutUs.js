let userObject = JSON.parse(sessionStorage.getItem('userInfo'));
let loginCheck = JSON.parse(sessionStorage.getItem('loginChecker'));

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

} else console.log('belum login');

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