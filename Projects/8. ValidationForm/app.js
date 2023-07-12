const validationIcons = document.querySelectorAll(".icon-verif");
const validationTexts = document.querySelectorAll(".error-msg");


// Vérification du user
const userInput = document.querySelector(".input-group:nth-child(1) input");

userInput.addEventListener("blur", userValidation);
userInput.addEventListener("input", userValidation);

function userValidation() {
  if ( userInput.value.length >= 3) {
    showValidation(0, true);
  } else {
    showValidation(0, false);
  }
}


// Vérification du mail
const mailInput = document.querySelector(".input-group:nth-child(2) input");

mailInput.addEventListener("blur", mailValidation);
mailInput.addEventListener("input", mailValidation);


function mailValidation() {
  const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}$/;
  if (emailRegex.test(mailInput.value)) {
    showValidation(1, true);
  } else {
    showValidation(1, false);
  }
}

// Vérification du mot de passe

const pwdInput = document.querySelector(".input-group:nth-child(3) input");

pwdInput.addEventListener("blur", passwordValidation);
pwdInput.addEventListener("input", passwordValidation);

const passwordVerification = {
  length: false,
  symbol: false,
  number: false
}
const regexList = {
  symbol: /[^a-zA-Z0-9\s]/,
  number: /\d/
}

let passwordValue;

function passwordValidation() {
  passwordValue = pwdInput.value;
  let validationResult = 0;

  for (const prop in passwordVerification) {
    if (prop === "length") {
      if (passwordValue.length < 6) {
        passwordVerification.length = false;
      }
      else {
        passwordVerification.length = true;
        validationResult++;
      }
      continue;
    }
    if (regexList[prop].test(passwordValue)) {
      passwordVerification[prop] = true;
      validationResult++;
    } else {
      passwordVerification[prop] = false;
    }     
  }
  if (validationResult !== 3) {
    showValidation(2, false);
  } else {
    showValidation(2, true);
  }
  passwordStrength();
}

const lines = document.querySelectorAll(".lines div");

function passwordStrength() {
  const passwordLength = pwdInput.value.length;

  if (!passwordLength) {
    addLines(0);
  }
  else if (passwordLength > 9 && passwordVerification.symbol && passwordVerification.number){
    addLines(3)
  }
  else if (passwordLength > 6 && passwordVerification.symbol || passwordVerification.number){
    addLines(2)
  }
  else {
    addLines(1)
  }
}

function addLines(numberOfLines) {
  lines.forEach((element,index) => {
    if (index < numberOfLines) {
      element.classList.remove("hidden");
      element.classList.add("inline-block");
    } else {
      element.classList.add("hidden");
      element.classList.remove("inline-block");
    }
  })
}



// Affichage validation si OK ou KO
function showValidation(index, validation) {
  if (validation) {
    validationIcons[index].classList.remove("hidden");
    validationIcons[index].src = "ressources/check.svg";
    if (validationTexts[index]) validationTexts[index].classList.add("hidden");
    
  } else {
    validationIcons[index].classList.remove("hidden");
    validationIcons[index].src = "ressources/error.svg";
    if (validationTexts[index]) validationTexts[index].classList.remove("hidden");
  }
}


// const userName = document.querySelector("#userName");
// const pwdNew = document.querySelector("#pwdNew");
// const pwdConfirm = document.querySelector("#pwdConfirm");
// const mailUser = document.querySelector("#mailUser");
// const btnValidation = document.querySelector("#btnValidation");
// const isValidUserName = document.querySelector("#isValidUserName");
// const isValidMail = document.querySelector("#isValidMail");
// const iconStateUserName = document.querySelector("#iconStateUserName");
// const pwdAlert = document.querySelector("#pwdAlert");
// const pwdConfirmOK = document.querySelector("#pwdConfirmOK");
// const container = document.querySelector(".contain");

// let errorMessage = "";
// let iconHTML = "";

// let topUserName = false;
// let topMail = false;
// let topNewPassword = false;
// let topConfirmPassword = false;

// userName.addEventListener("input", isUserValid);
// mailUser.addEventListener("input", isMailValid);
// pwdNew.addEventListener("input", isNewPwdValid);
// pwdConfirm.addEventListener("input", isPWdConfirmValid);

// function isUserValid() {
//   if (userName.value.length < 3) {
//     errorMessage = '<span class="text-red-500">Choisissez un pseudo contenant au moins 3 caractères.</span>';
//     iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[31px]">`;
//     topUserName = false;
//   } else {
//     iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[31px]">`;
//     errorMessage = "";
//     topUserName = true;
//   }

//   isValidUserName.innerHTML = errorMessage + iconHTML;
// }

// function isMailValid() {
//   const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}$/;
//   let testEmail = emailRegex.test(mailUser.value);

//   if (!testEmail) {
//     errorMessage = '<span class="text-red-500">Rentrez un email valide.</span>';
//     iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
//     topMail = false;
//   } else {
//     iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
//     errorMessage = "";
//     topMail = true;
//   }
//   isValidMail.innerHTML = errorMessage + iconHTML;

// }

// function isNewPwdValid() {
//   const caracDecimal = /\d/;
//   const caracSpeciaux = /[$&@!]/;
//   const minNumberofChars = 6;
//   let pwdForce = "";

//   if (pwdNew.value.length === 0) {
//     iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
//     topNewPassword = false;
//   } else if (pwdNew.value.length < minNumberofChars) {
//     iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
//     pwdForce = `<div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>`;
//     topNewPassword = false;
//   } else if (pwdNew.value.length >= minNumberofChars && !pwdNew.value.match(caracSpeciaux) && !pwdNew.value.match(caracDecimal)) {
//     iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
//     pwdForce = `
//         <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>`;
//     topNewPassword = false;
//   } else if (pwdNew.value.length >= minNumberofChars && pwdNew.value.match(caracSpeciaux) && !pwdNew.value.match(caracDecimal)) {
//     iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
//     pwdForce = `
//         <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
//         <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>`;
//     topNewPassword = false;
//   } else if (pwdNew.value.length >= minNumberofChars && !pwdNew.value.match(caracSpeciaux) && pwdNew.value.match(caracDecimal)) {
//     iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
//     pwdForce = `
//         <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
//         <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>`;
//     topNewPassword = false;
//   } else if (pwdNew.value.match(caracSpeciaux) && pwdNew.value.length >= minNumberofChars && pwdNew.value.length < minNumberofChars + 3 && pwdNew.value.match(caracDecimal)) {
//     iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
//     pwdForce = `
//         <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
//         <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>`;
//     topNewPassword = true;
//   } else if (pwdNew.value.match(caracSpeciaux) && pwdNew.value.length >= minNumberofChars && pwdNew.value.length >= minNumberofChars + 3 && pwdNew.value.match(caracDecimal)) {
//     iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
//     pwdForce = `
//         <div id="pwdFaible" class="w-40 text-center inline-block ml-3.5"><hr class="w-28 h-1 mx-auto mb-2 bg-orange-600 border-0 rounded ">faible</div>
//         <div id="pwdMoyen" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-yellow-200 border-0 rounded">moyen</div>
//         <div id="pwdFort" class="w-40 text-center inline-block"><hr class="w-28 h-1 mx-auto mb-2 bg-lime-400 border-0 rounded ">fort</div>`;
//     topNewPassword = true;
//   }

//   pwdAlert.innerHTML = pwdForce + iconHTML;
  
// }

// function isPWdConfirmValid() {
//   if (pwdConfirm.value !== pwdNew.value && pwdConfirm.value !== "") {
//     iconHTML = `<img src="ressources/error.svg" alt="Erreur" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
//     topConfirmPassword = false;
//   } else if (pwdConfirm.value === pwdNew.value && pwdNew.value !== "") {
//     iconHTML = `<img src="ressources/check.svg" alt="OK" class="absolute h-8 w-8 right-0 top-[57px] -mt-0.5">`;
//     topConfirmPassword = true;
//   }
//   pwdConfirmOK.innerHTML = iconHTML;
  
// }



// btnValidation.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(userName.value, mailUser.value, pwdNew.value, pwdConfirm.value);
//   if (topUserName && topMail && topNewPassword && topConfirmPassword) {
//     alert("Données envoyées avec succès");
//     document.querySelector("form").reset();
//   } else {
//     alert("Erreur");
//     isUserValid();
//     isMailValid();
//     isNewPwdValid();
//     isPWdConfirmValid();
//     container.classList.add("shake");
//   }
// });
