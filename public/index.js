const app = function(){
  const url = "http://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);
}

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

const requestComplete = function() {
  if(this.status !== 200) return;
  // console.log(this.responseText);
  const countries = JSON.parse(this.response);
  // console.log(countries);
  populateList(countries);
}

const populateList = function(countries) {
  const ul = document.querySelector("#country-list");
  countries.forEach(function(country) {
    if (country.population > 54400) {
      const li = document.createElement("li");
      li.textContent = country.name + "    -     " + country.capital + "    -    " + country.population;
      ul.appendChild(li);
    }
  })
}

window.addEventListener('load', app);