function loadBoard() {
    let difficulty_options = document.getElementsByName("difficulty_level");
    let difficulty;
    for (let i = 0; i < difficulty_options.length; i++) {
        if (difficulty_options[i].checked)
            difficulty = difficulty_options[i].value;
    }
    
    let rows;
    let cols;

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
}

// Función de ejemplo para manejar el clic en una casilla
function revealCell(event) {
    let numbers = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'bomb']
    const fila = event.target.dataset.fila;
    const columna = event.target.dataset.columna;

    // Aquí puedes añadir la lógica del juego, por ejemplo, mostrar contenido, verificar si hay bomba, etc.
    console.log(`Clic en la casilla (${fila}, ${columna})`);

    // Test adding random numbers
    let n = Math.floor(Math.random() * 9) + 1;
    event.currentTarget.className += " pressed " + numbers[n];
    event.currentTarget.innerHTML = n;
    if (n == 9) event.currentTarget.innerHTML = '<i class="fa-solid fa-bomb fa-xl" style="color:black;"></i>';
    event.currentTarget.removeEventListener('click', revealCell);
}

function saveSettings() {
    let current_difficulty = sessionStorage.getItem("current_difficutly");
    if (!current_difficulty) current_difficulty = "normal";
    let settings_difficulty;
    let difficulty_options = document.getElementsByName("difficulty_level");
    for (let i = 0; i < difficulty_options.length; i++) {
        if (difficulty_options[i].checked)
            settings_difficulty = difficulty_options[i].value;
    }

    if (current_difficulty == settings_difficulty) return;

    loadBoard()
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

loadBoard();