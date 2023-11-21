const timer = document.getElementById("timer");
let seconds = 0;
let minutes = 0;

let game_on = true;

setInterval(() => {
    if (!game_on) return;
    seconds++;
    if (seconds == 60) {
        minutes++;
        seconds = 0;
    }
    timer.innerHTML = 
        (minutes < 10 ? "0" + minutes: minutes) + ":" + (seconds < 10 ? "0" + seconds: seconds);
    sessionStorage.setItem("timer", seconds + (minutes * 60));
}, 1000);