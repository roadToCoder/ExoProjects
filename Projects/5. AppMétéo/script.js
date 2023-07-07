const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};  

const loaderContainer = document.querySelector(".loader-container");
const errorInformation = document.querySelector(".error-information");
const displayCity = document.querySelector(".city");
const displayPays = document.querySelector(".pays");
const displayTemperature = document.querySelector(".temperature");
const diplayIconWeather = document.querySelector(".iconWeather");
const infoIcon = document.querySelector(".info-icon")

// Écoutez l'événement "load" de la fenêtre
window.addEventListener('load', () => {
  setTimeout(() => {
    loaderContainer.classList.add("hidden");    
    request(displayCity, displayPays, displayTemperature, diplayIconWeather);
  }, 1500);
  return;
});

function request(displayCity,displayPays,displayTemperature,diplayIconWeather) {
    fetch("http://api.airvisual.com/v2/nearest_city?key=da53487c-460d-4297-b8c2-b34d551a9033", requestOptions)
        .then(response => {
          if(!response.ok) {
            throw new Error(`Error ${response.status}, ${response.statusText}`)
          } else {
            return response.text()
          }
        })
        .then(result => {
            // Supprimer les caractères d'échappement de la chaîne JSON
            result = JSON.parse(result);
    
            // Accéder aux valeurs de city, country, temperature et l'icone
            displayCity.innerHTML = result.data.city;
            displayPays.innerHTML = result.data.country;
            displayTemperature.innerHTML = result.data.current.weather.tp + "°";
            let iconWeather = result.data.current.weather.ic;

            diplayIconWeather.innerHTML = `<img width="140" class="absolute mt-28" src = "ressources/icons/${iconWeather}.svg"></img>`
        })
        .catch(error => {
          loaderContainer.classList.add("hidden");
          infoIcon.classList.remove("hidden");
          errorInformation.classList.remove("hidden");
          errorInformation.classList.add("flex");
          errorInformation.textContent = error.message;
        });    
}
 


