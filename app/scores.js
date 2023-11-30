const difficulty_level = ['easy', 'normal', 'hard'];

function loadScores() {
    for (let i = 0; i < difficulty_level.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/scores/" + difficulty_level[i]);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
        xhr.onload = () => {
        showScores(JSON.parse(xhr.response), difficulty_level[i]);
    }
    }
}

function showScores(scores, difficulty) {
    let usernames = document.getElementsByClassName(difficulty + "_user");
    let dates = document.getElementsByClassName(difficulty + "_date");
    let scores_ = document.getElementsByClassName(difficulty + "_score");

    for (let i = 0; i < scores.length; i++) {
        usernames[i].innerHTML = scores[i].username;
        dates[i].innerHTML = scores[i].date;
        scores_[i].innerHTML = scores[i].score;
    }
}


loadScores();
