const userName = document.querySelector("#userName");
const pwdNew = document.querySelector("#pwdNew");
const pwdConfirm = document.querySelector("#pwdConfirm");
const mailUser = document.querySelector("#mailUser");
const btnValidation = document.querySelector("#btnValidation");
const isValidUserName = document.querySelector("#isValidUserName");
const isValidMail = document.querySelector("#isValidMail");
const iconStateUserName = document.querySelector("#iconStateUserName");
const pwdAlert = document.querySelector("#pwdAlert");
const pwdConfirmOK = document.querySelector("#pwdConfirmOK");

let errorMessage = '';
let iconHTML = '';

btnValidation.addEventListener("click", () => {
    // isValid()
    // console.log(userName.value.length);
})

userName.addEventListener("keyup", () => {
  
    if (userName.value.length < 3) {
      errorMessage = '<span class="text-red-500">Choisissez un pseudo contenant au moins 3 caractères.</span>';
      iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[31px]">`;
    } else {
      iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[31px]">`;
      errorMessage = '';
    }
  
    isValidUserName.innerHTML = errorMessage + iconHTML;
  });

mailUser.addEventListener("keyup", ()=> {

    const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}$/;

    let testEmail = emailRegex.test(mailUser.value);
    
    if (!testEmail) {
        errorMessage = '<span class="text-red-500">Rentrez un email valide.</span>';
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
    } else {
        iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        errorMessage = '';
    }
    isValidMail.innerHTML = errorMessage + iconHTML;
})



pwdNew.addEventListener("keyup", function isNewPwdValid() {
    const caracDecimal= /\d/;
    const caracSpeciaux= /[$&@!]/;
    const minNumberofChars = 6;
    let pwdForce = "";
    let pwdValue = pwdNew.value;

    if (pwdValue.length < minNumberofChars) {
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        pwdForce = `<div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>`;
    } else if (pwdValue.length >= minNumberofChars && !pwdValue.match(caracSpeciaux) && !pwdValue.match(caracDecimal)) {
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>`;
    } else if (pwdValue.length >= minNumberofChars && pwdValue.match(caracSpeciaux) && !pwdValue.match(caracDecimal)) {
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
        <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>`;
    } else if (pwdValue.length >= minNumberofChars && !pwdValue.match(caracSpeciaux) && pwdValue.match(caracDecimal)) {
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
        <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>`;
    } else if (pwdValue.match(caracSpeciaux) && pwdValue.length >= minNumberofChars && pwdValue.length < (minNumberofChars + 4) && pwdValue.match(caracDecimal)) {
        iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
        <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>`;
    } else if (pwdValue.match(caracSpeciaux) && pwdValue.length >= minNumberofChars && pwdValue.length >= (minNumberofChars + 4) && pwdValue.match(caracDecimal)){
        iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
        <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>
        <div id="pwdFort" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-lime-400 border-0 rounded ">fort</div>`;
    }
    
    pwdAlert.innerHTML = pwdForce + iconHTML;
})


pwdConfirm.addEventListener("keyup", function isPWdConfirmValid() {
    let pwdConfirmValue = pwdConfirm.value;
    if (pwdConfirmValue !== pwdNew.value) {
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
    } else {
        iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
    }
    pwdConfirmOK.innerHTML = iconHTML;
    return pwdConfirmValue;
})

