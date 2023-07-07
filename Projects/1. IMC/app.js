const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// Récupération du poids et de la taille avec la méthode "GET"

const searchParams = new URLSearchParams(window.location.search); 
const formulaire = document.querySelector(".formulaire")
const valeurTaille = searchParams.get("taille");
const valeurPoids = searchParams.get("poids");
console.log((valeurTaille));
console.log((valeurPoids));



if ((valeurTaille !== null && valeurTaille > 0) && (valeurPoids !== null  && valeurPoids > 0)) {



  const attenteCalcul = document.querySelector(".attenteCalcul");
  let resultatCalcul = document.createElement("p");
  const IMC = calculImc(valeurPoids, valeurTaille);
  const couleur = recupererresultatIMC(IMC);
  
  resultatCalcul.innerHTML = IMC;
  resultatCalcul.style.color = couleur.color;
  resultatCalcul.classList = "text-center text-4xl pt-4"
  attenteCalcul.parentNode.replaceChild(resultatCalcul, attenteCalcul);

  const attenteCommentaire = document.querySelector(".attenteCommentaire");
  let resultatCommentaire = document.createElement("p");
  const resultat = recupererresultatIMC(IMC);
  resultatCommentaire.innerHTML = "Résultat : " + resultat.name;
  resultatCommentaire.classList ="text-center text-xl font-light";
  attenteCommentaire.parentNode.replaceChild(resultatCommentaire, attenteCommentaire);
} 

else if (((valeurTaille === "" || valeurTaille < 0) && valeurPoids > 0) ||(valeurTaille > 0 && (valeurPoids === "" || valeurPoids < 0)) || (valeurTaille === "" || valeurTaille < 0) && (valeurPoids === "" || valeurPoids < 0)){
  const attenteCalcul = document.querySelector(".attenteCalcul");
  let resultatCalcul = document.createElement("p");
  resultatCalcul.innerHTML = "Wops";
  resultatCalcul.classList = "text-center text-4xl  pt-4"
  attenteCalcul.parentNode.replaceChild(resultatCalcul, attenteCalcul);

  const attenteCommentaire = document.querySelector(".attenteCommentaire");
  let resultatCommentaire = document.createElement("p");
  resultatCommentaire.innerHTML = "Remplissez correctement les inputs.";
  resultatCommentaire.classList ="text-center text-xl font-light";
  attenteCommentaire.parentNode.replaceChild(resultatCommentaire, attenteCommentaire);
} 
else {

}


function calculImc(poids,taille) {
  IMC = (poids / ((taille*taille)/10000))
  return (Math.round(IMC * 100) / 100);
}

function recupererresultatIMC(IMC) {
  for (let i = 0; i < BMIData.length; i++) {
    const { range, color, name } = BMIData[i];

    if (Array.isArray(range)) {
      const [min, max] = range;
      if (IMC >= min && IMC < max) {
        return { color, name };
      }
    } else {
      if (IMC >= range) {
        return { color, name };
      }
    }
  }
  return { color: "", name: "" };
}
