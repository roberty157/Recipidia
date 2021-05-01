function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");

    
    event.target.appendChild(document.getElementById(data));
}

recipeListEl = document.querySelector("#recipeList");
recipeListEl.addEventListener("drop", function(event){
    drop(event);
})
recipeListEl.addEventListener("dragover", function(event){
    allowDrop(event);
})


var boxes = document.getElementsByClassName("box");
var boxArray = Array.from(boxes);
boxArray.forEach(element=>{
    element.addEventListener("drop",function(event){
        drop(event);
    })
    element.addEventListener("dragover", function(event){
        allowDrop(event);
    })

})


var recipeListTemplate = [
    {"name":"Pasta With Tuna", "id": 654959},
    {"name":"Rice Pilaf", "id": 658277},
    ]
var recipeList =JSON.parse(localStorage.getItem("recipeList"));
if(recipeList === null){
    localStorage.setItem("recipeList", JSON.stringify(recipeListTemplate));
    recipeList = recipeListTemplate;
}
function displayRecipes(recipeList){
    recipeListEl.innerHTML='';
    //go through the recipe list, add each recipe as a list item
    recipeList.forEach(element=>{
        var recipeItem = document.createElement("li");
        
        recipeItem.setAttribute("class", "collection-item");
        recipeItem.setAttribute("draggable", "true");
        recipeItem.textContent = element["name"];

        //var text = element["name"];
        var id = element["id"];
        recipeItem.setAttribute("id", id)

        recipeItem.addEventListener("dragstart",function(event){
            //console.log("drag start");
            drag(event);
        });
        recipeItem.addEventListener("click", function(event){
            event.preventDefault();
            console.log("id",id);        
            getRecipeInfo(id);
        });
        recipeListEl.appendChild(recipeItem);
    })
}
displayRecipes(recipeList);


var saveButton = document.querySelector("#saveButton");
saveButton.addEventListener("click", function(event){
    event.preventDefault();
    saveSchedule();
    saveRecipeList();
})
//make a save button so it saves the current schedule
//it also saves the current recipe list leftover
//looks at current html and saves those list items
function saveSchedule(){
    //go through the entire schedule and save it

    var newSchedule = scheduleTemplate;
    boxArray.forEach(element=>{
        var recipes = element.children;
        for(var i=0;i<recipes.length;i++){
            var id = recipes[i].id;
            var title = recipes[i].textContent;
            var scheduleItem = {id:id, title:title};
            var time = element.previousElementSibling.textContent;
            //console.log("id", id);
            //console.log("title", title);
            //console.log("time",time);
            var pos = schedule.map(function(e) { return e.id; }).indexOf(time);
    
        
    
            newSchedule[pos].recipes.push(scheduleItem);

        }
    })
    console.log(newSchedule);
    localStorage.setItem("schedule", JSON.stringify(newSchedule));
}

function saveRecipeList(){
    var recipes = recipeListEl.children;
    var newRecipeList = [];
    for(var i = 0;i<recipes.length;i++){
        var recipeItem = {"name":recipes[i].textContent, "id": recipes[i].id};
        newRecipeList.push(recipeItem);
    }
    console.log(newRecipeList);
    localStorage.setItem("recipeList", JSON.stringify(newRecipeList));
}







var scheduleTemplate = 
[   
{"time": 6, "id":"6am", "recipes": []},
{"time": 7, "id":"7am", "recipes": []},
{"time": 8, "id":"8am","recipes": []},
{"time": 9, "id":"9am","recipes": []},
{"time": 10, "id":"10am","recipes": []},
{"time": 11, "id":"11am","recipes": []},
{"time": 12, "id":"12am","recipes": []},
{"time": 13, "id":"1pm","recipes": []},
{"time": 14, "id":"2pm","recipes": []},
{"time": 15, "id":"3pm","recipes": []},
{"time": 16, "id":"4pm","recipes": []},
{"time": 17, "id":"5pm","recipes": []},
{"time": 18, "id":"6pm","recipes": []},
{"time": 19, "id":"7pm","recipes": []},
{"time": 20, "id":"8pm","recipes": []},
{"time": 21, "id":"9pm","recipes": []},
{"time": 22, "id":"10pm","recipes": []},
{"time": 23, "id":"11pm","recipes": []},
{"time": 24, "id":"12pm","recipes": []},
]

var schedule = JSON.parse(localStorage.getItem("schedule"));
if(schedule === null){
    localStorage.setItem("schedule", JSON.stringify(scheduleTemplate));
    schedule = scheduleTemplate;
}




function fillBoxes(){
    boxArray.forEach(element=>{
        element.innerHTML='';
    })
    for(var i =0; i< boxArray.length;i++){
        //boxArray[i].innerHTMl='';
        //console.log(boxArray[i]);
        for(var j=0; j< schedule[i].recipes.length;j++){
            var recipeItem = document.createElement("li");

            //var title = schedule[i].recipes[j].title;
            recipeItem.innerText = schedule[i].recipes[j].title;


            recipeItem.setAttribute("class", "collection-item");
            
            let id = schedule[i].recipes[j].id;

            console.log("id",id);
            recipeItem.setAttribute("id",id);
            boxArray[i].appendChild(recipeItem);

            recipeItem.addEventListener("click", function(event){
                event.preventDefault();
                console.log("id",id);        
                getRecipeInfo(id);
            });
           

            recipeItem.setAttribute("draggable", "true");
            recipeItem.addEventListener("dragstart", function(event){
                //console.log('recipe item dragging');
                drag(event);
            });
                
          
            //getRecipeInfo(id);

        }
    }
}
fillBoxes();


function getRecipeInfo(id){
    var url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=8cfcf83c0b1f43e0967daa90da468529`;
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        //console.log(data);
        showRecipe(data);
    })
}

var recipeEl = document.querySelector("#showRecipe");
var recipeTitleEl = document.querySelector("#recipeTitle");
var recipeImgEl = document.querySelector("#recipePhoto");
var recipeInstructionEl = document.querySelector("#recipeInstruction");
//a link to the website
var moreButton = document.querySelector("#moreButton");
//<a class="waves-effect waves-light btn">More</a>
function showRecipe(data){  
    console.log("showRecipe", data["title"]);
    console.log(data);
    recipeTitleEl.textContent = "";
    
    recipeInstructionEl.textContent ="";
    
    recipeTitleEl.textContent = data["title"];
    recipeImgEl.setAttribute("src",data["image"]);
    recipeInstructionEl.innerHTML = data["instructions"];

    moreButton.innerHTML = `<a href=${data["spoonacularSourceUrl"]} class="waves-effect waves-light btn" target="_blank">More</a>`
    //var moreButton = document.createElement("a");
    //moreButton.setAttribute("class","waves-effect waves-light btn");
    //moreButton.textContent = 

    
}

var homeButton = document.querySelector("#homeButton");
homeButton.addEventListener("click",function(){
    console.log("home");
    location.assign("./index.html");
});

var dateEl = document.querySelector("#date");
dateEl.style.textAlign = "center";
dateEl.textContent = moment().format("dddd MMMM Do");