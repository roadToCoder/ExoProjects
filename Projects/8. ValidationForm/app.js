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
const container = document.querySelector(".container");

let errorMessage = '';
let iconHTML = '';
let pwdConfirmValue = pwdConfirm.value;
let pwdValue = pwdNew.value;

let topUserName = false;
let topMail = false;
let topNewPassword = false;
let topConfirmPassword = false;


userName.addEventListener("keyup", ()=> isUserValid());

mailUser.addEventListener("keyup", () => isMailValid())

pwdNew.addEventListener("keyup", ()=> isNewPwdValid());

pwdConfirm.addEventListener("keyup", ()=> isPWdConfirmValid());



function isUserValid() {
  
    if (userName.value.length < 3) {
      errorMessage = '<span class="text-red-500">Choisissez un pseudo contenant au moins 3 caractères.</span>';
      iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[31px]">`;
      topUserName = false;
    } else {
      iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[31px]">`;
      errorMessage = '';
      topUserName = true;
    }
  
    isValidUserName.innerHTML = errorMessage + iconHTML;
    return userName.value;
}

function isMailValid() {

    const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}$/;

    let testEmail = emailRegex.test(mailUser.value);
    
    if (!testEmail) {
        errorMessage = '<span class="text-red-500">Rentrez un email valide.</span>';
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        topMail = false;
    } else {
        iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        errorMessage = '';
        topMail = true;
    }
    isValidMail.innerHTML = errorMessage + iconHTML;
    return mailUser.value;
}

function isNewPwdValid() {
    const caracDecimal= /\d/;
    const caracSpeciaux= /[$&@!]/;
    const minNumberofChars = 6;
    let pwdForce = "";
    let pwdValue = pwdNew.value;

    if (pwdValue.length < minNumberofChars) {
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        pwdForce = `<div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>`;
        topNewPassword = false;
    } else if (pwdValue.length >= minNumberofChars && !pwdValue.match(caracSpeciaux) && !pwdValue.match(caracDecimal)) {
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>`;
        topNewPassword = false;
    } else if (pwdValue.length >= minNumberofChars && pwdValue.match(caracSpeciaux) && !pwdValue.match(caracDecimal)) {
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
        <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>`;
        topNewPassword = false;
    } else if (pwdValue.length >= minNumberofChars && !pwdValue.match(caracSpeciaux) && pwdValue.match(caracDecimal)) {
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
        <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>`;
        topNewPassword = false;
    } else if (pwdValue.match(caracSpeciaux) && pwdValue.length >= minNumberofChars && pwdValue.length < (minNumberofChars + 4) && pwdValue.match(caracDecimal)) {
        iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
        <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>`;
        topNewPassword = true;
    } else if (pwdValue.match(caracSpeciaux) && pwdValue.length >= minNumberofChars && pwdValue.length >= (minNumberofChars + 4) && pwdValue.match(caracDecimal)){
        iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
        <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>
        <div id="pwdFort" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-lime-400 border-0 rounded ">fort</div>`;
        topNewPassword = true;
    }
    
    pwdAlert.innerHTML = pwdForce + iconHTML;
    return pwdNew.value;
}

function isPWdConfirmValid() {

    let pwdConfirmValue = pwdConfirm.value;
    if (pwdConfirmValue !== pwdNew.value) {
        iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        topConfirmPassword = false;
    } else {
        iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
        topConfirmPassword = true;
    }
    pwdConfirmOK.innerHTML = iconHTML;
    return pwdConfirm.value;
}

btnValidation.addEventListener("click", function isAllValid() {
    console.log(userName.value, mailUser.value, pwdNew.value, pwdConfirm.value);
    if (topUserName && topMail && topNewPassword && topConfirmPassword) {
        alert("Données envoyées avec succès")
    } else if (userName.value){
        alert("Erreur")
        isUserValid()
        container.classList.add("container.shake")
    }
})