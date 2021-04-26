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
