const cookieForm = document.querySelector("#myForm");
const inputs = document.querySelectorAll("input")
const resultsDisplay = document.querySelector(".results-display");

let nameInput = document.querySelector("#nameInput");
let valueInput = document.querySelector("#valueInput");

inputs.forEach(input => {
    input.addEventListener("invalid", handleValidation);
    input.addEventListener("input", handleValidation);
})

function handleValidation(event) {
    if (event.type === "invalid") {
        event.target.setCustomValidity("Ce champ ne peut être vide.")
    }
    else if (event.type === "invalid") {
        event.target.setCustomValidity("")
    }
}



cookieForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche la soumission du formulaire

    console.log(nameInput.value);
    console.log(valueInput.value);

    const newCookie = {};

    inputs.forEach(input => {
        const nameAttribute = input.getAttribute("name")
        newCookie[nameAttribute] = input.value;
    })
    newCookie.expires = new Date (new Date().getTime() + 7 * 24 * 60 * 60 * 1000)

    cookieForm.reset();
    createCookie(newCookie);

})

function createCookie(newCookie) {

    if (doesCookieExist(newCookie.name)) {
        createToast({name: newCookie.name, state: "modifié", color: "orangered"})
    } 
    else {
        createToast({name: newCookie.name, state: "créé", color: "green"})
    }

    document.cookie = `${encodeURIComponent(newCookie.name)}=${encodeURIComponent(newCookie.value)};expires=${newCookie.expires.toUTCString()}`;

    if (cookiesList.children.length) {
        displayCookies();
    }
}

function doesCookieExist(name) {

    const cookies = document.cookie.replace(/\/s/g,"").split(";");
    const onlyCookiesName = cookies.map(cookie => cookie.split('=')[0]);
    console.log(cookies,onlyCookiesName);

    const cookiePresence = onlyCookiesName.find(cookie => cookie === encodeURIComponent(name))
    return cookiePresence;
}

const toastContainer = document.querySelector(".toast-container");

function createToast({name, state, color}) {
    const toastInfo = document.createElement("p");
    toastInfo.classList.add("text-lg", "p-3", "m-3", "min-w-[150px]", "rounded-lg");
    toastInfo.textContent = `Cookie ${name} ${state}.`;
    toastInfo.style.backgroundColor = color;
    toastContainer.appendChild(toastInfo);

    setTimeout(() => {
        toastInfo.remove();
    }, 2500)
}

const cookiesList = document.querySelector(".cookies-list");
const displayCookieBtn = document.querySelector(".display-cookie-btn");
const InfoTxt = document.querySelector(".info-txt");

displayCookieBtn.addEventListener("click", displayCookies)

let lock = false;
function displayCookies() {

    if(cookiesList.children.length) cookiesList.textContent ="";

    const cookies = document.cookie.replace(/\/s/g,"").split(";").reverse();
    console.log(cookies);

    if(!cookies[0]) {
        if (lock) return;

        lock = true;
        InfoTxt.textContent = "Pas de cookies à afficher, créez en un !"

        setTimeout(() => {
            InfoTxt.textContent = "";
            lock = false;
        }, 1500);
        return;
    }
    createElement(cookies);
}


function createElement(cookies) {
    cookies.forEach(cookie => {
        const formatCookie = cookie.split("=");

        const listItem = document.createElement("li");
        listItem.classList.add("text-lg", "p-2.5", "bg-white", "max-w-[250px]", "rounded-md", "relative", "shadow-md");
        
        const name = decodeURIComponent(formatCookie[0])
        listItem.innerHTML =  `
        <div class="flex justify-end">
          <span class="text-red-500 cursor-pointer suppression"><img src="redcross.svg"width="20"></img></span>
        </div>
        <p class="m-2.5 text-left">
            <span class="font-semibold">Nom</span> : ${name}
        </p>
        <p class="m-2.5 text-left">
            <span class="font-semibold">Valeur</span>: ${decodeURIComponent(formatCookie[1])}
        </p>
        `;
        listItem.querySelector(".suppression").addEventListener("click", e => {
            createToast({name: name, state: "supprimé", color: "crimson"});
            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`;
            e.target.closest("li").remove(); // Supprime l'élément li parent le plus proche
        });
        
        cookiesList.appendChild(listItem);
    })
}

