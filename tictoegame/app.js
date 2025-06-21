
let boxes = document.querySelectorAll(".box");
let vq = document.querySelector(".reset")
let  newgame= document.querySelector(".newgame")
let messagecontainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")
 
let turn = false;
const winpattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box clicked");
  if(turn === false){
    box.innerHTML= "o";
    turn =true;
  }
  else{
    box.innerHTML ="x"
    turn = false;
    
  }
box.disabled = true;
checkwinner();
  })
})

const resetgame =()=>{
  turn=true;
  enables();
  messagecontainer.classList.add("hide");
}
 const diables = ()=>{
   for(box of boxes){
    box.disabled = true;
   }
 }
 const enables = ()=>{
   for(box of boxes){
    box.disabled = false;
    box.innerText="";
   }
 }
const showwinner = (winner)=>{
msg.innerText= `congratualations ,winner is ${winner}`;
msg.classList.remove("hide");
diables()
}

const checkwinner = ()=>{

    for(let pattern of winpattern){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText
        let pos3val = boxes[pattern[2]].innerText;
if( pos1val !="" && pos2val !="" && pos3val !=""){
        if (pos1val===pos2val && pos2val === pos3val) {
            console.log("winner",pos1val);
            showwinner(pos1val)
            
        }}
    }

}

newgame.addEventListener("click",enables)
vq.addEventListener("click",resetgame)