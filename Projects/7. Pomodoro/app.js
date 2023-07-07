const displayWork = document.querySelector("#displayWork");
const displayBreak = document.querySelector("#displayBreak");
const progressWork = document.querySelector("#progressWork");
const progressBreak = document.querySelector("#progressBreak");
const btnPlay = document.querySelector("#btnPlay");
const btnReset = document.querySelector("#btnReset");
const displayCount = document.querySelector("#displayCount");

let minutesWork = 29;
let minutesBreak = 4;
let secondesWork = 59;
let secondesBreak = 59;

let count = 0;
let isPaused = true;

playEvent();

// Remplacez les déclarations de intervalWork et intervalBreak par les suivantes
let timeoutWork;
let timeoutBreak;

// Dans les fonctions timerWork et timerBreak, remplacez setInterval par setTimeout
function timerWork() {
  if (secondesWork === 0 && minutesWork === 0) {
    clearInterval(intervalWork);
    progressWork.classList.add("hidden");
    displayWork.classList.add("mt-1.5");
    displayWork.textContent = "0:00";
    timerBreak();
  } else {
    progressWork.classList.remove("hidden");
    displayWork.classList.remove("mt-1.5");
    displayWork.textContent = `${minutesWork}:${String(secondesWork).padStart(2, "0")}`;
    secondesWork -= 1;
    if (secondesWork < 0) {
      secondesWork = 59;
      minutesWork--;
    }
    timeoutWork = setTimeout(timerWork, 1000); // Utilisez setTimeout ici
  }
}

function timerBreak() {
  if (secondesBreak === 0 && minutesBreak === 0 && secondesWork === 0 && minutesWork === 0) {
    clearInterval(intervalBreak);
    progressBreak.classList.add("hidden");
    displayBreak.classList.add("mt-1.5");
    displayWork.textContent = "30:00";
    displayBreak.textContent = "5:00";
    count++;
    displayCount.innerHTML = `<span id="displayCount">&nbsp;${count}</span>`;
    restetMinSec();
    playEvent();
    timerWork();
  } else {
    progressWork.classList.add("hidden");
    displayWork.classList.add("mt-1.5");
    progressBreak.classList.remove("hidden");
    displayBreak.classList.remove("mt-1.5");
    displayBreak.textContent = `${minutesBreak}:${String(secondesBreak).padStart(2, "0")}`;
    secondesBreak -= 1;
    if (secondesBreak < 0) {
      secondesBreak = 59;
      minutesBreak--;
    }
    timeoutBreak = setTimeout(timerBreak, 1000); // Utilisez setTimeout ici
  }
}

// Dans la fonction toggleTimer, ajoutez la logique pour annuler les timeouts
function toggleTimer() {
  if (isPaused) {
    isPaused = false;
    btnPlay.innerHTML = '<div id="btnPlay" class="cursor-pointer border bg-zinc-100 rounded-md w-16 h-16 flex items-center justify-center"><img src="./ressources/pause.svg" width="35px" alt=""></div>';
    timerWork();
  } else {
    clearTimeout(timeoutWork); // Annule le timeout de timerWork
    progressWork.classList.add("hidden");
    displayWork.classList.add("mt-1.5");
    clearTimeout(timeoutBreak); // Annule le timeout de timerBreak
    progressBreak.classList.add("hidden");
    displayBreak.classList.add("mt-1.5");
    isPaused = true;
    btnPlay.innerHTML = '<div id="btnPlay" class="cursor-pointer border bg-zinc-100 rounded-md w-16 h-16 flex items-center justify-center"><img src="./ressources/play.svg" width="35px" alt=""></div>';
  }
}


// Bouton reset
btnReset.addEventListener("click", () => {
  clearInterval(timeoutWork);
  clearTimeout(timeoutBreak);
  progressWork.classList.add("hidden");
  displayWork.classList.add("mt-1.5");
  progressBreak.classList.add("hidden");
  displayBreak.classList.add("mt-1.5");
  restetMinSec();
  count = 0;
  isPaused = true;
  
  btnPlay.innerHTML = '<div id="btnPlay" class="cursor-pointer border bg-zinc-100 rounded-md w-16 h-16 flex items-center justify-center"><img src="./ressources/play.svg" width="35px" alt=""></div>';
  displayCount.innerHTML = `<span id="displayCount">&nbsp;${count}</span>`;
  displayWork.textContent = "30:00";
  displayBreak.textContent = "5:00";
});

// Fonction play
function playEvent() {
  btnPlay.addEventListener("click", toggleTimer);
}


// Reset des minutes et secondes
function restetMinSec() {
  minutesWork = 29;
  minutesBreak = 4;
  secondesWork = 59;
  secondesBreak = 9;
}