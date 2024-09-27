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

// make company objects or get existing company objects
let companyObjectsExist = JSON.parse(sessionStorage.getItem('companyObjectsExist')) || false;
if(companyObjectsExist==true)
{
  console.log('company objects exist');
  let companyObjects = JSON.parse(sessionStorage.getItem('companyObjects'));
  createCard(companyObjects);
  // add event on card when clicked
  for(let i=0;i<companyObjects.length;i++)
  {
    let cardDiv = document.getElementById(`company-${i+1}`);
    cardDiv.addEventListener('click', function()
    {
      window.location.href = `company${i+1}.html`;
    })
  }
}
else{
  let companyObjects = [];
  let totalCompany = 9; //ada berapa company

  // isi dari companyObjects
  let companyNameArr = ['Apple', 'Tesla', 'Netflix', 'Microsoft', 'Nike', 'Google', 'BMW', 'Under Armour', 'Disney'];
  let companyDescArr = ['Technology Company', 'Automotive Company', 'Entertainment Company', 'Technology Company', 'Sportswear Company', 'Technology Company', 'Automotive Company', 'Sportswear Company', 'Entertainment Company'];
  let companyLogoArr = [
    '../Asset/company-logo1.jpg',
    '../Asset/company-logo2.jpg',
    '../Asset/company-logo3.jpg',
    '../Asset/company-logo4.png',
    '../Asset/company-logo5.png',
    '../Asset/company-logo6.png',
    '../Asset/company-logo7.png',
    '../Asset/company-logo8.png',
    '../Asset/company-logo9.png'
  ];
  let companyRankArr = [1,2,3,4,5,6,7,8,9]; //gaada rank
  let companyRatingArr = [[7,7,4,5,8,9], 
  [5,4,4,8], 
  [4,5,3,9,9,8],
  [8,7,6,7,9],
  [6,5,4,9],
  [4,8,9,6,7,7,2,1],
  [6,5,4,9,9,2,1],
  [6,5,4,9,7,7,7],
  [6,5,4,9,6,7,2],
  ];

  // get raters count
  let companyRatersArr = [];
  for(let i =0;i<totalCompany;i++)
  {
    companyRatersArr.push(companyRatingArr[i].length);
  }
  let companyAppliersArr = [5678, 4208, 4321, 6789, 987, 7879, 4208, 2000, 1234];

  //isi company objects
  for(let i=0;i<totalCompany;i++)
  {
    let companyDetails = {
      companyName : companyNameArr[i],
      companyDesc : companyDescArr[i],
      companyLogo : companyLogoArr[i],
      //companyBanner : companyBannerArr[i],
      companyRank : companyRankArr[i],
      companyRating : (companyRatingArr[i].reduce((accumulator, currentValue) => accumulator + currentValue, 0)/companyRatersArr[i]).toFixed(2),
      companyRaters : companyRatersArr[i],
      companyAppliers: companyAppliersArr[i]
    }
    companyObjects.push(companyDetails);
  }
  // add event on card when clicked
  for(let i=0;i<companyObjects.length;i++)
  {
    let cardDiv = document.getElementById(`company-${i+1}`);
    cardDiv.addEventListener('click', function()
    {
      window.location.href = `company${i+1}.html`;
    })
  }

  createCard(companyObjects);
  // di akhir save companyObjects ke sessionStorage
  sessionStorage.setItem('companyObjects', JSON.stringify(companyObjects));
  sessionStorage.setItem('companyObjectsExist', true);
}



function createCard(companyObjects)
{
  for(let i=0;i<companyObjects.length;i++)
  {
    document.getElementById(`company-name${i+1}`).innerHTML = companyObjects[i].companyName;
    document.getElementById(`company-desc${i+1}`).innerHTML = companyObjects[i].companyDesc;
    document.getElementById(`company-rank${i+1}`).innerHTML = companyObjects[i].companyRank;
    document.getElementById(`company-rating${i+1}`).innerHTML = companyObjects[i].companyRating;
    document.getElementById(`company-raters-count${i+1}`).innerHTML = companyObjects[i].companyRaters + ' Reviews';

    //make card logo image
    let imgElement = document.createElement('img');
    imgElement.setAttribute('src', companyObjects[i].companyLogo);
    imgElement.classList.add('company-logo'); // add class in css
    document.getElementById(`company-logo${i+1}`).appendChild(imgElement);

    document.getElementById(`company-applier${i+1}`).innerHTML = companyObjects[i].companyAppliers + ' Appliants';
  }
}



