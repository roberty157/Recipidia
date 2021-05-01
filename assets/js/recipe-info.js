//(Have to figure out how to be able to change URLS) according to parameters

var ingredients = document.getElementById("ingredients");
var ingredientsList = document.getElementById("listIngredients");
//made these variables global 
var cookInstructions = document.getElementById("cookInstructions");
var instructions = document.getElementById("instructions");


//Created a function that wraps the fetch request so that it runs when we click the search button
/*
function runAPI(event) {
  event.preventDefault();
  console.log("hello")

var searchTerm=document.querySelector(".searchInputBox").value //created this element to grab the users search
var requestUrl= "https://api.spoonacular.com/recipes/complexSearch?apiKey=7f9a10e4af7f41bbbf1b637f9bf11892&addRecipeInformation=true&query="+searchTerm


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
}
*/


var searchBtnEl = $("#searchBtn");
searchBtnEl.on('click',function(event){
  event.preventDefault();
  var recipe= document.querySelector(".searchInputBox").value;
  //console.log(recipe);
  if (!recipe) {
      console.error('You need a search input value!');
      return;
    }
  
  var queryString = './recipe-results.html?q=' + recipe;

  location.assign(queryString);

  //searchRecipesByName(recipe);
});


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



//document.getElementById("searchBtn").onclick=runAPI








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
var imageResults = $('#imageResults');

var recipeList =JSON.parse(localStorage.getItem("recipeList"));
if(recipeList === null){
    localStorage.setItem("recipeList", JSON.stringify([]));
    recipeList = [];
}

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london$format=photo$name=joel`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  console.log(document.location.search)
  var searchParamsArr = document.location.search.split('&');
  
  // Get the query and format values
  console.log(searchParamsArr)
  var id = searchParamsArr[0].split('=').pop();
  //["?id","633144"]
  
  console.log(id)
  // var format = searchParamsArr[1].split('=').pop();
  // console.log(query);
  
  
  var apiKey= `https://api.spoonacular.com/recipes/${id}/information?apiKey=7f9a10e4af7f41bbbf1b637f9bf11892`
  fetch(apiKey)
  .then (function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data.image)
        /*
        var imageSource= data.image;
        var img = document.createElement('img');
        img.src = imageSource;
          // element.appendChild(imageSource);
        var srcEl = document.getElementById("recipe-image");
        srcEl.innerHTML='';
        srcEl.appendChild(img);  
        console.log(data);
        */


        var imageEl = document.querySelector("#recipe-image");
        imageEl.setAttribute("src",data.image);
        //var recipe= document.createElement("li");
        var displayRecipe = document.getElementById('cookInstructions')
        displayRecipe.innerHTML = data.instructions;
        //recipe.textContent = data.instructions;
        //displayRecipe.appendChild(recipe)
        
        //var title= document.createElement("h1");
        var recipeName = document.getElementById('title');
        recipeName.textContent = data.title;
        //recipeName.textContent = data.title;
        //recipeName.appendChild(title)

        var ingredientListEl = document.getElementById('listIngredients');
        for(var i=0;i<data.extendedIngredients.length;i++){
          var ingredient = document.createElement("li");
          ingredient.innerHTML = data.extendedIngredients[i].originalString;
          ingredientListEl.appendChild(ingredient);
        }

        //button local storage
        var save = document.getElementById("saveBtn"); //selects button
        save.onclick = saveData //on click button saves data
        function saveData(){
          //[{"name":"Rice Pilaf","id":"658277"}]
          var recipeItem = {"name":data["title"], "id":data["id"]};
          recipeList.push(recipeItem);
          localStorage.setItem("recipeList", JSON.stringify(recipeList));

          //go to schedule page
          location.assign("./schedule.html");
          //localStorage.setItem("server", input.value);
          //var storedValue = localStorage.getItem("server");
        }
        /*
        var liEl = document.createElement("li")
        liEl.textContent = data.extendedIngredients;
        var ulEl = document.getElementById('listIngredients');
        ulEl.appendChild(liEl);
        */
      });
  
 
 
}
getParams();

 //searchApi(query, format);





 //nav bar js
document.getElementById('chicken').addEventListener('click', function(event){
  event.preventDefault();
  var queryString = './recipe-results.html?q=chicken';
  location.assign(queryString);
});

document.getElementById('pork').addEventListener('click', function(event){
  event.preventDefault();
  var queryString = './recipe-results.html?q=pork';
  location.assign(queryString);
});

document.getElementById('beef').addEventListener('click', function(event){
  event.preventDefault();
  var queryString = './recipe-results.html?q=beef';
  location.assign(queryString);
});

document.getElementById('fish').addEventListener('click', function(event){
  event.preventDefault();
  var queryString = './recipe-results.html?q=fish';
  location.assign(queryString);
});

document.getElementById('tofu').addEventListener('click', function(event){
  event.preventDefault();
  var queryString = './recipe-results.html?q=tofu';
  location.assign(queryString);
});
