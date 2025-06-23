let inputs = document.querySelector("#display");
let buttons = document.querySelectorAll('button');
let result="";
let arr = Array.from(buttons);
arr.forEach((buttons)=>{
    buttons.addEventListener("click",(e)=>{
        let value= e.target.innerHTML 
        if(value === "="){
             result=eval(result); // eval javascript inbuilt function
             inputs.value = result;
        }
        else if( value === "AC") {
            result=""
            inputs.value=result;

        }
        else if ( value === "del"){
            result = result.slice(0, -1); // removes last character
    inputs.value = result;
        }
        else if (value === ".") {
  // Split by operators to get the last number part
  let lastNumber = result.split(/[\+\-\*\/×÷]/).pop();

  // Allow only one dot in the current number
  if (!lastNumber.includes(".")) {
    result += value;
    inputs.value = result;
  }
}
        else{
            result += value;
            inputs.value= result;
        }
    })
})