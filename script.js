var character = document.querySelector("#character");
var box = document.querySelector("#box");
var hole = document.querySelector("#hole");
var scoreNode = document.querySelector("#score");
var stopGravity = false;
var score = 0;
var speed = 1.8;
var gameStarted = false;
scoreNode.innerText = score;

//decreases the character's height (gravity)
function gravity(){
    var acceleration = 0;
    var gravityInterval = setInterval(() => {
        let top = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if(top < 970 && !stopGravity){            
            let newTop = top + acceleration;
            character.style.top = newTop + "px";
            //makes the character fall quicker as time passes
            acceleration += 0.17;
        }else{
            clearInterval(gravityInterval);
        }
    }, 10);
};

//increases the character's height (flaps wings)
function fly(){
    let count = 0;
    let newTop = top - 10;
    character.style.top = newTop + "px";
    var flyInterval = setInterval(() => {
        //if the count is less than or equal to 20 increase character's height and end gravity
        if(count <= 20){
            //stops gravity while charcter is flying
            stopGravity = true;
            let top = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            character.style.top = top - 4 + "px";
            count += 1;
        //if the count if greater than 20 end the fly interval and allow gravity
        }else{
            clearInterval(flyInterval);
            stopGravity = false;
            gravity();
        }
    }, 10)
};

//stops the game if the character hits the ceiling, ground, or a box
function hitDetection(){   
    setInterval(() => {
        let boxLeft = parseInt(window.getComputedStyle(box).getPropertyValue("left"));
        let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        //stop game if character hits a box
        if((boxLeft > 20 && boxLeft < 100) && ((characterTop - holeTop) <= -10 || (characterTop - holeTop) >= 240)){
            stopGame();
        }
        //stop game if character hits the ceiling or the ground
        if(characterTop > 970 || characterTop < 0){
            stopGame();
        };
    }, 10);
};

//sets a new box hole after each iteration of the box animation
box.addEventListener("animationiteration", () => {
    let newTop = getRandomInt(0, 740);
    hole.style.top = newTop + "px";
    score += 1;
    scoreNode.innerText = score;
});

//returns a random number used for the hole
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

//starts a game
function startGame(){
    hitDetection();
    gravity();
    box.style.animation = "box " + speed + "s infinite linear";
};

//ends a game
function stopGame(){
    character.style.top = "340px";
    gameStarted = false;
    stopGravity = true;
    box.style.removeProperty("animation");
    score = 0;
    scoreNode.innerText = score;
}; 

//listens for a mouse click
//calls startGame if it is the first mouse click, else calls fly
document.addEventListener("click", () => {
    if(!gameStarted){
        gameStarted = true;
        startGame();
        fly();
    }else{
        fly();
    };
});






