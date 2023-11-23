const timer = document.getElementById("timer");
let seconds = 0;
let minutes = 0;
let bombs;
let matriz=[];
let bandera;

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
    bandera=0;
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
            
            // Añade la casilla al tablero
            board.appendChild(casilla);

        }
    }
    matrizGrid();
}

// Función de ejemplo para manejar el clic en una casilla
function revealCell(event) {
    const eventoClic = new Event('click');
    const fila = event.target.dataset.fila;
    const columna = event.target.dataset.columna;

    //para que se muestre el banderín
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
    //Abrir casillas
    else{   
      let n = matriz[fila][columna];
      event.currentTarget.innerHTML = n;
      //Si se preciona una bomba
      if (n == 666){
        mostrarTodo();

      }
      else{
        event.currentTarget.className += " pressed " + numbers[n];
        if (n==0)event.currentTarget.innerHTML=numbers[0];
        event.currentTarget.removeEventListener('click', revealCell);
        //Recursividad si la casilla no tiene número
        if(event.currentTarget.innerHTML==""){
          if(fila>0 && columna>0){
            let toOpen=document.getElementById(""+(Math.floor(fila)-1)+ " "+(Math.floor(columna)-1));
            toOpen.dispatchEvent(eventoClic)
          }
          if(fila>0){
            let toOpen=document.getElementById(""+(Math.floor(fila)-1)+ " "+(Math.floor(columna)));
            toOpen.dispatchEvent(eventoClic)
            
          }
          
          if(fila>0 && Math.floor(columna)+1< cols){
            let toOpen=document.getElementById(""+(Math.floor(fila)-1)+ " "+(Math.floor(columna)+1));
            toOpen.dispatchEvent(eventoClic)
            
          }
          if(columna>0){
            let toOpen=document.getElementById(""+(Math.floor(fila))+ " "+(Math.floor(columna)-1));
            toOpen.dispatchEvent(eventoClic)
            
          }
            
          if(Math.floor(columna)+1<cols){
            let toOpen=document.getElementById(""+(Math.floor(fila))+ " "+(Math.floor(columna)+1));
            toOpen.dispatchEvent(eventoClic)
            
          }
            
          if(Math.floor(fila)+1<rows && columna>0){
            let toOpen=document.getElementById(""+(Math.floor(fila)+1)+ " "+(Math.floor(columna)-1));
            toOpen.dispatchEvent(eventoClic)
          }
            
          if(Math.floor(fila)+1<rows ){
            let toOpen=document.getElementById(""+(Math.floor(fila)+1)+ " "+(Math.floor(columna)+1));
            toOpen.dispatchEvent(eventoClic)
          }
           
          if(Math.floor(fila)+1<rows && Math.floor(columna)+1<cols){
            let toOpen=document.getElementById(""+(Math.floor(fila)+1)+ " "+(Math.floor(columna)+1));
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
            let toOpen=document.getElementById(""+(Math.floor(fila)+1)+ " "+(Math.floor(columna)+1));
            toOpen.dispatchEvent(eventoClic)
          }
           
          
          
        }
        
        //abrirVariasCeldas(fila, columna);
        
        
        
      } 
      
      
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