document.addEventListener("DOMContentLoaded", function(event) { 
  
  let buttonData = {
    blue: document.getElementById("3"),
    green: document.getElementById("0"),
    yellow: document.getElementById("2"),
    red: document.getElementById("1"),
    blueSound: new Audio("https://res.cloudinary.com/kurt-johnson/video/upload/v1491432845/simon1_ppd3st.mp3"),
    greenSound: new Audio("https://res.cloudinary.com/kurt-johnson/video/upload/v1491432845/simon2_gzcr2p.mp3"),
    yellowSound: new Audio("https://res.cloudinary.com/kurt-johnson/video/upload/v1491432845/simon3_pokitr.mp3"),
    redSound: new Audio("https://res.cloudinary.com/kurt-johnson/video/upload/v1491432845/simon4_zqumyi.mp3")
  }
  
  let gameData = {
    started: 0,
    strict: 0,
    step: 0,
    totalStep: 0,
    moveSequence: [],
    playerSequence: [],
    startButton: document.getElementById("start"),
    strictButton: document.getElementById("strict"),
    counter: document.getElementById("counter"),
    counterLabel: document.getElementById("counterTitle"),
    
    moveList: [buttonData.green, buttonData.red, buttonData.yellow, buttonData.blue],
    
    soundList: [buttonData.greenSound, buttonData.redSound, buttonData.yellowSound, buttonData.blueSound],
    
    errorSound: new Audio("https://res.cloudinary.com/kurt-johnson/video/upload/v1491432844/simon_buzz_ufziqo.mp3"),
    
    randomMove: function (min,max){
      return Math.floor(Math.random()*(max-min+1)+min);
     },
    addRandomMove: function(){
      this.moveSequence.push(this.randomMove(0,3).toString());
    }
    
  }
  
  let buttonFunctions = {
    delayedSound: function (i){
           setTimeout(function(){
            gameData.soundList[Number(gameData.moveSequence[i])].play();
            gameData.moveList[Number(gameData.moveSequence[i])].style.opacity = "0.6";
           }, 1500);
   
            setTimeout(function(){
              gameData.soundList[Number(gameData.moveSequence[i])].pause();
              gameData.soundList[Number(gameData.moveSequence[i])].currentTime = 0;
              gameData.moveList[Number(gameData.moveSequence[i])].style.opacity = "1.0";
            }, 2000) 
           },
  
   cycleThroughMoves: function (){
       gameData.moveSequence.forEach(function(obj, i){
         setTimeout(function(){
           buttonFunctions.delayedSound(i);
         }, (1000*i)+1000)
        })
       }, 
    
    updateStepsCount: function(){
        gameData.totalStep++;
            if (gameData.totalStep >= 21){
              gameData.counter.style.color = "#64DD17"
              gameData.counterLabel.innerHTML = "You Win!"
              gameData.moveList.forEach(function(button){
               button.disabled = true;
             })
        } else {
           gameData.counter.innerHTML = gameData.totalStep;
        }
    }
    
  }


  //mouse down/up events for each colored button
  gameData.moveList.forEach(function(buttonElem, i){
      buttonElem.onmousedown = function(){gameData.soundList[i].play(); 
                                        buttonElem.style.opacity = "0.8";
                                         };
      buttonElem.onmouseup = function(){gameData.soundList[i].pause();
                                       gameData.soundList[i].currentTime = 0;
                                      buttonElem.style.opacity = "1.0";
                                        if(gameData.started === 1){
                                           if (buttonElem.id === gameData.moveSequence[gameData.step]){
                                           gameData.playerSequence.push(buttonElem.id);
                                           gameData.step++;
                                              if(gameData.step === gameData.moveSequence.length && gameData.totalStep < 20){
                                               gameData.addRandomMove();
                                               buttonFunctions.cycleThroughMoves();
                                               gameData.playerSequence = [];
                                               gameData.step = 0;
                                               buttonFunctions.updateStepsCount();
                                            } else if (gameData.step === gameData.moveSequence.length && gameData.totalStep >= 20){
                                              buttonFunctions.updateStepsCount();
                                            }
                                          } else {
                                            gameData.errorSound.play();
                                            gameData.playerSequence = [];
                                            gameData.step = 0;
                                            if (gameData.strict === 1){
                                                gameData.step = 0;
                                                gameData.totalStep = 0;
                                                gameData.counter.innerHTML = gameData.totalStep;
                                                gameData.moveSequence = [];
                                                gameData.playerSequence = [];
                                                gameData.addRandomMove();
                                                buttonFunctions.cycleThroughMoves();
                                                buttonFunctions.updateStepsCount();
                                            }
                                            buttonFunctions.cycleThroughMoves();
                                          }
                                        }
                                       };
  })
  
 gameData.startButton.onclick = function(){
   if (gameData.started === 0){
     gameData.started = 1;
     buttonFunctions.updateStepsCount();
     gameData.startButton.innerHTML = "Stop";
     gameData.startButton.style.backgroundColor = "#AED581"
     gameData.addRandomMove();
     buttonFunctions.cycleThroughMoves();
   } else {
     gameData.started = 0;
     gameData.step = 0;
     gameData.totalStep = 0;
     gameData.counter.innerHTML = gameData.totalStep;
     gameData.counter.style.removeProperty("color");
     gameData.moveSequence = [];
     gameData.playerSequence = [];
     gameData.startButton.innerHTML = "Start";
     gameData.counterLabel.innerHTML = "Moves:"
     gameData.startButton.style.removeProperty("background-color");
     gameData.moveList.forEach(function(button){
     button.disabled = false;
     })
   }
 }
 
 gameData.strictButton.onclick = function(){
   if (gameData.strict===0){
     gameData.strict = 1;
     gameData.strictButton.style.backgroundColor = "#FFEE58"
   } else {
     gameData.strict = 0;
     gameData.strictButton.style.removeProperty("background-color");
   }
 }
 
});