const responses = ["c", "a", "b", "a", "c"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];

const form = document.querySelector(".formValid");

const question1 = document.querySelectorAll(".question1 input[type='radio']");
const question2 = document.querySelectorAll(".question2 input[type='radio']");
const question3 = document.querySelectorAll(".question3 input[type='radio']");
const question4 = document.querySelectorAll(".question4 input[type='radio']");
const question5 = document.querySelectorAll(".question5 input[type='radio']");

let count = 0;

const questions = [
  { question: question1, selector: ".question1" },
  { question: question2, selector: ".question2" },
  { question: question3, selector: ".question3" },
  { question: question4, selector: ".question4" },
  { question: question5, selector: ".question5" }
];

questions.forEach(({ question, selector }) => {
  question.forEach((input) => {
    input.addEventListener("click", () => {
      const questionDiv = input.closest(selector);
      questionDiv.classList.remove("bg-gradient-to-r", "from-lime-300", "to-cyan-200", "from-rose-600", "to-red-400");
    });
  });
});

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche la soumission du formulaire
    for (let i = 0; i < question1.length; i++) {
      if (question1[i].checked) {
        document.querySelector("div .question1").classList.remove("bg-gradient-to-r", "from-lime-300", "to-cyan-200", "from-rose-600", "to-red-400");
        if (question1[i].value === responses[0]) {
          document.querySelector("div .question1").classList.add("bg-gradient-to-r", "from-lime-300", "to-cyan-200"); 
          count++;
        } else {
          document.querySelector("div .question1").classList.add("bg-gradient-to-r", "from-rose-600", "to-red-400"); 
          
        }
      }
    }
    for (let i = 0; i < question2.length; i++) {
      if (question2[i].checked) {
        document.querySelector("div .question2").classList.remove("bg-gradient-to-r", "from-lime-300", "to-cyan-200", "from-rose-600", "to-red-400");
        if (question2[i].value === responses[1]) {
          document.querySelector("div .question2").classList.add("bg-gradient-to-r", "from-lime-300", "to-cyan-200"); 
          count++;
        } else {
          document.querySelector("div .question2").classList.add("bg-gradient-to-r", "from-rose-600", "to-red-400"); 
        }
      }
    }    
    for (let i = 0; i < question3.length; i++) {
      if (question3[i].checked) {
        document.querySelector("div .question3").classList.remove("bg-gradient-to-r", "from-lime-300", "to-cyan-200", "from-rose-600", "to-red-400");
        if (question3[i].value === responses[2]) {
          document.querySelector("div .question3").classList.add("bg-gradient-to-r", "from-lime-300", "to-cyan-200"); 
          count++;
        } else {
          document.querySelector("div .question3").classList.add("bg-gradient-to-r", "from-rose-600", "to-red-400"); 
        }
      }
    }    
    for (let i = 0; i < question4.length; i++) {
      if (question4[i].checked) {
        document.querySelector("div .question4").classList.remove("bg-gradient-to-r", "from-lime-300", "to-cyan-200", "from-rose-600", "to-red-400");
        if (question4[i].value === responses[3]) {
          document.querySelector("div .question4").classList.add("bg-gradient-to-r", "from-lime-300", "to-cyan-200"); 
          count++;
        } else {
          document.querySelector("div .question4").classList.add("bg-gradient-to-r", "from-rose-600", "to-red-400"); 
        }
      }
    }    
    for (let i = 0; i < question5.length; i++) {
      if (question5[i].checked) {
        document.querySelector("div .question5").classList.remove("bg-gradient-to-r", "from-lime-300", "to-cyan-200", "from-rose-600", "to-red-400");
        if (question5[i].value === responses[4]) {
          document.querySelector("div .question5").classList.add("bg-gradient-to-r", "from-lime-300", "to-cyan-200"); 
          count++;
        } else {
          document.querySelector("div .question5").classList.add("bg-gradient-to-r", "from-rose-600", "to-red-400"); 
        }
      }
    }
    afficherMessage(count);
    count= 0;         
});

function afficherMessage(count) {
  const affichageMessage = document.querySelector(".affichageMessage");
  let message = "";
  let emojiIndex1 = 0;
  let emojiIndex2 = 0;
  let additionalText = "Retentez une autre réponse dans les cases rouges, puis re-validez !";

  switch (count) {
    case 0:
      message = "Peut mieux faire !";
      emojiIndex1 = 4;
      emojiIndex2 = 4;
      break;
    case 1:
      message = "Peut mieux faire !";
      emojiIndex1 = 3;
      emojiIndex2 = 3;
      break;
    case 2:
      message = "Il reste quelques erreurs.";
      emojiIndex1 = 2;
      emojiIndex2 = 3;
      break;
    case 3:
      message = "Encore un effort ...";
      emojiIndex1 = 1;
      emojiIndex2 = 2;
      break;
    case 4:
      message = "Vous y êtes presque !";
      emojiIndex1 = 1;
      emojiIndex2 = 1;
      break;
    case 5:
      message = "Bravo, c'est un sans faute !";
      emojiIndex1 = 0;
      emojiIndex2 = 0;
      additionalText = "Quelle culture !";
      break;
    default:
      break;
  }

  const emoji1 = emojis[emojiIndex1];
  const emoji2 = emojis[emojiIndex2];
  const score = `${count} / 5`;

  affichageMessage.innerHTML = `
    <p class='mb-4'>${emoji1}${message}${emoji2}</p>
    <p class='mb-4 text-2xl'>Score: <span class='font-bold'>${score}</span></p>
    <p>${additionalText}</p>
  `;
}
