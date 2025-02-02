var randomNumber1 = Math.floor(((Math.random())*6)+1);
var randomNumber2 = Math.floor(((Math.random())*6)+1);

var dice1 = "./images/dice" + randomNumber1 + ".png";
var dice2 = "./images/dice" + randomNumber2 + ".png";

document.getElementById("image1").setAttribute("src", dice1);
document.getElementById("image2").setAttribute("src", dice2);

if(randomNumber1 > randomNumber2){
    document.getElementById("result").innerHTML = "Player 1 wins!";
}else if(randomNumber2 > randomNumber1){
    document.getElementById("result").innerHTML = "Player 2 wins!";
}else if(randomNumber1 === randomNumber2){
    document.getElementById("result").innerHTML = "It's a tie!";
}else{
    document.getElementById("result").innerHTML = "Something went wrong!";
}
