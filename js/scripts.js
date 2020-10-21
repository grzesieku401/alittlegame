var gamecontainer = document.querySelector(".game-container"),
    gamecells = document.querySelectorAll(".cell"),
    maintimer = window.setInterval(tick,1),
    buttonstart = document.querySelector(".start"),
    buttonstop = document.querySelector(".stop"),
    counter = 0,
    construct,
    previousconstruct,
    posincontainer,
    shape,
    gamestarted = false,
    firstoccurrance = true,
    changespeed = 0;
    currentSpeed = 0;

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
        
        if (counter%(100-currentSpeed) == 0) {
            changespeed++;
            if (changespeed%100 === 0  && currentSpeed<900) {
                currentSpeed+=40;
            }


            if (firstoccurrance) {
                firstoccurrance = false;
            }else{         

                for (let i = 0; i < 4; i++) {
                    previousconstruct[i] = construct[i];                   
                }
               
                moveShape();
                
                if(detectCollision()){                   
                    console.log("kolizja");    
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

    currentSpeed = 0;
    changespeed = 0;
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

    posincontainer = 4;
    shape = getRandom(3, 1);
    
    
    if (shape === 1){      
        construct = [3,4,13,14];
        previousconstruct = [3,4,13,14];
    }else if(shape === 2){
        construct = [3,4,5,6];
        previousconstruct = [3,4,5,6];
    }else if(shape === 3){
        construct = [5,13,14,15];
        previousconstruct =[5,13,14,15];
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
    var counter = 0;
    previousconstruct.forEach(function(elem){
        gamecells[elem].removeAttribute("style");
        counter++;
        //console.log(counter);
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
        }
        //gamecells[elem].style.border = "solid 1px gray";
        console.log(gamecells[elem].style.length);
        if(gamecells[elem].hasAttribute("style") && gamecells[elem].style.length===0){
            gamecells[elem].removeAttribute("style");
        }
        //gamecells[elem+1].style.transition = ".2s";
    });

}

function pressAKey(event) {
    event.preventDefault();
    
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
            console.log("kolizja");       
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

    }
}

function canGo(side) {

    var left = 0,
        right = 0;

    construct.forEach(function(elem) {
    
        if(elem%10 === 0){
            console.log("NIe moge w lewo")
            left++;
        }else if(elem.toString().substr(elem.toString().length -1, elem.toString().length)%9 === 0){
            console.log("NIe moge w prawo")
            right++;
        }else if(gamecells[elem-1].getAttribute("docked")=="true"){
            console.log("NIe moge w lewo")
            left++;  
        }else if(gamecells[elem+1].getAttribute("docked")=="true"){
            console.log("NIe moge w prawo")
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
    var toadd = 0;
        line = 0;
    for (let i = 0; i < 18; i++) {
        for (let j = 0; j < 10; j++) {
            if (gamecells[j+toadd].getAttribute("docked")==="true") {
                line++;               
            }
        }
        // console.log("line "+line);
        if (line === 10) {
            console.log("dziesiec")
            rebuildTo(toadd+10);
        }
        line = 0;
        toadd+=10;
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
                        
    }
    if (detectCollision()) {
        for (let i = 0; i < previousconstruct.length; i++) {
            construct[i]=previousconstruct[i];
        }
    }
}

buttonstart.addEventListener("click",startGame,false);
buttonstop.addEventListener("click",pauseGame,false);
window.addEventListener("keydown",pressAKey,false);
