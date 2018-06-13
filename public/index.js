const app = function(){
  const url = "http://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);

  const dropdown = document.querySelector("#country");
  dropdown.addEventListener('change', displayCountry);

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
  // makeButton(countries);
}

const populateSelectionList = function(countries) {
  const selectField = document.getElementById("country");
  countries.forEach(function(country) {
    const option = document.createElement("option");
    option.textContent = country.name;
    selectField.appendChild(option);
  })

}

// const populateList = function(countries) {
//   const ul = document.querySelector("#country-list");
//   countries.forEach(function(country) {
//     if (country.population > 50000) {
//       const li = document.createElement("li");
//       li.textContent = country.name + "    -     " + country.capital + "    -    " + country.population;
//       ul.appendChild(li);
//     }
//   })
// }

// const makeButton = function(countries) {
//   const button = document.getElementById("list-all-button");
//   button.addEventListener("click", function() {
//     populateList(countries);
//   });
// }

const displayCountry = function() {
  console.log('in displayCountry()');
  const selectedCountry = document.querySelector('#country').value;
  stringifiedSelectedCountry = JSON.stringify(selectedCountry);
  const ul = document.querySelector("#country-details");
  const liName = document.querySelector("#country-name");
  liName.textContent = stringifiedSelectedCountry.name;
  console.log(stringifiedSelectedCountry);
}

window.addEventListener('load', app);
