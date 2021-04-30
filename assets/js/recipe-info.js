//(Have to figure out how to be able to change URLS) according to parameters

var ingredients = document.getElementById("ingredients");
var ingredientsList = document.getElementById("listIngredients");
//made these variables global 
var cookInstructions = document.getElementById("cookInstructions");
var instructions = document.getElementById("instructions");

//Created a function that wraps the fetch request so that it runs when we click the search button
function runAPI(event) {
  event.preventDefault();
  console.log("hello")

var searchTerm=document.querySelector(".searchInputBox").value //created this element to grab the users search
var requestUrl= "https://api.spoonacular.com/recipes/complexSearch?apiKey=7f9a10e4af7f41bbbf1b637f9bf11892&addRecipeInformation=true&query="+searchTerm
// fetch(requestUrl)

// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   // var data=res.result
//   console.log(data)
//   for (var i = 0; i < data.results.length; i++) {
//     var ingredientsList = document.createElement('li');
//     ingredientsList.textContent = data.results[i].sourceUrl;
//     ingredients.appendChild(ingredientsList);//Changed list item to ingredients list to append. and list item doesnt exist
//   }
// });

//////////////


fetch(requestUrl)

.then(function (response) {
  return response.json();
})
.then(function (data) {
  // var data=res.result
  console.log(data)
  for (var i = 0; i < data.results.length; i++) {
    var instructions = document.createElement('li');
    var id=data.results[i].id
    var dataObj = data.results[i]
    instructions.addEventListener("click", function(event){
      //getRecipeInfo(id)
      getRecipeInfo(dataObj)
    })
    instructions.textContent = data.results[i].title;
    cookInstructions.appendChild(instructions);// changed to instuctions to append
  }
});
//youtube api
// var youTubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q="+searchTerm+"_recipe"+"&key=AIzaSyBwL0yd91L36FMNSfLFcw6VeqIN2PpoYbQ"
// var iframe= document.getElementById("iframe")

// var apiKey ="AIzaSyBwL0yd91L36FMNSfLFcw6VeqIN2PpoYbQ"

// fetch(youTubeURL)
// .then(function (response) {
//   return response.json();
// }).then(function(data){
//   console.log(data)
//   iframe.setAttribute("src","https://www.youtube.com/embed/"+data.items[0].id.videoId)
//   // const getSearchTerm = () => searchTerms[Math.floor(Math.random() * (searchTerms.length-1))];
// })

}

document.getElementById("searchBtn").onclick=runAPI








function getRecipeInfo(data) {
  // var recipeUrl= "https://api.spoonacular.com/recipes/complexSearch?apiKey=8cfcf83c0b1f43e0967daa90da468529&addRecipeInformation=true&query="+searchTerm

  // fetch(recipeUrl)
  // .then(function (response) {
  //   return response.json();
  // })
  // .then(function (data) {
  //   console.log(data)
  //   for (var i = 0; i < data.results.length; i++) {
  //     var recipe= document.createElement('li');
  //     recipe.textContent = data.results[i].sourceUrl;
  //     recipe.appendChild(recipe);//Changed list item to ingredients list to append. and list item doesnt exist
  //   }
  // });
console.log(data);
localStorage.setItem("currentRecipe", JSON.stringify(data));
window.location.replace("./test.html")

}






function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split('&');
  
 

  // Get the query and format values
  var id = searchParamsArr[0].split('=').pop();
  console.log(id)
  //var format = searchParamsArr[1].split('=').pop();
  //console.log(query);
  
  
  var apiKEy= `https://api.spoonacular.com/recipes/${id}/information?apiKey=7f9a10e4af7f41bbbf1b637f9bf11892`
  

  //searchApi(query, format);
}
getParams();










//button local storage
var save = document.getElementById("saveBtn"); //selects button
save.onclick = saveData //on click button saves data

function saveData(){
  localStorage.setItem("server", input.value);
  var storedValue = localStorage.getItem("server");
}
