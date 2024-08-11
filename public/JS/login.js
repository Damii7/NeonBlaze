let userName = document.getElementById("username");
let div1 = document.querySelector(".div1"); // Selects the element with class "div1"
let email = document.getElementById("email");
let newDiv = document.createElement("div");
let forValid = document.getElementById("for-validation");
let password = document.getElementById("password");
newDiv.id = "forUserName";

let newDivEmail = document.createElement("div");


function one(element, msg){
  element.addEventListener("input", () => {
    let length = element.value.length;
    
    // Update the text content of newDiv based on username length
    if (length < 8) {
      newDiv.textContent = msg;
      if (!div1.contains(newDiv)) {
        div1.appendChild(newDiv);
        newDiv.style.color = "red";
      }
    } else {
      newDiv.textContent = "Looks good";
      if (div1.contains(newDiv)) {
        div1.removeChild(newDiv);
      }
    }
  });
  
}
email.addEventListener("input", () => {
  let vall = email.value;
  let isValid = vall.includes("@") && vall.includes(".");
  if (isValid) {
    newDivEmail.textContent = "";
  } else {
    newDivEmail.textContent = "Each email must contain an '@' and a '.'.";
    newDivEmail.style.color = "red";
  }
  if (!forValid.contains(newDivEmail)) {
    forValid.appendChild(newDivEmail);
  }
});


one(userName, "Username should atleast be 8 characters long");
// one(password, "password should atleast be 8 characters long")
