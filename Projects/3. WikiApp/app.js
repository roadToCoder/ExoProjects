// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector('#myForm');
const errorMsg = document.querySelector(".error-msg")
let tabResult = [];

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche la soumission du formulaire
    const textInput = document.querySelector('#textInput').value;

    if (textInput === "") {
        errorMsg.textContent = "Wops, veuillez remplir l'input";
        return;
    } else {
        errorMsg.textContent = "";
        recherche(textInput);       
    }

});

const recherche = async textInput => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${textInput}`;
    console.log(textInput);

    const response = await fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json.query.search);
            tabResult = json.query.search;
            afficherResultats(tabResult);
        })
        .catch(error => {
            console.log(error.message);
        });
};

function afficherResultats(resultats) {
    if(!resultats.length) {
        errorMsg.textContent = "Wopsy, aucun résultat";
        return;
    }
    const tableauResultats = document.querySelector('.tableauResultats');
    tableauResultats.innerHTML = ''; // Réinitialiser le contenu du tableau
    
    const ulElement = document.createElement('ul');
    
    resultats.forEach(resultat => {
        let url =`https://en.wikipedia.org/?curid=${resultat.pageid}`;
        let liElement = document.createElement("li");
            liElement.className = "mb-5";
            liElement.innerHTML = '<h3 class="text-xl text-blue-700 decoration-auto underline font-bold"><a href="' + url + '" target="_blank" rel="noopener">' + resultat.title +'</a></h3><a href="' + url + '" class="text-lime-800" target="_blank" rel="noopener">' + url + '</a><br/><span class="text-sm ">' + resultat.snippet + '</span><br></div>';
      ulElement.appendChild(liElement);
    });
    
    tableauResultats.appendChild(ulElement);
  }