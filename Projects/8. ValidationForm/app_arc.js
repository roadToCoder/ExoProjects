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
const container = document.querySelector(".contain");

let errorMessage = "";
let iconHTML = "";

let topUserName = false;
let topMail = false;
let topNewPassword = false;
let topConfirmPassword = false;

userName.addEventListener("input", isUserValid);
mailUser.addEventListener("input", isMailValid);
pwdNew.addEventListener("input", isNewPwdValid);
pwdConfirm.addEventListener("input", isPWdConfirmValid);

function isUserValid() {
  if (userName.value.length < 3) {
    errorMessage = '<span class="text-red-500">Choisissez un pseudo contenant au moins 3 caractères.</span>';
    iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[31px]">`;
    topUserName = false;
  } else {
    iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[31px]">`;
    errorMessage = "";
    topUserName = true;
  }

  isValidUserName.innerHTML = errorMessage + iconHTML;
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
    errorMessage = "";
    topMail = true;
  }
  isValidMail.innerHTML = errorMessage + iconHTML;

}

function isNewPwdValid() {
  const caracDecimal = /\d/;
  const caracSpeciaux = /[$&@!]/;
  const minNumberofChars = 6;
  let pwdForce = "";

  if (pwdNew.value.length === 0) {
    iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
    topNewPassword = false;
  } else if (pwdNew.value.length < minNumberofChars) {
    iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
    pwdForce = `<div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>`;
    topNewPassword = false;
  } else if (pwdNew.value.length >= minNumberofChars && !pwdNew.value.match(caracSpeciaux) && !pwdNew.value.match(caracDecimal)) {
    iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
    pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>`;
    topNewPassword = false;
  } else if (pwdNew.value.length >= minNumberofChars && pwdNew.value.match(caracSpeciaux) && !pwdNew.value.match(caracDecimal)) {
    iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
    pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
        <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>`;
    topNewPassword = false;
  } else if (pwdNew.value.length >= minNumberofChars && !pwdNew.value.match(caracSpeciaux) && pwdNew.value.match(caracDecimal)) {
    iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
    pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
        <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>`;
    topNewPassword = false;
  } else if (pwdNew.value.match(caracSpeciaux) && pwdNew.value.length >= minNumberofChars && pwdNew.value.length < minNumberofChars + 3 && pwdNew.value.match(caracDecimal)) {
    iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
    pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
        <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>`;
    topNewPassword = true;
  } else if (pwdNew.value.match(caracSpeciaux) && pwdNew.value.length >= minNumberofChars && pwdNew.value.length >= minNumberofChars + 3 && pwdNew.value.match(caracDecimal)) {
    iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
    pwdForce = `
        <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
        <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>
        <div id="pwdFort" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-lime-400 border-0 rounded ">fort</div>`;
    topNewPassword = true;
  }

  pwdAlert.innerHTML = pwdForce + iconHTML;
  
}

function isPWdConfirmValid() {
  if (pwdConfirm.value !== pwdNew.value && pwdConfirm.value !== "") {
    iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
    topConfirmPassword = false;
  } else if (pwdConfirm.value === pwdNew.value && pwdNew.value !== "") {
    iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
    topConfirmPassword = true;
  }
  pwdConfirmOK.innerHTML = iconHTML;
  
}



btnValidation.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(userName.value, mailUser.value, pwdNew.value, pwdConfirm.value);
  if (topUserName && topMail && topNewPassword && topConfirmPassword) {
    alert("Données envoyées avec succès");
    document.querySelector("form").reset();
  } else {
    alert("Erreur");
    isUserValid();
    isMailValid();
    isNewPwdValid();
    isPWdConfirmValid();
    container.classList.add("shake");
  }
});
