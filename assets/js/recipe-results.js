function getParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchParamsArr = document.location.search.split('&');
  
    // Get the query and format values
    var query = searchParamsArr[0].split('=').pop();
    //var format = searchParamsArr[1].split('=').pop();
    //console.log(query);
    
    searchRecipesByName(query);
    //searchApi(query, format);
}
getParams();
 
var searchParamsArr = document.location.search.split('&');
var query = searchParamsArr[0].split('=').pop();

console.log(query);
var recipeSearchResultsListEl = $('#recipeResults');

function searchRecipesByName(name){
  //return a list of objects with name, id, and an image
  var url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=8cfcf83c0b1f43e0967daa90da468529&query=${name}`;
  fetch(url)
  .then(function(response){
      return response.json();
  })
  .then(function(data){
      //console.log(data);
      displayRecipeResults(data["results"]);
  })
}


function displayRecipeResults(results){
  //results is a list
  results.forEach(element=>{
      console.log(element);
      var resultEl = $('<div>');
      resultEl.attr('class','row teal lighten-2');

      
      var resultTitleEl =$('<div>');
      resultTitleEl.attr('class', 'col s6');
      resultTitleEl.html(`<h3>${element["title"]}</h3>`);

      var resultImgEl = $('<div>');
      resultImgEl.attr('class','col s6');
      resultImgEl.html(`<img class="resultImg" src=${element["image"]}>`);
      
      /*
      resultEl.html(`<div class="col s6"><h3>${element["title"]}</h3></div>
                  <div class="col s6 searchResult"><img src=${element["image"]}></div>`);
      */
      resultEl.append(resultTitleEl);
      resultEl.append(resultImgEl);

      
      resultEl.on("click",function(event){
          event.preventDefault();
          //recipeSearchResultsListEl.empty();

          console.log("id",element["id"]);
          //getRecipeInfo(element["id"]);
          var idString = `./recipe-information.html?id=${element["id"]}`;
          location.assign(idString);
      })
      
      recipeSearchResultsListEl.append(resultEl);
  })
}


var searchInput = $('input[name="searchInput"]');
var searchButtonEl = $("#searchButton"); 
searchButtonEl.on('click',function(event){
    event.preventDefault();
    var recipe= searchInput.val();
    //console.log(recipe);
    if (!recipe) {
        console.error('You need a search input value!');
        return;
      }
    
    var queryString = './recipe-result.html?q=' + recipe;

    location.assign(queryString);

    //searchRecipesByName(recipe);
})



var videoResultEl = $("#videoResult");
var youTubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q="+query+"_recipe"+"&key=AIzaSyBwL0yd91L36FMNSfLFcw6VeqIN2PpoYbQ"
var iframe= document.getElementById("iframe")

var apiKey ="AIzaSyBwL0yd91L36FMNSfLFcw6VeqIN2PpoYbQ"

fetch(youTubeURL)
.then(function (response) {
  return response.json();
}).then(function(data){
  console.log(data)
  iframe.setAttribute("src","https://www.youtube.com/embed/"+data.items[0].id.videoId)
})