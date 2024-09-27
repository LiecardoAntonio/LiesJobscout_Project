const loginForced = sessionStorage.getItem('login-force') || false;
console.log(loginForced);

if(loginForced)
{
  console.log('forced to login');
  let loginForceDiv = document.getElementById('login-force');
  loginForceDiv.style.color= "#FF0000";
  loginForceDiv.innerHTML = 'You need to make an account first!'
}
else console.log('nothing happen');

let backButtonDiv = document.getElementById('back-button');
backButtonDiv.addEventListener('click', function() 
{
  sessionStorage.removeItem('login-force');
  console.logo('back & reset login-force flag');
})


const form = document.getElementById('form');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordConfirmationInput = document.getElementById('password-confirmation');
const checkBoxInput = document.getElementById('checkbox');

const firstNameError = document.getElementById('first-name-alert');
const lastNameError = document.getElementById('last-name-alert');
const emailError = document.getElementById('email-alert');
const passwordError = document.getElementById('password-alert');
const passwordConfirmationError = document.getElementById('password-confirmation-alert');
const checkBoxError = document.getElementById('terms-condition-alert');

const registerButton = document.getElementById('register-button');

let userObjects = [];
let checkAllUser = JSON.parse(sessionStorage.getItem('userInfo'));
if(checkAllUser)
{
  console.log('someone login already');
  userObjects.push(JSON.parse(sessionStorage.getItem('userInfo')));
} else console.log('no one login yet!');  

registerButton.addEventListener('click', (e) => {
  let errorCount = 0;
  let message = '';

  // First name validation
  if(firstNameInput.value === '' || firstNameInput.value == null) {
    message = 'First name must be filled';
    errorCount++;
    firstNameError.innerHTML=message;
  } else firstNameError.innerHTML='';

  // email validation
  if (emailInput.value.length === 0)
  {
    message = 'Email must be filled';
    errorCount++;
    emailError.innerHTML=message;
  } 
  else if (emailInput.value.indexOf('@') === -1 || emailInput.value.indexOf('.') === -1)
  {
    message = 'Invalid email input';
    errorCount++;
    console.log(message);
    emailError.innerHTML=message;
  } else emailError.innerHTML='';

  console.log(userObjects.length);
  for(let i=0;i<userObjects.length;i++)
  {
    if(emailInput.value==userObjects[i].email)
    {
      console.log('same email');
      errorCount++;
      message = 'This email already used for an account';
      emailError.innerHTML=message;
    } else console.log('different email');
  }
  if(errorCount==0) emailError.innerHTML='';
  //password validation
  let countUppercase = 0;
  let countNumber = 0;
  if(passwordInput.value.length < 8)
  {
    message = 'Password must be at least 8 char length, contains at least 1 uppercase char, and contain at least 1 number char';
    errorCount++;
    passwordError.innerHTML=message;
  } else passwordError.innerHTML='';
  for(let i=0;i<passwordInput.value.length;i++)
  {
    if(passwordInput.value[i]>='A' && passwordInput.value[i]<='Z')
    {
      countUppercase++;
    }
    if(countUppercase>0)break;
  }
  if(countUppercase>0)
  {
    passwordError.innerHTML='';
  }
  else{
    message = 'Password must be at least 8 char length, contains at least 1 uppercase char, and contain at least 1 number char';
    errorCount++;
    passwordError.innerHTML=message;
  }
  for(let i=0;i<passwordInput.value.length;i++)
  {
    if(passwordInput.value[i]>='0' && passwordInput.value[i]<='9')
    {
      countNumber++;
    }
    if(countNumber>0)break;
  }
  if(countNumber>0)
  {
    passwordError.innerHTML='';
  }
  else{
    message = 'Password must be at least 8 char length, contains at least 1 uppercase char, and contain at least 1 number char';
    errorCount++;
    passwordError.innerHTML=message;
  }

  //password confirmation validation
  
  if(passwordInput.value !== passwordConfirmationInput.value)
  {
    message = 'The password is not the same';
    errorCount++;
    passwordConfirmationError.innerHTML=message;
  } else passwordConfirmationError.innerHTML='';

  //Terms & Condition validation
  if(checkBoxInput.checked)
  {
    checkBoxError.innerHTML='';
  }
  else
  {
    errorCount++;
    message = 'You must agree to our Terms & Condition';
    checkBoxError.innerHTML = message;
  }
  if(errorCount>0)
  {
    console.log('validation wrong');
    e.preventDefault();
  }
  if(errorCount==0)
  {
    console.log('no problem found');
    let userInfo = {
      firstName : firstNameInput.value,
      lastName : lastNameInput.value,
      email : emailInput.value,
      password : passwordInput.value
    }
    userObjects.push(userInfo);

    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    sessionStorage.setItem('loginChecker', true);
    window.location.href(window.history.back()); //go back to prev page
  }
})


