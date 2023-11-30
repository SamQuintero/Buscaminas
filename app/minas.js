const timer = document.getElementById("timer");
let seconds = 0;
let minutes = 0;
let bombs;
let matriz=[];
let bandera;
let firstRound;

let rows;
let cols;

let game_on = true;

let numbers = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'bomb']

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


function loadBoard() {
    getTopScores();
    let loggedUser = sessionStorage.getItem("loggedUser");
    if (loggedUser) {
      showLoginScreen(loggedUser);
      getPersonalBest(loggedUser);
    }
    game_on=true;
    document.getElementById("current_score").innerHTML = 0;
    sessionStorage.setItem("timer", 0);
    document.getElementById("timer").innerHTML = "00:00";
    seconds = minutes = 0;

    let difficulty_options = document.getElementsByName("difficulty_level");
    let difficulty;
    bandera=0;
    firstRound=1;
    for (let i = 0; i < difficulty_options.length; i++) {
        if (difficulty_options[i].checked)
            difficulty = difficulty_options[i].value;
    }
    
  

    switch (difficulty) {
        case "easy":
            rows = cols = 8;
            bombs=10;
            break;
        case "normal":
            rows = cols = 16;
            bombs=40;
            break;
        case "hard":
            rows = 16;
            cols = 30;
            bombs=90;
            break;
    }
    let minasNumber=document.getElementById("minasNumber");
    minasNumber.innerHTML=bombs;

    const board = document.getElementById("tablero");
    board.innerHTML = "";
    board.classList = ("board_" + difficulty);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const casilla = document.createElement('div');
            casilla.id=''+i+ ' '+j; 
            casilla.classList.add('cell_' + difficulty);
            casilla.dataset.fila = i;
            casilla.dataset.columna = j;
            casilla.textContent = ''; // Puedes ajustar el contenido según sea necesario
      
            // Agrega un evento de clic a cada casilla (aquí puedes manejar la lógica del juego)
            casilla.addEventListener('click', revealCell);
            casilla.addEventListener("contextmenu", (e) => {
              e.preventDefault();
            });
            casilla.addEventListener('contextmenu', banderaRightClick);
            
            // Añade la casilla al tablero
            board.appendChild(casilla);

        }
    }
    matrizGrid();
}

function banderaRightClick(event){
  if (event.currentTarget.className.includes("pressed")) return;
    const eventoClic = new Event('click');
    const fila = event.target.dataset.fila;
    const columna = event.target.dataset.columna;
    if(!event.currentTarget.className.includes("bandera")){
      minasNumber.innerHTML=innerHTML=Math.floor(minasNumber.innerHTML)-1;
      event.currentTarget.classList.add("bandera");
      event.currentTarget.innerHTML = '<i class="fa-solid fa-flag  " style="color: #f12b2b;"></i>';
      if(minasNumber.innerHTML=="0"){
        isWin();
      }
    }
    else{
      minasNumber.innerHTML=innerHTML=Math.floor(minasNumber.innerHTML)+1;
      event.currentTarget.innerHTML ="";
      event.currentTarget.classList.remove("bandera")
    }
}
// Función de ejemplo para manejar el clic en una casilla
function revealCell(event) {
  
    const eventoClic = new Event('click');
    const fila = event.target.dataset.fila;
    const columna = event.target.dataset.columna;
    let minasNumber=document.getElementById("minasNumber");
    
    //para que se muestre el banderín
    if (bandera!=0){
      
      if(!event.currentTarget.className.includes("bandera")){
       
        minasNumber.innerHTML=innerHTML=Math.floor(minasNumber.innerHTML)-1;
        event.currentTarget.classList.add("bandera");
        event.currentTarget.innerHTML = '<i class="fa-solid fa-flag  " style="color: #f12b2b;"></i>';
        if(minasNumber.innerHTML=="0"){
          isWin();
        }
      }
      else{
        minasNumber.innerHTML=innerHTML=Math.floor(minasNumber.innerHTML)+1;
        event.currentTarget.innerHTML ="";
        event.currentTarget.classList.remove("bandera")
      }
      
    }

    //Abrir casillas
    else if(!event.currentTarget.className.includes("bandera")) {
        
      let n = matriz[fila][columna];
      event.currentTarget.innerHTML = n;
      //Si se preciona una bomba
      if (n == 666){
        //Si es la primera vez que se clickea se tiene que evitar que sea una bomba si lo es se vuelven a mover las bombas de lugar
        if(firstRound==1){
          matrizGrid();
          if(matriz[fila][columna]==6)matrizGrid();
          firstRound=0;
          let n1 = matriz[fila][columna];
          event.currentTarget.innerHTML = n1;
          event.currentTarget.className += " pressed " + numbers[n1];
          if (n1==0)event.currentTarget.innerHTML=numbers[0];
        }
        else{
          document.getElementById("current_score").innerHTML = calculateScore(false);
          mostrarTodo();
          bombDisplay();
          registerScore();
        }
       
      }
      else{
        firstRound=0;
        event.currentTarget.className += " pressed " + numbers[n];
        if (n==0)event.currentTarget.innerHTML=numbers[0];
        event.currentTarget.removeEventListener('click', revealCell);
        //Recursividad si la casilla no tiene número
        if(minasNumber.innerHTML=="0"){
          isWin();
        }
        if(event.currentTarget.innerHTML==""){
          if(Math.floor(fila)>0 && Math.floor(columna)>0){
            let toOpen=document.getElementById(""+(Math.floor(fila)-1)+ " "+(Math.floor(columna)-1));
            if (!toOpen.classList.contains("pressed"))
              toOpen.dispatchEvent(eventoClic)
          }
          if(Math.floor(fila)>0){
            let toOpen=document.getElementById(""+(Math.floor(fila)-1)+ " "+(Math.floor(columna)));
            if (!toOpen.classList.contains("pressed"))
              toOpen.dispatchEvent(eventoClic)
            
          }
          
          if(Math.floor(fila)>0 && Math.floor(columna)+1< cols){
            let toOpen=document.getElementById(""+(Math.floor(fila)-1)+ " "+(Math.floor(columna)+1));
            if (!toOpen.classList.contains("pressed"))
              toOpen.dispatchEvent(eventoClic)
            
          }
          if(Math.floor(columna)>0){
            let toOpen=document.getElementById(""+(Math.floor(fila))+ " "+(Math.floor(columna)-1));
            if (!toOpen.classList.contains("pressed"))
              toOpen.dispatchEvent(eventoClic)
            
          }
            
          if(Math.floor(columna)+1<cols){
            let toOpen=document.getElementById(""+(Math.floor(fila))+ " "+(Math.floor(columna)+1));
            if (!toOpen.classList.contains("pressed"))
              toOpen.dispatchEvent(eventoClic)
            
          }
            
          if(Math.floor(fila)+1<rows && Math.floor(columna)>0){
            let toOpen=document.getElementById(""+(Math.floor(fila)+1)+ " "+(Math.floor(columna)-1));
            if (!toOpen.classList.contains("pressed"))
              toOpen.dispatchEvent(eventoClic)
          }
            
          if(Math.floor(fila)+1<rows){
            let toOpen=document.getElementById(""+(Math.floor(fila)+1)+ " "+(Math.floor(columna)));
            if (!toOpen.classList.contains("pressed"))
              toOpen.dispatchEvent(eventoClic)
          }
           
          if(Math.floor(fila)+1<rows && Math.floor(columna)+1<cols){
            let toOpen=document.getElementById(""+(Math.floor(fila)+1)+ " "+(Math.floor(columna)+1));
            if (!toOpen.classList.contains("pressed"))
              toOpen.dispatchEvent(eventoClic)
          }
        }
        else {
         
          if(fila>0 && matriz[Math.floor(fila)-1][Math.floor(columna)]==0){
            let toOpen=document.getElementById(""+(Math.floor(fila)-1)+ " "+(Math.floor(columna)));
            toOpen.dispatchEvent(eventoClic)
            
          }
          
          else if(columna>0 && matriz[Math.floor(fila)][Math.floor(columna)-1]==0){
            let toOpen=document.getElementById(""+(Math.floor(fila))+ " "+(Math.floor(columna)-1));
            toOpen.dispatchEvent(eventoClic)
            
          }
            
          else if(Math.floor(columna)+1<cols && matriz[Math.floor(fila)][Math.floor(columna)+1]==0){
            let toOpen=document.getElementById(""+(Math.floor(fila))+ " "+(Math.floor(columna)+1));
            toOpen.dispatchEvent(eventoClic)
            
          }
            
            
          else if(Math.floor(fila)+1<rows && matriz[Math.floor(fila)+1][Math.floor(columna)]==0){
            let toOpen=document.getElementById(""+(Math.floor(fila)+1)+ " "+(Math.floor(columna)));
            toOpen.dispatchEvent(eventoClic)
          }
           
          
        }
        
      } 
      
      
    }
   
    
}



function mostrarTodo(){
  game_on = false;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let casillaAbrir=document.getElementById(""+i + " "+j);
      let n = matriz[i][j];
      casillaAbrir.className += " pressed " + numbers[n];
      casillaAbrir.innerHTML = n;
      if (n==0)casillaAbrir.innerHTML=numbers[0];
      if(n==666)casillaAbrir.innerHTML = '<i class="fa-solid fa-bomb fa-xl" style="color:black;"></i>';
      casillaAbrir.removeEventListener('click', revealCell);
    }
  }

}
function isWin(){
  let yetCloseCells=false;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let casilla=document.getElementById(""+i + " "+j);
      if(!casilla.className.includes("pressed") && !casilla.className.includes("bandera")){
        yetCloseCells=true;
      }
    }
  }
  if(!yetCloseCells){
    game_on=false;
    confettiDisplay();
    document.getElementById("current_score").innerHTML = calculateScore(true);
    registerScore();
  }
 

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

    sessionStorage.setItem("current_difficulty", settings_difficulty);
    loadBoard();
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

function cancelSettings() {
    let current_difficulty = sessionStorage.getItem("current_difficulty");
    let difficulty_options = document.getElementsByName("difficulty_level");
    for (let i = 0; i < 3; i++) {
        difficulty_options[i].removeAttribute("checked");
        if (difficulty_options[i].value == current_difficulty)
            difficulty_options[i].click();
    }
}

function matrizGrid(){
  let filas=rows;
  let columnas=cols;
  for (let i = 0; i < filas; i++) {
    matriz[i] = new Array(columnas).fill(0);
  }
  let b=0
  while (b<bombs){
    let i = Math.floor(Math.random() * filas) ;
    let j = Math.floor(Math.random() * columnas) ;
    if(matriz[i][j]!=666){
      matriz[i][j]=666;
      b++;
    } 
  }
  let count=0;
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if(matriz[i][j]==666){
        continue;
      }
      
      if( i>0 && j>0 && matriz[i-1][j-1]==666){
        count++;
      }
      if( i>0 && matriz[i-1][j]==666 ){
        count++;
      }
      if(  i>0 && j+1<columnas && matriz[i-1][j+1]==666){
        count++;
      }
      if( j>0 && matriz[i][j-1]==666){
        count++;
      }
      if( j+1<columnas && matriz[i][j+1]==666){
        count++;
      }
      if( i+1<filas && j>0 && matriz[i+1][j-1]==666){
        count++;
      }
      if(  i+1<filas && matriz[i+1][j]==666){
        count++;
      }
      if( i+1<filas && j+1<columnas && matriz[i+1][j+1]==666){
        count++;
      }
      matriz[i][j]=count;
      count=0;
    }
}
}

function banderas(){
    let flag= document.getElementById("Flag");
    if(bandera==0){
        flag.classList.add("flag_pressed");
        bandera=1;
    }
    else{
        bandera=0;
        flag.classList.remove("flag_pressed");
    }

  
}

function clearInput(name) {
    let inputs = document.getElementsByName(name);
    for (let i = 0; i < inputs.length; i++)
        inputs[i].value = "";
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
            getPersonalBest(new_user.username);
            document.getElementById("close_register_modal").click();
        }
    }
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
            getPersonalBest(xhr.responseText);
            document.getElementById("close_login_modal").click();
        }
    }
}

function getTopScores() {
  let current_difficulty = sessionStorage.getItem("current_difficulty");
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/scores/" + current_difficulty);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  xhr.onload = () => {
    let best_scores_html = document.getElementsByName("best_scores");
    let best_scores = ['-', '-', '-'];
    if (xhr.status != 200) {
      console.log(xhr.statusText);
    } else {
      let response = JSON.parse(xhr.responseText);
      for (let i = 0; i < response.length; i++)
        best_scores[i] = response[i].score;
    }
    for (let i = 0; i < 3; i++)
      best_scores_html[i].innerHTML = best_scores[i];
  }

}

function showLoginScreen(username) {
  document.getElementById("loginIcon").style.display = "none";
  document.getElementById("loggedUserIcon").style.display = "block";
  document.getElementById("loggedUsername").innerHTML = username;
  sessionStorage.setItem("loggedUser", username);
}

function getPersonalBest(username) {
    let current_difficulty = sessionStorage.getItem("current_difficulty");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/users/" + username);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = () => {
      let personalBest = document.getElementById("personal_best");
      if (xhr.status != 200) {
          personalBest.innerHTML = "----";
      } else {
          let user = JSON.parse(xhr.responseText);
          personalBest.innerHTML = user.scores[current_difficulty][0].score;
      }
    }
}
function bombDisplay(){
  let Loading=document.getElementById("explotion")
  Loading.style.display="block";
  setTimeout(()=>{
      Loading.style.display="none";
      
  }, 3000)
}
function confettiDisplay(){
  let Loading=document.getElementById("confetti")
  Loading.style.display="block";
  setTimeout(()=>{
      Loading.style.display="none";
  
},3000)
}

function findBombs() {
  let bombs = 0;
  let current_difficulty = sessionStorage.getItem("current_difficulty");
  let board = document.getElementsByClassName("cell_" + current_difficulty);

  for (let i = 0; i < board.length; i++) {
    if (board[i].className.includes("pressed")) continue;

    let row = board[i].dataset.fila;
    let col = board[i].dataset.columna;

    if (matriz[row][col] == 666) {
      if (!board[i].className.includes("bandera"))
        bombs++;
    }
  }
  return bombs;
}

function calculateScore(win) {
  let time = sessionStorage.getItem("timer");
  if (win) {
    return 1000 - time;
  } else {
    let bombs = findBombs();
    let penalty;
    switch (sessionStorage.getItem("current_difficulty")) {
      case "easy": penalty = 1000 / (10); break;
      case "normal": penalty = 1000 / (40); break;
      case "hard": penalty = 1000 / (90); break;
    }
    return Math.max(Math.floor(1000 - time - (bombs * penalty)), 0);
  }
}


function registerScore() {
  if (!sessionStorage.getItem("loggedUser")) return;
  let current_difficulty = sessionStorage.getItem("current_difficulty");
  let current_user = sessionStorage.getItem("loggedUser");
  let current_score = parseInt(document.getElementById("current_score").innerHTML);

  let score = {
    username: current_user,
    score: current_score
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/scores/" + current_difficulty);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(score));
  xhr.onload = () => {
    if (xhr.status != 200) {
      console.log(xhr.statusText);
      console.log("No se pudo guardar el puntaje");
    }
  }

  let user_score = {
    score: current_score,
    date: Date.now()
  };

  let xhr_ = new XMLHttpRequest();
  xhr_.open("PUT", "http://localhost:3000/users/scores/" + current_user + "/" + current_difficulty);
  xhr_.setRequestHeader("Content-Type", "application/json");
  xhr_.send(JSON.stringify(user_score));
  xhr_.onload = () => {
    if (xhr_.status != 200) {
      console.log(xhr_.statusText);
      console.log("No se pudo guardar el puntaje");
    }
  }
}

loadBoard();
sessionStorage.setItem("current_difficulty", "normal");