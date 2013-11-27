window.onload = init;

function init(){
    var btn0 = document.getElementById("add_sticky");
    btn0.onclick = makeSticky; //defined below
    
    var btn1 = document.getElementById("remove_sticky");
    btn1.onclick = removeSticky; //defined below
    
    var stickiesArray = getStickiesArray();
    
    for (var i=0; i < stickiesArray.length; i++){
        //no longer iterating through localStorage ---good idea
        var key = stickiesArray[i];
        var value = stickiesArray[key];
        addStickyToPage(value);
    }
}

//define getStickiesArray function

function getStickiesArray(){
    var stickiesArray = localStorage.getItem["stickiesArray"];
    
    //check if it exists
    if (!stickiesArray){
        //create one below if not
        stickiesArray = []
        
        //now store the array
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    }
    else{
        stickiesArray = JSON.parse(stickiesArray);
    }
    return stickiesArray;
}

//define makeSticky function
function makeSticky(){
    var stickiesArray = getStickiesArray();
    var currentDate = new Date();
    var key = "sticky_" + currentDate.getTime();
    var value = document.getElementById("sticky_content").value;
    
    localStorage.setItem(key, value);
    stickiesArray.push(key);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    
    addStickyToPage(value);
}

//define addStickyToPage function
function addStickyToPage(value){
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
}

//define removeStickyFromPage function
function removeSticky(){
    var stickiesArray = getStickiesArray();
    if(stickiesArray.length > 0){
    alert("Removing Sticky");
        stickiesArray.pop();
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    }
    
    var stickies = document.getElementById("stickies");
    var rValue = document.getElementById("stickies").lastChild;
    document.getElementById("stickies").removeChild(rValue);
}