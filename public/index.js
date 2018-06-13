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
  // populateList(countries);
  populateSelectionList(countries);
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
    if (country.population > 54400) {
      const li = document.createElement("li");
      li.textContent = country.name + "    -     " + country.capital + "    -    " + country.population;
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

window.addEventListener('load', app);
