const userName = document.querySelector("#userName");
const newPassword = document.querySelector("#newPassword");
const confirmPassword = document.querySelector("#confirmPassword");
const mailUser = document.querySelector("#mailUser");
const btnValidation = document.querySelector("#btnValidation");
const isValidUserName = document.querySelector("#isValidUserName");
const isValidMail = document.querySelector("#isValidMail");
const iconStateUserName = document.querySelector("#iconStateUserName");
const passwordAlert = document.querySelector("#passwordAlert")

let errorMessage = '';
let iconHTML = '';

btnValidation.addEventListener("click", () => {
    // isValid()
    // console.log(userName.value.length);
})

userName.addEventListener("keyup", () => {
  
    if (userName.value.length < 3) {
      errorMessage = '<span class="text-red-500">Choisissez un pseudo contenant au moins 3 caractères.</span>';
      iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-3.5">`;
    } else {
      iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-3.5">`;
      errorMessage = '';
    }
  
    isValidUserName.innerHTML = errorMessage + iconHTML;
  });

mailUser.addEventListener("keyup", ()=> {

    const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}$/;

    let testEmail = emailRegex.test(mailUser.value);
    
    if (!testEmail) {
        errorMessage = '<span class="text-red-500">Rentrez un email valide.</span>';
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-10 -mt-0.5">`;
    } else {
        iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-10 -mt-0.5">`;
        errorMessage = '';
    }
    isValidMail.innerHTML = errorMessage + iconHTML;
})

newPassword.addEventListener("keyup", ()=> {

    const carDecimal= /\d/;
    const caracSpeciaux= /[$&@!]/;
    const minNumberofChars = 6;


    if (newPassword.value.length < minNumberofChars) {
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-10 -mt-0.5">`;
        errorMessage = '';
    } 
    if (!newPassword.value.match(caracSpeciaux)) {
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-10 -mt-0.5">`;
    }
    if (!newPassword.value.match(carDecimal)) {
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-10 -mt-0.5">`;
    }
    
    
    passwordAlert.innerHTML = iconHTML;
})