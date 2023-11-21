// Tamaño del tablero
const filas = 8;
const columnas = 8;

// Obtén el elemento del tablero
const tablero = document.getElementById('tablero');

const numbers = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'bomb']

// Genera las casillas y añádelas al tablero
for (let i = 0; i < filas; i++) {
  for (let j = 0; j < columnas; j++) {
    const casilla = document.createElement('div');
    casilla.classList.add('casilla');
    casilla.dataset.fila = i;
    casilla.dataset.columna = j;
    casilla.textContent = ''; // Puedes ajustar el contenido según sea necesario

    // Agrega un evento de clic a cada casilla (aquí puedes manejar la lógica del juego)
    casilla.addEventListener('click', manejarClicCasilla);

    // Añade la casilla al tablero
    tablero.appendChild(casilla);
  }
}

// Función de ejemplo para manejar el clic en una casilla
function manejarClicCasilla(event) {
  const fila = event.target.dataset.fila;
  const columna = event.target.dataset.columna;

  // Aquí puedes añadir la lógica del juego, por ejemplo, mostrar contenido, verificar si hay bomba, etc.
  console.log(`Clic en la casilla (${fila}, ${columna})`);

  // Test adding random numbers
  let n = Math.floor(Math.random() * 9) + 1;
  event.currentTarget.className += " pressed " + numbers[n];
  event.currentTarget.innerHTML = n;
  if (n == 9) event.currentTarget.innerHTML = '<i class="fa-solid fa-bomb fa-xl" style="color:black;"></i>';
  event.currentTarget.removeEventListener('click', manejarClicCasilla);
}