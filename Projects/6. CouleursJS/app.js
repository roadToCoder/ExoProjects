const body = document.querySelector("body");
const inputGroups = document.querySelectorAll(".input-group");
const range = document.querySelector("#orientation");

// Charge la page avec les couleurs par défaut
window.addEventListener("load", function () {
    inputGroups.forEach((inputGroup) => {
      const inputColor = inputGroup.querySelector("input[type='color']");
      const labelColor = inputGroup.querySelector("label");
      inputColor.value = labelColor.textContent;      
    });
  
    updateBackgroundColor(); // Mettre à jour le gradient par défaut
  });
// Ajout d'un écouteur d'événement pour chaque input de type color
inputGroups.forEach((inputGroup) => {
  const input = inputGroup.querySelector("input[type='color']");
  input.addEventListener("input", updateBackgroundColor);
});



// Ajout d'un écouteur d'événement pour le range
range.addEventListener("input", updateBackgroundColor);

let bodyBackground;

function updateBackgroundColor() {
  // Mettre à jour les couleurs de fond pour chaque input de type color
  inputGroups.forEach((inputGroup) => {
    const input = inputGroup.querySelector("input[type='color']");
    inputGroup.querySelector("label").textContent = input.value.toUpperCase();
    inputGroup.style.background = `${input.value}`;
    adaptInputColors()
  });

  // Mettre à jour la valeur de l'orientation du gradient
  document.querySelector("span.orientation-value").textContent = `${range.value}°`;

  // Mettre à jour la couleur de fond du body avec le gradient linéaire
  body.style.background = `linear-gradient(${range.value}deg, ${color1.value}, ${color2.value})`;
  bodyBackground = body.style.background;
}

const copyBtn = document.querySelector(".copy-btn");
copyBtn.addEventListener("click", copyBodyBackground);

function copyBodyBackground(e) {
  e.preventDefault();

  // Copier le contenu de bodyBackground dans le presse-papiers
  if (bodyBackground && bodyBackground.length) {
    navigator.clipboard.writeText(`linear-gradient(${range.value}deg, ${color1.value.toUpperCase()}, ${color2.value.toUpperCase()})`).then(() => {
        createToast();
    });
  } else {
    alert("Veuillez saisir le texte à copier.");
  }
}

const randomBtn = document.querySelector(".random-btn");
randomBtn.addEventListener("click", randomBodyBackground);

function randomBodyBackground(e) {
  e.preventDefault();

  // Générer une couleur aléatoire pour chaque input de type color
  inputGroups.forEach((inputGroup) => {
    const input = inputGroup.querySelector("input[type='color']");
    const randomValue = getRandomColor();
    input.value = randomValue;

    // Générer une valeur aléatoire pour le range
    const randomRangeValue = getRandomRangeValue();
    range.value = randomRangeValue;

    // Mettre à jour la couleur de fond en utilisant les valeurs aléatoires
    updateBackgroundColor();
  });
}

function getRandomColor() {
  // Générer une couleur hexadécimale aléatoire
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
}

function getRandomRangeValue() {
  // Générer une valeur aléatoire pour le range entre 0 et 360
  return Math.floor(Math.random() * 361);
}


// Sélectionne les éléments nécessaires
const draggableArea = document.querySelector('.draggable-area');
const boxContainer = document.getElementById('box-container');
const box = document.getElementById('box');

// Variables pour le déplacement
let isDragging = false;
let offset = { x: 0, y: 0 };

// Événements de la souris pour le déplacement
draggableArea.addEventListener('mousedown', startDragging);
draggableArea.addEventListener('mouseup', stopDragging);
draggableArea.addEventListener('mousemove', dragBox);

// Fonction pour commencer le déplacement
function startDragging(event) {
  isDragging = true;
  offset.x = event.offsetX;
  offset.y = event.offsetY;
}

// Fonction pour arrêter le déplacement
function stopDragging() {
  isDragging = false;
}

// Fonction pour déplacer la boîte
function dragBox(event) {
  if (isDragging) {
    box.style.left = event.pageX - boxContainer.offsetLeft - offset.x + 'px';
    box.style.top = event.pageY - boxContainer.offsetTop - offset.y + 'px';
  }
}

// Création du toast pour indiquer que l'élément à été copié
const buttonContainer = document.querySelector(".buttons-container");
function createToast() {
    const toastInfo = document.createElement("p");
    toastInfo.classList.add("absolute","text-md", "translate-y-6", "bg-slate-100","mr-44","mt-16","text-center","p-2","min-w-[50px]", "rounded-lg","transition-transform", "ease-in-out", "animate-spin");
    toastInfo.textContent = `Copié !`;
    buttonContainer.appendChild(toastInfo);

    setTimeout(() => {
        toastInfo.remove();
    }, 1000)
}

// Fonction qui permet d'adapter la couleur en fonction de la couleur du background
function adaptInputColors() {
    inputGroups.forEach((inputGroup) => {
      const inputColor = inputGroup.querySelector("input[type='color']");
      const labelColor = inputGroup.querySelector("label");
  
      // Vérifier si la couleur est définie correctement
      if (inputColor && labelColor) {
        const hexColor = inputColor.value.replace("#", "");
        const red = parseInt(hexColor.slice(0, 2), 16);
        const green = parseInt(hexColor.slice(2, 4), 16);
        const blue = parseInt(hexColor.slice(4, 6), 16);
  
        // Vérifier si la conversion hexadécimale a réussi
        if (!isNaN(red) && !isNaN(green) && !isNaN(blue)) {
          const yiq = (red * 299 + green * 587 + blue * 144) / 1000;
  
          if (yiq >= 128) {
            labelColor.style.color = "#111";
            elementsSombres()
          } else {
            labelColor.style.color = "#f1f1f1";
            elementsClairs()
          }
        }
      }
    });
  }
  
function elementsClairs() {
    const box = document.querySelector("#box");
    box.classList.remove("border-black");
    box.classList.add("border-white");

    const svg = document.querySelector("svg");
    svg.innerHTML = `<svg height="50px"  class="pointer-events-none select-none" version="1.1" viewBox="0 0 48 48" width="50px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title/>
    <g fill="none" fill-rule="evenodd" id="arrow-move" stroke="none" stroke-width="1">
        <path d="M3.58077819,25.7275058 L3.54130289,25.800225 C3.39947856,26.1207263 3.63161808,26.5 4,26.5 L8.5,26.5 L8.5,32 C8.5,32.2761424 8.72385763,32.5 9,32.5 L12,32.5 L12.0898756,32.4919443 C12.3231248,32.4496084 12.5,32.2454599 12.5,32 L12.5,26.5 L17,26.5 C17.396719,26.5 17.635429,26.0601323 17.4192218,25.7275058 L10.9192218,15.7275058 C10.7220501,15.4241647 10.2779499,15.4241647 10.0807782,15.7275058 L3.58077819,25.7275058 Z M10.5,16.917 L16.078,25.5 L12,25.5 L11.9101244,25.5080557 C11.6768752,25.5503916 11.5,25.7545401 11.5,26 L11.5,31.5 L9.5,31.5 L9.5,26 L9.49194433,25.9101244 C9.44960837,25.6768752 9.24545989,25.5 9,25.5 L4.921,25.5 L10.5,16.917 Z" fill="#f1f1f1" fill-rule="nonzero" id="Path" transform="translate(10.500000, 24.000000) rotate(-90.000000) translate(-10.500000, -24.000000) "/>
        <path d="M30.5807782,25.7275058 L30.5413029,25.800225 C30.3994786,26.1207263 30.6316181,26.5 31,26.5 L35.5,26.5 L35.5,32 C35.5,32.2761424 35.7238576,32.5 36,32.5 L39,32.5 L39.0898756,32.4919443 C39.3231248,32.4496084 39.5,32.2454599 39.5,32 L39.5,26.5 L44,26.5 C44.396719,26.5 44.635429,26.0601323 44.4192218,25.7275058 L37.9192218,15.7275058 C37.7220501,15.4241647 37.2779499,15.4241647 37.0807782,15.7275058 L30.5807782,25.7275058 Z M37.5,16.917 L43.078,25.5 L39,25.5 L38.9101244,25.5080557 C38.6768752,25.5503916 38.5,25.7545401 38.5,26 L38.5,31.5 L36.5,31.5 L36.5,26 L36.4919443,25.9101244 C36.4496084,25.6768752 36.2454599,25.5 36,25.5 L31.921,25.5 L37.5,16.917 Z" fill="#f1f1f1" fill-rule="nonzero" id="Path" transform="translate(37.500000, 24.000000) scale(-1, 1) rotate(-90.000000) translate(-37.500000, -24.000000) "/>
        <path d="M17.0807782,39.2268571 L17.0413029,39.2995763 C16.8994786,39.6200776 17.1316181,39.9993513 17.5,39.9993513 L22,39.999 L22,45.4993513 C22,45.7754937 22.2238576,45.9993513 22.5,45.9993513 L25.5,45.9993513 L25.5898756,45.9912956 C25.8231248,45.9489597 26,45.7448112 26,45.4993513 L26,39.999 L30.5,39.9993513 C30.896719,39.9993513 31.135429,39.5594836 30.9192218,39.2268571 L24.4192218,29.2268571 C24.2220501,28.923516 23.7779499,28.923516 23.5807782,29.2268571 L17.0807782,39.2268571 Z M24,30.416 L29.578,38.999 L25.5,38.9993513 L25.4101244,39.007407 C25.1768752,39.0497429 25,39.2538914 25,39.4993513 L25,44.999 L23,44.999 L23,39.4993513 L22.9919443,39.4094757 C22.9496084,39.1762264 22.7454599,38.9993513 22.5,38.9993513 L18.421,38.999 L24,30.416 Z" fill="#f1f1f1" fill-rule="nonzero" id="Path" transform="translate(24.000000, 37.499351) scale(1, -1) translate(-24.000000, -37.499351) "/>
        <path d="M17.0807782,12.2268571 L17.0413029,12.2995763 C16.8994786,12.6200776 17.1316181,12.9993513 17.5,12.9993513 L22,12.999 L22,18.4993513 C22,18.7754937 22.2238576,18.9993513 22.5,18.9993513 L25.5,18.9993513 L25.5898756,18.9912956 C25.8231248,18.9489597 26,18.7448112 26,18.4993513 L26,12.999 L30.5,12.9993513 C30.896719,12.9993513 31.135429,12.5594836 30.9192218,12.2268571 L24.4192218,2.22685711 C24.2220501,1.92351601 23.7779499,1.92351601 23.5807782,2.22685711 L17.0807782,12.2268571 Z M24,3.416 L29.578,11.999 L25.5,11.9993513 L25.4101244,12.007407 C25.1768752,12.0497429 25,12.2538914 25,12.4993513 L25,17.999 L23,17.999 L23,12.4993513 L22.9919443,12.4094757 C22.9496084,12.1762264 22.7454599,11.9993513 22.5,11.9993513 L18.421,11.999 L24,3.416 Z" fill="#f1f1f1" fill-rule="nonzero" id="Path"/>
        <path d="M24,20 C21.790861,20 20,21.790861 20,24 C20,26.209139 21.790861,28 24,28 C26.209139,28 28,26.209139 28,24 C28,21.790861 26.209139,20 24,20 Z M24,21 C25.6568542,21 27,22.3431458 27,24 C27,25.6568542 25.6568542,27 24,27 C22.3431458,27 21,25.6568542 21,24 C21,22.3431458 22.3431458,21 24,21 Z" fill="#f1f1f1" fill-rule="nonzero" id="Oval"/>
    </g>
</svg>`
}

function elementsSombres() {
    const box = document.querySelector("#box");
    box.classList.remove("border-white");
    box.classList.add("border-black");

    const svg = document.querySelector("svg");
    svg.innerHTML = `<svg height="50px"  class="pointer-events-none select-none" version="1.1" viewBox="0 0 48 48" width="50px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title/>
    <g fill="none" fill-rule="evenodd" id="arrow-move" stroke="none" stroke-width="1">
        <path d="M3.58077819,25.7275058 L3.54130289,25.800225 C3.39947856,26.1207263 3.63161808,26.5 4,26.5 L8.5,26.5 L8.5,32 C8.5,32.2761424 8.72385763,32.5 9,32.5 L12,32.5 L12.0898756,32.4919443 C12.3231248,32.4496084 12.5,32.2454599 12.5,32 L12.5,26.5 L17,26.5 C17.396719,26.5 17.635429,26.0601323 17.4192218,25.7275058 L10.9192218,15.7275058 C10.7220501,15.4241647 10.2779499,15.4241647 10.0807782,15.7275058 L3.58077819,25.7275058 Z M10.5,16.917 L16.078,25.5 L12,25.5 L11.9101244,25.5080557 C11.6768752,25.5503916 11.5,25.7545401 11.5,26 L11.5,31.5 L9.5,31.5 L9.5,26 L9.49194433,25.9101244 C9.44960837,25.6768752 9.24545989,25.5 9,25.5 L4.921,25.5 L10.5,16.917 Z" fill="#000000" fill-rule="nonzero" id="Path" transform="translate(10.500000, 24.000000) rotate(-90.000000) translate(-10.500000, -24.000000) "/>
        <path d="M30.5807782,25.7275058 L30.5413029,25.800225 C30.3994786,26.1207263 30.6316181,26.5 31,26.5 L35.5,26.5 L35.5,32 C35.5,32.2761424 35.7238576,32.5 36,32.5 L39,32.5 L39.0898756,32.4919443 C39.3231248,32.4496084 39.5,32.2454599 39.5,32 L39.5,26.5 L44,26.5 C44.396719,26.5 44.635429,26.0601323 44.4192218,25.7275058 L37.9192218,15.7275058 C37.7220501,15.4241647 37.2779499,15.4241647 37.0807782,15.7275058 L30.5807782,25.7275058 Z M37.5,16.917 L43.078,25.5 L39,25.5 L38.9101244,25.5080557 C38.6768752,25.5503916 38.5,25.7545401 38.5,26 L38.5,31.5 L36.5,31.5 L36.5,26 L36.4919443,25.9101244 C36.4496084,25.6768752 36.2454599,25.5 36,25.5 L31.921,25.5 L37.5,16.917 Z" fill="#000000" fill-rule="nonzero" id="Path" transform="translate(37.500000, 24.000000) scale(-1, 1) rotate(-90.000000) translate(-37.500000, -24.000000) "/>
        <path d="M17.0807782,39.2268571 L17.0413029,39.2995763 C16.8994786,39.6200776 17.1316181,39.9993513 17.5,39.9993513 L22,39.999 L22,45.4993513 C22,45.7754937 22.2238576,45.9993513 22.5,45.9993513 L25.5,45.9993513 L25.5898756,45.9912956 C25.8231248,45.9489597 26,45.7448112 26,45.4993513 L26,39.999 L30.5,39.9993513 C30.896719,39.9993513 31.135429,39.5594836 30.9192218,39.2268571 L24.4192218,29.2268571 C24.2220501,28.923516 23.7779499,28.923516 23.5807782,29.2268571 L17.0807782,39.2268571 Z M24,30.416 L29.578,38.999 L25.5,38.9993513 L25.4101244,39.007407 C25.1768752,39.0497429 25,39.2538914 25,39.4993513 L25,44.999 L23,44.999 L23,39.4993513 L22.9919443,39.4094757 C22.9496084,39.1762264 22.7454599,38.9993513 22.5,38.9993513 L18.421,38.999 L24,30.416 Z" fill="#000000" fill-rule="nonzero" id="Path" transform="translate(24.000000, 37.499351) scale(1, -1) translate(-24.000000, -37.499351) "/>
        <path d="M17.0807782,12.2268571 L17.0413029,12.2995763 C16.8994786,12.6200776 17.1316181,12.9993513 17.5,12.9993513 L22,12.999 L22,18.4993513 C22,18.7754937 22.2238576,18.9993513 22.5,18.9993513 L25.5,18.9993513 L25.5898756,18.9912956 C25.8231248,18.9489597 26,18.7448112 26,18.4993513 L26,12.999 L30.5,12.9993513 C30.896719,12.9993513 31.135429,12.5594836 30.9192218,12.2268571 L24.4192218,2.22685711 C24.2220501,1.92351601 23.7779499,1.92351601 23.5807782,2.22685711 L17.0807782,12.2268571 Z M24,3.416 L29.578,11.999 L25.5,11.9993513 L25.4101244,12.007407 C25.1768752,12.0497429 25,12.2538914 25,12.4993513 L25,17.999 L23,17.999 L23,12.4993513 L22.9919443,12.4094757 C22.9496084,12.1762264 22.7454599,11.9993513 22.5,11.9993513 L18.421,11.999 L24,3.416 Z" fill="#000000" fill-rule="nonzero" id="Path"/>
        <path d="M24,20 C21.790861,20 20,21.790861 20,24 C20,26.209139 21.790861,28 24,28 C26.209139,28 28,26.209139 28,24 C28,21.790861 26.209139,20 24,20 Z M24,21 C25.6568542,21 27,22.3431458 27,24 C27,25.6568542 25.6568542,27 24,27 C22.3431458,27 21,25.6568542 21,24 C21,22.3431458 22.3431458,21 24,21 Z" fill="#000000" fill-rule="nonzero" id="Oval"/>
    </g>
</svg>`
}