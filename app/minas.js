const timer = document.getElementById("timer");
let seconds = 0;
let minutes = 0;
let bombs=10;
let matriz=[];
let bandera=0;

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
    let difficulty_options = document.getElementsByName("difficulty_level");
    let difficulty;
    for (let i = 0; i < difficulty_options.length; i++) {
        if (difficulty_options[i].checked)
            difficulty = difficulty_options[i].value;
    }
    
  

    switch (difficulty) {
        case "easy":
            rows = cols = 8;
            break;
        case "normal":
            rows = cols = 16;
            break;
        case "hard":
            rows = 30;
            cols = 16;
            break;
    }

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
            
            // Añade la casilla al tablero
            board.appendChild(casilla);
        }
    }
    matrizGrid();
}

// Función de ejemplo para manejar el clic en una casilla
function revealCell(event) {
    
    const fila = event.target.dataset.fila;
    const columna = event.target.dataset.columna;

    // Aquí puedes añadir la lógica del juego, por ejemplo, mostrar contenido, verificar si hay bomba, etc.
    console.log(`Clic en la casilla (${fila}, ${columna})`);

    if (bandera!=0){
      let minasNumber=document.getElementById("minasNumber");
      if(!event.currentTarget.className.includes("bandera")){
       
        minasNumber.innerHTML=innerHTML=Math.floor(minasNumber.innerHTML)-1;
        event.currentTarget.classList.add("bandera");
        event.currentTarget.innerHTML = '<i class="fa-solid fa-flag  " style="color: #f12b2b;"></i>';
      }
      else{
        minasNumber.innerHTML=innerHTML=Math.floor(minasNumber.innerHTML)+1;
        event.currentTarget.innerHTML ="";
        event.currentTarget.classList.remove("bandera")
      }
    }
    else{   
      let n = matriz[fila][columna];
      event.currentTarget.className += " pressed " + numbers[n];
      event.currentTarget.innerHTML = n;
      
      if (n == 666){
        mostrarTodo();

      } 
      if (n==0)event.currentTarget.innerHTML=numbers[0];
      event.currentTarget.removeEventListener('click', revealCell);
      
    }
}

function abrirVariasCeldas(r, c){
  let toOpen=document.getElementById(""+r+ " "+c);
  if(toOpen.innerHTML==""){
   
  }

}

function mostrarTodo(){
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

function saveSettings() {
    let current_difficulty = sessionStorage.getItem("current_difficulty");
    if (!current_difficulty) current_difficulty = "normal";
    let settings_difficulty;
    let difficulty_options = document.getElementsByName("difficulty_level");
    for (let i = 0; i < difficulty_options.length; i++) {
        if (difficulty_options[i].checked)
            settings_difficulty = difficulty_options[i].value;
    }

    if (current_difficulty == settings_difficulty) return;

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

  console.log(matriz);
}
}
function reiniciar(){
  
}
function banderas(){
  if(bandera==0){
    let flag= document.getElementById("Flag");
    bandera=1;
  }
  else{
    bandera=0;
  }
  
}

loadBoard();