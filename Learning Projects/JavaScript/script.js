document.querySelector("button").addEventListener("click", function(){
    var sound = new Audio("./Drum Kit Starting Files/sounds/crash.mp3");
    sound.play();
});


document.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        var sound = new Audio("./Drum Kit Starting Files/sounds/crash.mp3");
        sound.play();
    }
});