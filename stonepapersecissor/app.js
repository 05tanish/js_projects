let userwin = 0;
let computerwin =0;

const choices = document.querySelectorAll(".choose");
const mssg = document.querySelector(".message")
const userScoreElement = document.querySelector("#userscore");
const computerScoreElement = document.querySelector("#computerscore");
const restartbtn = document.querySelector(".restart")
const exitbtn = document.querySelector(".exit")


choices.forEach((choose) => {
    choose.addEventListener("click",() => {
        const userchoice = choose.getAttribute("id");
        playgame(userchoice);
    })
});
const showwinner =(userwon)=>{
   if (userwon === true){
        console.log("you won");
       mssg.innerText = "🎉 You won!";
       mssg.style.backgroundColor = "green";
        userwin++;
        userScoreElement.innerText=userwin;
    }
    else{
        console.log("you loose");
         mssg.innerText = "😢 You lost!";
        mssg.style.backgroundColor = "red";
        computerwin++;
         computerScoreElement.innerText=computerwin;
    }
}

 const playgame=(userchoice) =>{
console.log("user chooise=",userchoice);
const comp = compchoice();
console.log("computer chooise=", comp);

if (userchoice === comp) {
    //draw
    draw();
}
else{
    let userwon= false;
    if(userchoice === "stone"){
        // computer will have scissor , paper 
        userwon = comp=== "paper"? false:true;
    }
    else if (userchoice === "paper"){
        // rock or scissor 
        userwon = comp === "scissor"? false : true;
    }
    else{
        //rock or paper 
        userwon = comp === "stone"?false:true ;
    }
    showwinner(userwon);
};
}


const compchoice = ()=>{
const chooicesforcomp =["stone","paper","scissor"];
const compchoice =Math.floor(Math.random()*3);
return chooicesforcomp[compchoice];
}


const draw =()=>{
     console.log("match is draw ");
     mssg.innerText = "🤝 Match Draw!";
      mssg.style.backgroundColor = "yellow";
}



const checkGameOver = () => {
  if (userwin === 5) {
    mssg.innerText = "🏆 You WON the game!";
    mssg.style.backgroundColor = "limegreen";
    gameOver = true;
  } else if (computerwin === 5) {
    mssg.innerText = "💀 You LOST the game!";
    mssg.style.backgroundColor = "crimson";
    gameOver = true;
  }
};

// ✅ Restart Button
function resetGame() {
  userwin = 0;
  computerwin = 0;
  gameOver = false;

  userScoreElement.innerText = 0;
  computerScoreElement.innerText = 0;

  mssg.innerText = "Play your move!";
  mssg.style.backgroundColor = "#f5d07f";
}

// ✅ Exit Button
function exitGame() {
  gameOver = true;
  mssg.innerText = "🚪 You exited the game.";
  mssg.style.backgroundColor = "#333";
}