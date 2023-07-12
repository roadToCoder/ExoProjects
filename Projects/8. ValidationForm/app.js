const inputsValidity = {
  user: false,
  email:false,
  password: false,
  passwordConfirmation : false
}

const form = document.querySelector("form");
const container = document.querySelector(".container");

form.addEventListener("submit",handleform);

let isAnimating = false;
function handleform(e) {
  e.preventDefault()

  const keys = Object.keys(inputsValidity);
  const failedInputs = keys.filter(key => !inputsValidity[key]);
 
  if (failedInputs.length && !isAnimating) {
    container.classList.add("shake");
    isAnimating = true;

    setTimeout(() => {
      container.classList.remove("shake");
      isAnimating = false;
    },400)

    failedInputs.forEach(input => {
      const index = keys.indexOf(input);
      showValidation(index,false);
    })
  }
  else {
    alert("Données envoyées avec succès");
  }
}

const validationIcons = document.querySelectorAll(".icon-verif");
const validationTexts = document.querySelectorAll(".error-msg");


// Vérification du user
const userInput = document.querySelector(".input-group:nth-child(1) input");

userInput.addEventListener("blur", userValidation);
userInput.addEventListener("input", userValidation);

function userValidation() {
  if ( userInput.value.length >= 3) {
    showValidation(0, true);
    inputsValidity.user = true;
  } else {
    showValidation(0, false);
    inputsValidity.user = false;
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
    inputsValidity.email = true;
  } else {
    showValidation(1, false);
    inputsValidity.email = false;
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
    inputsValidity.password = false;
  } else {
    showValidation(2, true);
    inputsValidity.password = true;

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
  else if (passwordLength > 6 && (passwordVerification.symbol || passwordVerification.number) || (passwordVerification.number || passwordVerification.symbol)){
    addLines(2)
  }
  else {
    addLines(1)
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
  if (validationIcons[3].classList !== "hidden") {
    confirmPassword();
  }
}


// Confirmation du mot de passe
const confirmPwdInput = document.querySelector(".input-group:nth-child(4) input");

confirmPwdInput.addEventListener("blur", confirmPassword);
confirmPwdInput.addEventListener("input", confirmPassword);

function confirmPassword() {
  confirmedValue = confirmPwdInput.value;

  if (!confirmedValue && !passwordValue) {
    validationIcons[3].classList.add("hidden");
  } else if (confirmedValue !== passwordValue){
    showValidation(3,false)
    inputsValidity.passwordConfirmation = false;

  } else {
    showValidation(3,true)
    inputsValidity.passwordConfirmation = true;

  }
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