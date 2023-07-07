// Sélection des éléments HTML
const displayWork = document.querySelector("#displayWork");
const displayBreak = document.querySelector("#displayBreak");
const progressWork = document.querySelector("#progressWork");
const progressBreak = document.querySelector("#progressBreak");
const btnPlay = document.querySelector("#btnPlay");
const btnReset = document.querySelector("#btnReset");
const displayCount = document.querySelector("#displayCount");

// Initialisation des variables
let minutesWork = 29;
let minutesBreak = 7;
let secondesWork = 59;
let secondesBreak = 59;

let count = 0;
let isPaused = true;

// Appel de la fonction playEvent
playEvent();

// Déclaration des variables de timeout
let timeoutWork;
let timeoutBreak;

// Fonction de compte à rebours pour la partie travail
function timerWork() {
  if (secondesWork === 0 && minutesWork === 0) {
    // Si le temps de travail est écoulé
    toggleDisplays(progressWork, displayWork, true);
    displayWork.textContent = "0:00";
    timerBreak();
  } else {
    // Si le temps de travail n'est pas encore écoulé
    toggleDisplays(progressWork, displayWork, false);
    displayWork.textContent = `${minutesWork}:${String(secondesWork).padStart(
      2,
      "0"
    )}`;
    secondesWork -= 1;
    if (secondesWork < 0) {
      secondesWork = 59;
      minutesWork--;
    }
    timeoutWork = setTimeout(timerWork, 1000);
  }
}

// Fonction de compte à rebours pour la partie repos
function timerBreak() {
  if (
    secondesBreak === 0 &&
    minutesBreak === 0 &&
    secondesWork === 0 &&
    minutesWork === 0
  ) {
    // Si le temps de repos est écoulé
    toggleDisplays(progressBreak, displayBreak, true);
    displayWork.textContent = "30:00";
    displayBreak.textContent = "5:00";
    count++;
    displayCount.innerHTML = `<span id="displayCount">&nbsp;${count}</span>`;
    resetMinSec();
    playEvent();
    timerWork();
  } else {
    // Si le temps de repos n'est pas encore écoulé
    toggleDisplays(progressWork, displayWork, true);
    toggleDisplays(progressBreak, displayBreak, false);
    displayBreak.textContent = `${minutesBreak}:${String(
      secondesBreak
    ).padStart(2, "0")}`;
    secondesBreak -= 1;
    if (secondesBreak < 0) {
      secondesBreak = 59;
      minutesBreak--;
    }
    timeoutBreak = setTimeout(timerBreak, 1000);
  }
}

// Fonction de basculement entre play et pause
function toggleTimer() {
  if (isPaused) {
    // Si en pause, passer en mode play
    isPaused = false;
    btnPlay.innerHTML =
      '<div id="btnPlay" class="cursor-pointer border bg-zinc-100 rounded-md w-16 h-16 flex items-center justify-center shadow-xl"><img src="./ressources/pause.svg" width="35px" alt=""></div>';
    timerWork();
  } else {
    // Si en mode play, passer en pause
    clearTimeout(timeoutWork);
    toggleDisplays(progressWork, displayWork, true);
    clearTimeout(timeoutBreak);
    toggleDisplays(progressBreak, displayBreak, true);
    isPaused = true;
    btnPlay.innerHTML =
      '<div id="btnPlay" class="cursor-pointer border bg-zinc-100 rounded-md w-16 h-16 flex items-center justify-center shadow-xl"><img src="./ressources/play.svg" width="35px" alt=""></div>';
  }
}

// Gestionnaire d'événement pour le bouton Reset
btnReset.addEventListener("click", () => {
  clearTimeout(timeoutWork);
  clearTimeout(timeoutBreak);
  toggleDisplays(progressWork, displayWork, true);
  toggleDisplays(progressBreak, displayBreak, true);
  resetMinSec();
  count = 0;
  isPaused = true;

  btnPlay.innerHTML =
    '<div id="btnPlay" class="cursor-pointer border bg-zinc-100 rounded-md w-16 h-16 flex items-center justify-center shadow-xl"><img src="./ressources/play.svg" width="35px" alt=""></div>';
  displayCount.innerHTML = `<span id="displayCount">&nbsp;${count}</span>`;
  displayWork.textContent = "30:00";
  displayBreak.textContent = "5:00";
});

// Fonction d'écoute de l'événement de lecture
function playEvent() {
  btnPlay.addEventListener("click", toggleTimer);
}

// Fonction de réinitialisation des minutes et secondes
function resetMinSec() {
  minutesWork = 29;
  minutesBreak = 4;
  secondesWork =  59;
  secondesBreak = 59;
}

// Fonction pour basculer l'affichage des éléments
function toggleDisplays(progress, display, hidden) {
  progress.classList.toggle("hidden", hidden);
  display.classList.toggle("mt-1.5", hidden);
}
