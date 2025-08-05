let myInput = document.getElementById("inputField");
let myBtn = document.getElementById("btn");
let myResult = document.getElementById("result");
let myResult1 = document.getElementById("result1");
console.log(myBtn);
let start = false;
let buttonpressed=false;

// websocket
const socket = new WebSocket("ws://192.168.8.183:81"); 
console.log("Waiting for ESP to connect...");
  socket.onopen = function () {
    console.log("✅ WebSocket connected!");
  };
  socket.onerror = function () {
  console.warn("WebSocket error. ESP may not be online.");
};
  socket.onclose = function (){
    alert(" WebSocket not connected yet")
  }

let waiting = false;

myBtn.addEventListener("click", function (e){
  if (!waiting) {
    if (socket.readyState === WebSocket.OPEN) {
      let guess = parseInt(myInput.value);
      socket.send(JSON.stringify({type: "start", number: guess}));
      waiting = true;
      myResult.innerHTML = "Waiting for board...";
      myResult1.innerHTML = "";
    } else {
      myResult.innerHTML = "ESP not connected";
    }
  }
});
socket.onmessage = function (event) {
  let msg = event.data;
  if (msg === "result:win") {
    myResult.innerHTML = "You Have win congrats!";
    waiting = false;
  } else if (msg === "result:lose") {
    myResult.innerHTML = "You Have lose!";
    waiting = false;
  }
};



//   function shock() {
//   if (socket.readyState === WebSocket.OPEN) {
//     socket.send("shock");
//     console.log("⚡ Shock sent!");
//   } else {
//     console.warn("❌ WebSocket not connected yet.");
//   }
// }

//   socket.onmessage = function (event) {
//     console.log("📩 Message from ESP:", event.data);
//     if (event.data=="pressed"){
//       buttonpressed=true;
//       console.log("pressed")
//     }
//   }

// myBtn.addEventListener("click", function (e){
//     if (start) {
//     myBtn.style.backgroundColor = "  hsla(278, 73%, 41%, 0.855)";
//     myBtn.innerHTML = "Guess";
//     myResult.innerHTML = "waiting";
//     myResult1.innerHTML = "";
//   } else {
//     if(buttonpressed) {
//       buttonpressed=false; 
//     let myComputer = Math.ceil(Math.random() * 10);
//     myBtn.style.backgroundColor = " hsla(278, 28%, 49%, 0.855)";
//     myBtn.innerHTML = "Play again";

//     if (isNaN(parseInt(myInput.value))) {
//       myResult.innerHTML = "Please enter a valid number!";
//     }else if (parseInt(myInput.value) === myComputer) {
//       myResult.innerHTML = "You Have win congrats!";
//       myResult1.innerHTML = `Your number is ${myInput.value} = computer number is ${myComputer}`;
//     } else {
//       shock();
//       myResult.innerHTML = "You Have lose!";
//       myResult1.innerHTML = `Your number is ${myInput.value} != computer number is ${myComputer}`;
//       myBtn.style.backgroundColor = " hsla(278, 28%, 49%, 0.855)";
//     }
//     start = !start;
//   } else{
//     console.log("not pressed yet...")
//   }
// }
// });
