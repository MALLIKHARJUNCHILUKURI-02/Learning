// document.querySelector("button").addEventListener("click", function(){
//     var sound = new Audio("./Drum Kit Starting Files/sounds/crash.mp3");
//     sound.play();
// });


// document.addEventListener("keypress", function(event){
//     if (event.key === "Enter") {
//         var sound = new Audio("./Drum Kit Starting Files/sounds/crash.mp3");
//         sound.play();
//     }
// });


// const currentYear = new Date().getFullYear();
// console.log(currentYear); 

var http = require('http');

//create a server object:
http.createServer(function (req, res) {
    res.writeHead(200, {'content-type':'text/html'});
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080);