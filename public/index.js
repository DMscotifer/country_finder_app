const app = function(){
  const url = "http://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);

  const jsonStringCountry = localStorage.getItem('chosenCountry');
  const savedCountry = JSON.parse(jsonStringCountry);

  setDefinitionText('#country-name', savedCountry.name);
  setDefinitionText('#country-population', savedCountry.population);
  setDefinitionText('#country-capital', savedCountry.capital);
}

var setDefinitionText = function (id, text) {
  var span = document.querySelector(id);
  span.innerText = text;
}


const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

const requestComplete = function() {
  if(this.status !== 200) return;
  const countries = JSON.parse(this.response);
  populateSelectionList(countries);
  const dropdown = document.querySelector("#country");
  dropdown.addEventListener('change', function(){
    displayCountry(countries)
  });
  makeButton(countries);

}

const populateSelectionList = function(countries) {
  const selectField = document.getElementById("country");
  countries.forEach(function(country) {
    const option = document.createElement("option");
    option.textContent = country.name;
    selectField.appendChild(option);
  })

}

const populateList = function(countries) {
  const ul = document.querySelector("#country-list");
  countries.forEach(function(country) {
    if (country.population > 50000) {
      const li = document.createElement("li");
      li.textContent = country.name;
      ul.appendChild(li);
    }
  })
}

const makeButton = function(countries) {
  const button = document.getElementById("list-all-button");
  button.addEventListener("click", function() {
    populateList(countries);
  });
}

const displayCountry = function(countries) {
  const selectedCountry = document.querySelector('#country').value;
  let countryObj = null;
  countries.forEach(function(country){
    if(selectedCountry === country.name) {
      countryObj = country;
    }
  })

  const ul = document.querySelector("#country-details");
  const liName = document.querySelector("#country-name");
  const liPopulation = document.querySelector("#country-population");
  const liCapital = document.querySelector("#country-capital");
  liName.textContent = countryObj.name;
  liPopulation.textContent = "Population: " + countryObj.population;
  liCapital.textContent = "Capital City: " + countryObj.capital;
  ul.appendChild(liName);
  ul.appendChild(liPopulation);
  ul.appendChild(liCapital);

  const jsonStringCountry = JSON.stringify(countryObj);
  localStorage.setItem('chosenCountry', jsonStringCountry);

}

window.addEventListener('load', app);
