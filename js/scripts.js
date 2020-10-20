var gamecontainer = document.querySelector(".game-container"),
    gamecells = document.querySelectorAll(".cell"),
    maintimer = window.setInterval(tick,100),
    buttonstart = document.querySelector(".start"),
    buttonstop = document.querySelector(".stop"),
    counter = 0,
    construct,
    previousconstruct,
    posincontainer,
    shape,
    gamestarted = false,
    firstoccurrance = true;


function tick() {
    counter++;

    if(gamestarted){
        if (counter%2 == 0) {
            if (firstoccurrance) {
                firstoccurrance = false;
            }else{         

                for (let i = 0; i < 4; i++) {
                    previousconstruct[i] = construct[i];                   
                }

                removePreviousConstruct();
                moveShape();
                
                if(detectCollision()){
                    console.log("kolizja");    
                    console.log(previousconstruct);          
                    dockShape();
                    construct = null;
                    previousconstruct = null;
                    firstoccurrance = true;
                    createConstruct();
                }
            }
            showInGamecontainer(); 
        }     
    }
}

function detectCollision() {
    var iscollision = false;

    construct.forEach(function(elem) {
        if(elem >180){
            iscollision = true;
        }else if(gamecells[elem+1].getAttribute("docked")==="true"){
            iscollision = true;
        }
        
    });    
    return iscollision;
}

function getRandom(min, max) {
    return Math.round(Math.random()*(max - min) + min);
}

function startGame() {

    firstoccurrance = true;
    gamestarted = true;
    createConstruct();
}

function pauseGame() {

    gamestarted = false;
}

function createConstruct() {

    posincontainer = 4;
    //shape = getRandom(7, 1);
    shape = 1;
    
    if (shape === 1){
        
        construct = [3,4,13,14];
        previousconstruct = [3,4,13,14];
    }

}

function dockShape() {
    previousconstruct.forEach(function(elem){
        gamecells[elem+1].style.background = "red";       
        gamecells[elem+1].setAttribute("docked", "true");
    });    
}

function moveShape() {

    if (shape === 1) {
        for (let i = 0; i < construct.length; i++) {
            construct[i]+=10;
        }
    }
}


function removePreviousConstruct() {

    previousconstruct.forEach(function(elem){
        gamecells[elem+1].removeAttribute("style");
    });

}

function showInGamecontainer() {

    construct.forEach(function(elem) {
        gamecells[elem+1].style.background = "red";
    });

}

buttonstart.addEventListener("click",startGame,false);
buttonstop.addEventListener("click",pauseGame,false);
