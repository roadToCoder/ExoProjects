const errorInformation = document.querySelector("#errorInformation") as HTMLDivElement;
const displayFlag = document.querySelector("#displayFlag") as HTMLDivElement;
const displayButtons = document.querySelector("#displayButtons")!;
const displayResult = document.querySelector("#displayResult") as HTMLDivElement;
const displayChangeCountry = document.querySelector("#displayChangeCountry") as HTMLDivElement;
const btn = document.querySelector("button")!;

let goodAnswer = "";
let allAnswersDisplayed:any[] = [];

// Appelle l'API RestCountries
async function getCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');

    if(!response.ok) {
      throw new Error(`Error ${response.status}, ${response.statusText}`)
    }

    const dataCountries = await response.json();

    getRandomCountry(dataCountries);

    getRandomAnswers(dataCountries,goodAnswer);
    
    getValueButton();
    
    displaysInfos(dataCountries);

  } 
  
  // Gestion des erreurs
  catch (error) {

    if (error instanceof Error) {
      errorInformation.textContent = error.message;
    } else {
      errorInformation.innerHTML = `Unexpected error : ${error}`;
    }
  }
}

getCountries();

interface CountryData {
  name: string;
  translations: {
    fra: {
      official: string;
    };
  };
  flags: {
    png: string;
  };
}


// Sélectionne le drapeau et le nom d'un pays au hasard
const getRandomCountry = (country:CountryData[]) => {
  const number = getRandomNumbers(0,250)
  const randomCountry = {
    name: country[number].translations.fra.official,
    flag: country[number].flags.png
  }
  displayFlag.innerHTML = `<img src="${randomCountry.flag}" class="ml-4"></img>`;

  return goodAnswer = randomCountry.name;
}


// Obtenir de mauvaises réponses et récupérer la bonne
const getRandomAnswers = (country: CountryData[], goodAnswer: string) => {
  const allAnswers = country.map((c) => c.translations.fra.official);
  const allWrongAnswers = allAnswers.filter((answer) => answer !== goodAnswer);


  // Sélectionner 3 mauvaises réponses de manière aléatoire
  const selectedWrongAnswers = shuffleArray(allWrongAnswers).slice(0, 3);
  

  // Fusionner les réponses (3 mauvaises + 1 bonne) et mélanger
  const answersToDisplay = shuffleArray([...selectedWrongAnswers, goodAnswer]);
  for (let i = 0; i < answersToDisplay.length; i++) {
    displayButtons.innerHTML += `<button type="submit" value="${answersToDisplay[i]}" class="pointer-events-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-4 mt-4">${answersToDisplay[i]}</button>`;
  }

  return allAnswersDisplayed = answersToDisplay;
};


// Envoie la valeur du bouton et la bonne réponse 
const getValueButton = () => {
  displayButtons.addEventListener("click", (event) => {
    const clickedButton = event.target as HTMLButtonElement;
    const buttonValue = clickedButton.value;
    getResult(goodAnswer,buttonValue)      
  });
};


// Test et affichage de la réponse
const getResult = (goodAnswer:string, buttonValue:string) => {
  if (buttonValue === goodAnswer) {
    displayResult.innerHTML = `<div class="rounded bg-green-400 mt-6 ml-4 p-3 w-10/12 font-semibold">${buttonValue} est la bonne réponse</div>`
    newCountryBtn()
  }
  else {
    displayResult.innerHTML = `<div class="rounded bg-red-400 mt-6 ml-4 p-3 w-10/12 font-semibold">${buttonValue} n'est pas la bonne réponse</div>`
    newCountryBtn()
  }
};


// Reset les infos affichées et affiche un nouveau pays
const displaysInfos = (dataCountries:any[]) => {
  displayChangeCountry.addEventListener("click", () => {
    displayFlag.innerHTML = ""; 
    displayButtons.innerHTML = "";
    displayResult.innerHTML = "";
    getRandomCountry(dataCountries);
    getRandomAnswers(dataCountries, goodAnswer);
  });
};


// Afficher le bouton nouveau pays
const newCountryBtn = () => {
  displayChangeCountry.innerHTML = `<button class="pointer-events-auto font-semibold mt-6 ml-4 p-2 bg-amber-300 hover:bg-amber-200 text-black y-2 px-4 border-b-4 border-amber-400 hover:border-amber-300 rounded">Changer de pays</button>`;
}


// Mélanger un tableau (algorithme de Fisher-Yates)
const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


// Génère des chiffres aléatoires
const getRandomNumbers = (min:number, max:number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
