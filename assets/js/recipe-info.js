//(Have to figure out how to be able to change URLS) according to parameters

var ingredients = document.getElementById("ingredients");
var ingredientsList = document.getElementById("listIngredients");

fetch(requestUrl)

.then(function (response) {
  return response.json();
})
.then(function (data) {
  for (var i = 0; i < data.length; i++) {
    var ingredientsList = document.createElement('li');
    ingredientsList.textContent = data[i];
    ingredients.appendChild(listItem);
  }
});

////////////////////
var cookInstructions = document.getElementById("cookInstructions");
var instructions = document.getElementById("instructions");

fetch(requestUrl)

.then(function (response) {
  return response.json();
})
.then(function (data) {
  for (var i = 0; i < data.length; i++) {
    var instructions = document.createElement('li');
    instructions.textContent = data[i];
    cookInstructions.appendChild(listItem);
  }
});
//youtube api
var requestURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q={search term}&key=AIzaSyBwL0yd91L36FMNSfLFcw6VeqIN2PpoYbQ"
var iframe= document.getElementById("iframe")

var apiKey ="AIzaSyBwL0yd91L36FMNSfLFcw6VeqIN2PpoYbQ"

fetch(requestURL)
.then(function (response) {
  return response.json();
});
const getSearchTerm = () => searchTerms[Math.floor(Math.random() * (searchTerms.length-1))];
































//button local storage
var save = document.getElementById("saveBtn"); //selects button
save.onclick = saveData //on click button saves data

function saveData(){
  localStorage.setItem("server", input.value);
  var storedValue = localStorage.getItem("server");
}
