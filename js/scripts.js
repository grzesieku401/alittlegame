var gamecontainer = document.querySelector(".game-container"),
    gamecells,
    maintimer,
    buttonstart = document.querySelector(".start"),
    buttonstop = document.querySelector(".stop"),
    score = document.querySelector(".score"),
    counter = 0,
    construct,
    previousconstruct,
    shape,
    gamestarted = false,
    firstoccurrance = true,
    changespeed = 1;
    currentSpeed = 100;

function tick() {
    counter++;

    if(gamestarted){
        
        if (isLost()){
            pauseGame() ;
            console.log("Przegrales");
            gamestarted = false;
            construct = null;
            previousconstruct = null;
        }
        
        if (counter%(currentSpeed) === 0) {
            //score.textContent= parseInt(score.textContent)+300;     



            if (firstoccurrance) {
                firstoccurrance = false;
            }else{         

                for (let i = 0; i < 4; i++) {
                    previousconstruct[i] = construct[i];                   
                }
               
                moveShape();
                
                if(detectCollision()){                   
                    //console.log("kolizja");    
                    dockShape();
                    checkLine();
                    construct = null;
                    previousconstruct = null;
                    firstoccurrance = true;
                    createConstruct();
                }else{
                    removePreviousConstruct();
                }
            }
            showInGamecontainer(); 
        }     
    }
}
function isLost() {
    for (let i = 0; i < 11; i++) {
        if(gamecells[i].getAttribute("docked")==="true"){
            return true;
        }
    }
    return false;
}

function detectCollision() {
    var iscollision = false;

    construct.forEach(function(elem) {
        if(elem >=180){
            iscollision = true;
        }else if(gamecells[elem].getAttribute("docked")==="true"){
            iscollision = true;
        }
        
    });    
    return iscollision;
}

function getRandom(min, max) {
    return Math.round(Math.random()*(max - min) + min);
}

function startGame() {
    gamecells.forEach(function (elem) {
        elem.removeAttribute("style");
        elem.setAttribute("docked","false");
    })

    currentSpeed = 1500;
    changespeed = 1;
    score.textContent = 0;
    firstoccurrance = true;
    gamestarted = true;
    createConstruct();
}

function pauseGame() {
    if (gamestarted) {
        gamestarted = false;   
    }else{
        gamestarted = true;
    }
    
}

function createConstruct() {

    shape = getRandom(7, 1);
    
    if (shape === 1){      
        construct = [3,4,13,14];
        previousconstruct = [3,4,13,14];
    }else if(shape === 2){
        construct = [3,4,5,6];
        previousconstruct = [3,4,5,6];
    }else if(shape === 3){
        construct = [13,14,15,5];
        previousconstruct = [13,14,15,5];
    }else if(shape === 4){
        construct = [15,14,13,3];
        previousconstruct =  [15,14,13,3];
    }if(shape === 5){
        construct = [14,15,5,6];
        previousconstruct =  [14,15,5,6];
    }if(shape === 6){
        construct = [15,14,3,4];
        previousconstruct = [15,14,3,4];
    }if(shape === 7){
        construct = [4,14,13,15];
        previousconstruct = [4,14,13,15];
    }

}

function dockShape() {
    previousconstruct.forEach(function(elem){
        if(shape === 1){
            gamecells[elem].style.background = "red";
        }else if (shape === 2) {
            gamecells[elem].style.background = "green"; 
        }else if (shape == 3){
            gamecells[elem].style.background = "blue";    
        }else if (shape == 4){
            gamecells[elem].style.background = "yellow";    
        }else if (shape == 5){
            gamecells[elem].style.background = "orange";    
        }else if (shape == 6){
            gamecells[elem].style.background = "#9C27B0";    
        }if (shape == 7){
            gamecells[elem].style.background = "#795548";    
        }
        //gamecells[elem].style.border = "solid 1px gray";
        gamecells[elem].setAttribute("docked", "true");
    });    
}

function moveShape() {
    for (let i = 0; i < construct.length; i++) {
        construct[i]+=10;
    }
}


function removePreviousConstruct() {
    previousconstruct.forEach(function(elem){
        gamecells[elem].removeAttribute("style");
    });
}

function showInGamecontainer() {

    construct.forEach(function(elem) {
        if(shape === 1){
            gamecells[elem].style.background = "red";
        }else if (shape === 2) {
            gamecells[elem].style.background = "green"; 
        } if (shape === 3) {
            gamecells[elem].style.background = "blue"; 
        }if (shape === 4) {
            gamecells[elem].style.background = "yellow"; 
        }else if (shape == 5){
            gamecells[elem].style.background = "orange";    
        }else if (shape == 6){
            gamecells[elem].style.background = "#9C27B0";    
        }if (shape == 7){
            gamecells[elem].style.background = "#795548";    
        }
        //gamecells[elem].style.border = "solid 1px gray";

        if(gamecells[elem].hasAttribute("style") && gamecells[elem].style.length===0){
            gamecells[elem].removeAttribute("style");
        }
        //gamecells[elem+1].style.transition = ".2s";
    });

}

function pressAKey(event) {

    event.preventDefault();
    console.log(event.key);
    
    if (gamestarted) {   
        
        for (let i = 0; i < 4; i++) {
             previousconstruct[i] = construct[i];                   
        }
        
        if (event.keyCode ===37)  {  //left
            if (canGo("left")){ 
                turnLeft();
            }      
        }else if(event.keyCode ===39){ //right
            if (canGo("right")) {
                turnRight();  
            }          
        }else if(event.keyCode ===40){ //down         
            turnDown();
        }else if(event.keyCode ===38){ //up
            transformShape();
        }

        if(detectCollision()){
            //console.log("kolizja");       
            dockShape();
            checkLine();
            construct = null;
            previousconstruct = null;
            firstoccurrance = true;
            createConstruct();
        }else{
            removePreviousConstruct();
            showInGamecontainer(); 
        }
        //console.log(counter + "Po");
    }
}

function canGo(side) {

    var left = 0,
        right = 0;

    construct.forEach(function(elem) {
    
        if(elem%10 === 0){
            //console.log("NIe moge w lewo")
            left++;
        }else if(elem.toString().substr(elem.toString().length -1, elem.toString().length)%9 === 0){
            //console.log("NIe moge w prawo")
            right++;
        }else if(gamecells[elem-1].getAttribute("docked")=="true"){
            //console.log("NIe moge w lewo")
            left++;  
        }else if(gamecells[elem+1].getAttribute("docked")=="true"){
            //console.log("NIe moge w prawo")
            right++;  
        }
    });

    if (side === "left" && left > 0) {
        return false;
    }else if(side === "right" && right > 0){
        return false;
    }

    return true;
}

function turnLeft() {
    for (let i = 0; i < construct.length; i++) {
        construct[i]--;         
    }
}

function turnRight() {
    for (let i = 0; i < construct.length; i++) {
        construct[i]++;         
    }           
}

function turnDown() {
    for (let i = 0; i < construct.length; i++) {
        construct[i]+=10;         
    }           
}

function checkLine(){
    var toadd = 0,
        line = 0,
        howmanylines = 0;
    for (let i = 0; i < 18; i++) {
        for (let j = 0; j < 10; j++) {
            if (gamecells[j+toadd].getAttribute("docked")==="true") {
                line++;               
            }
        }
        // console.log("line "+line);
        if (line === 10) {
            howmanylines++;
            //console.log("dziesiec")
            rebuildTo(toadd+10);
        }
        line = 0;
        toadd+=10;
    }
    if (howmanylines ===1) {
        score.textContent= parseInt(score.textContent)+40;   
    }else if (howmanylines ===2) {
        score.textContent= parseInt(score.textContent)+100;   
    }else if (howmanylines ===3) {
        score.textContent= parseInt(score.textContent)+180;   
    }else if (howmanylines ===4) {
        score.textContent= parseInt(score.textContent)+300;      
    }
    setCurrentSpeed();
}

function setCurrentSpeed(){
    if(parseInt(score.textContent) >= (100*changespeed + (currentSpeed*changespeed))){
        currentSpeed-=5;
        changespeed++;
    }    
}

function rebuildTo(stop) {
    for (let i = stop-1; i >=0; i--) {
        if (i<10) {
            gamecells[i].removeAttribute("style");
            gamecells[i].setAttribute("docked","false")
        }else{

            if (!gamecells[i-10].hasAttribute("style")) {                 
                gamecells[i].removeAttribute("style");
            }else{
                gamecells[i].style.background = gamecells[i-10].style.background; 
            }
            gamecells[i].setAttribute("docked",gamecells[i-10].getAttribute("docked"));    
        }
    }
}

function transformShape() {
    //jesli kwadrat
    //console.log(construct);
    if (shape === 1) {
    
    //jesli linia
    }else if (shape === 2) {
        //jesli poziomo
        if(construct[1]-construct[0]===1){
            if (construct[1]>10 && !gamecells[construct[1]+20].hasAttribute("style")) {
                construct[0] = construct[1] - 10;
                construct[2] = construct[1] + 10;
                construct[3] = construct[1] + 20;
            }
        //jesli pionowo    
        }else{
            if(construct[1]%10!==0){
                if ((construct[0]+2)%10!==0 && (construct[0]+1)%10!==0) {
                    construct[0] = construct[1] - 1;
                    construct[2] = construct[1] + 1;
                    construct[3] = construct[1] + 2;                    
                }
            }

        }               
    //jesli L w prawo                    
    }else if (shape === 3) {
        if((construct[1]-construct[0])===1){
            //console.log("tu1");
            construct[0] = construct[1]-10;
            construct[2] = construct[1]+10;
            construct[3] = construct[1]+11;
        }else if ((construct[0]-construct[1]) === (-10)) {
            //console.log("tu2");
            construct[0] = construct[1]+1;
            construct[2] = construct[1]-1;
            construct[3] = construct[1]+9;            
        }
        else if((construct[1]-construct[0]=== (-1))){ 
            //console.log("tu3");
            construct[0] = construct[1]+10;
            construct[2] = construct[1]-10;
            construct[3] = construct[1]-11;     
        }
        else if((construct[1]-construct[0]=== (-10))){
            if ((construct[0]+1)%10!==0) {
            //console.log("tu4");
                construct[0] = construct[1]-1;
                construct[2] = construct[1]+1;
                construct[3] = construct[1]-9;   
            }    
        }
    //jesli L w lewo   construct = [15,14,13,3]; 
    }else if (shape === 4) {
        if((construct[1]-construct[0])=== -1 ){
            //console.log("tu1");
            construct[0] = construct[1]+10;
            construct[2] = construct[1]-10;
            construct[3] = construct[1]-9;
        }else if ((construct[0]-construct[1]) === 10) {
            
            //console.log("tu2");
            if ((construct[0])%10!==0) {
                construct[0] = construct[1]-1;
                construct[2] = construct[1]+1;
                construct[3] = construct[1]+11;      
            }
        }
        else if((construct[1]-construct[0]=== 1)){ 
            //console.log("tu3");
            construct[0] = construct[1]-10;
            construct[2] = construct[1]+10;
            construct[3] = construct[1]+9;  
        }
        else if((construct[1]-construct[0]=== (10))){
            //console.log("tu4");
            if ((construct[0]+1)%10!==0) {
                construct[0] = construct[1]+1;
                construct[2] = construct[1]-1;
                construct[3] = construct[1]-11;   
            }         
        }
    //jesli Z w prawo   
    }else if (shape === 5) {
        if((construct[1]-construct[0])=== 1 ){
            construct[0] = construct[1]-10;
            construct[2] = construct[1]+1;
            construct[3] = construct[1]+11;  
        }else{
            if ((construct[0])%10!==0) {
                construct[0] = construct[1]-1;
                construct[2] = construct[1]-10;
                construct[3] = construct[1]-9;  
            }
        }

    }
    //jesli Z w lewo construct = [14,15,3,4];
    else if (shape === 6) {
        
        if((construct[1]-construct[0]) === -1 ){
            //console.log("tu1");
            construct[1]++;
            construct[0] = construct[1]-10;
            construct[2] = construct[1]-1;
            construct[3] = construct[1]+9;  
        }else{
            //console.log("tu2");
            if ((construct[1]-1)%10!==0) {
                construct[1]--;
                construct[0] = construct[1]+1;
                construct[2] = construct[1]-10;
                construct[3] = construct[1]-11;  
            }
        }
    //jesli niepelny krzyzyk   [4,14,13,15];
    }else if (shape === 7) {
        
        if((construct[1]-construct[0]) === 10 ){
            //console.log("tu1");
            construct[0] = construct[1]+1;
            construct[2] = construct[1]-10;
            construct[3] = construct[1]+10;  
        }
        else if ((construct[1]-construct[0]) === -1)  {
            if ((construct[1])%10!==0) {
                construct[0] = construct[1]+10;
                construct[2] = construct[1]+1;
                construct[3] = construct[1]-1;     
            }     
        }
        else if ((construct[1]-construct[0]) === -10)  {
            construct[0] = construct[1]-1;
            construct[2] = construct[1]+10;
            construct[3] = construct[1]-10;      
        }
        else if ((construct[1]-construct[0]) === 1)  {
            if ((construct[1]+1)%10!==0) {
                construct[0] = construct[1]-10;
                construct[2] = construct[1]-1;
                construct[3] = construct[1]+1;   
            }       
        }

    }

    //detekcja kolizji
    if (detectCollision()) {
        for (let i = 0; i < previousconstruct.length; i++) {
            construct[i]=previousconstruct[i];
        }
    }
}

function createBlocks() {
    
    var df = document.createDocumentFragment();

    for (let i = 0; i < 180; i++) {
        var newCell = document.createElement("div");
        newCell.setAttribute("docked","false");
        newCell.classList.add("cell");
        df.appendChild(newCell);
    }
    gamecontainer.appendChild(df);
    gamecells= document.querySelectorAll(".cell")
  
}

createBlocks();
maintimer = window.setInterval(tick,5);
buttonstart.addEventListener("click",startGame,false);
buttonstop.addEventListener("click",pauseGame,false);
//window.addEventListener("keydown",pressAKey,false);
window.addEventListener("keypress",pressAKey,false);
