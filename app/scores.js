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
        dates[i].innerHTML = scores[i].date.substring(0, 10);
        scores_[i].innerHTML = scores[i].score;
    }
}

function openSettings() {
    let difficulty_options = document.getElementsByName("difficulty_level");
    let current_difficulty;
    for (let i = 0; i < difficulty_options.length; i++) {
        if (difficulty_options[i].checked)
            current_difficulty = difficulty_options[i].value;
    }
    sessionStorage.setItem("current_difficulty", current_difficulty);
}

function saveSettings() {
    let current_difficulty = sessionStorage.getItem("current_difficulty");
    if (!current_difficulty) current_difficulty = "normal";
    let settings_difficulty;
    let difficulty_options = document.getElementsByName("difficulty_level");
    for (let i = 0; i < difficulty_options.length; i++) {
        if (difficulty_options[i].checked)
            settings_difficulty = difficulty_options[i].value;
    }

    let check=document.getElementById("music");
    let musica=document.getElementById("musica");
    if (!check.checked) {
        musica.removeAttribute("autoplay");
        musica.muted = true;
    } else {
      musica.muted=false;
      musica.setAttribute("autoplay", "");
    }
    
    let audio=document.getElementById("sound")
    sonido = audio.checked ? 1: 0;
    sessionStorage.setItem("current_difficulty", settings_difficulty);
}

function cancelSettings() {
    let current_difficulty = sessionStorage.getItem("current_difficulty");
    let difficulty_options = document.getElementsByName("difficulty_level");
    for (let i = 0; i < 3; i++) {
        difficulty_options[i].removeAttribute("checked");
        if (difficulty_options[i].value == current_difficulty)
            difficulty_options[i].click();
    }
}

function clearInput(name) {
    let inputs = document.getElementsByName(name);
    for (let i = 0; i < inputs.length; i++)
        inputs[i].value = "";
}

function login() {
    let email = document.getElementById("email").value;
    let pwd = document.getElementById("pwd").value;

    if (!email || !pwd) {
        alert("Llena todos los campos");
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/users/" + email + "/" + pwd);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = () => {
        if (xhr.status != 200) {
            alert("Credenciales incorrectas");
        } else {
            alert("Log in successful");
            showLoginScreen(xhr.responseText);
            document.getElementById("close_login_modal").click();
        }
    }
}

function showLoginScreen(username) {
    document.getElementById("loginIcon").style.display = "none";
    document.getElementById("loggedUserIcon").style.display = "block";
    document.getElementById("loggedUsername").innerHTML = username;
    sessionStorage.setItem("loggedUser", username);
}

function registerUser() {
    let inputs = document.getElementsByName("register_input");
    
    // Validate inputs
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            alert("Llena todos los campos");
            return;
        }
    }
    if (document.getElementById("new_pwd").value != document.getElementById("confirm_pwd").value) {
        alert("Las contraseñas deben coincidir");
        return;
    }

    let new_user = {
        "username": inputs[0].value,
        "email": inputs[1].value,
        "password": inputs[2].value
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/users");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(new_user));
    xhr.onload = () => {
        if (xhr.status != 200)
            alert(xhr.responseText);
        else {
            alert("Usuario registrado");
            showLoginScreen(new_user.username);
            document.getElementById("close_register_modal").click();
        }
    }
}

loadScores();
let loggedUser = sessionStorage.getItem("loggedUser");
if (loggedUser) showLoginScreen(loggedUser);
document.getElementById("musica").setAttribute("autoplay","");