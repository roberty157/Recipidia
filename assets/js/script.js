//api key: 8cfcf83c0b1f43e0967daa90da468529

//search for recipe:
//returns a list of recipes
//this only returns id and image
//https://api.spoonacular.com/recipes/complexSearch?apiKey=8cfcf83c0b1f43e0967daa90da468529&query={name}

//get recipe information
//given idhttps://api.spoonacular.com/recipes/{recipe id}/information?apiKey=8cfcf83c0b1f43e0967daa90da468529
//



//youtube api key: AIzaSyBwL0yd91L36FMNSfLFcw6VeqIN2PpoYbQ
//for more info: https://developers.google.com/youtube/v3/docs/search/list

//get youtube videos
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q={search term}&key=AIzaSyBwL0yd91L36FMNSfLFcw6VeqIN2PpoYbQ

//to embed a youtube video
/*
<iframe width="420" height="345" src="https://www.youtube.com/embed/{video id}">
</iframe>
*/

/*
var searchTerm = document.getElementById("search-term");
var resultLinks = document.getElementById("sourcelink");

function runAPI(event) {
    event.preventDefault();
  console.log("hello")
  
  var searchTerm=document.querySelector(".searchInputBox").value //created this element to grab the users search
  var requestUrl= "https://api.spoonacular.com/recipes/findByIngredients?apiKey=8cfcf83c0b1f43e0967daa90da468529&ingredients=" + searchTerm
  
  fetch(requestUrl)
  
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // var data=res.result
    console.log(data)
    for (var i = 0; i < data.results; i++) {
      var resultLinks = document.createElement('li');
      resultLinks.textContent = data.results[i].sourceURL;
      searchTerm.appendChild(resultLinks);
    }
  })};

document.getElementById("searchBtn").onclick = runAPI;
*/


//----------------------
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
})