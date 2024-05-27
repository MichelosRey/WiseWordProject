
let visualizarMovimientos = document.getElementById('movimientos');
let visualizarAciertos = document.getElementById('aciertos');
let visualizarTiempo = document.getElementById('t-restante');

// Cargar el archivo JSON de palabras
fetch('palabras.json')
  .then(response => response.json())
  .then(data => {


    palabrasCombinadas = data.words; // Duplicamos las palabras

    
    palabrasCombinadas.sort(() => Math.random() - 0.5); // Mezclamos las palabras
    palabrasCombinadas = palabrasCombinadas.slice(0, 8)


    console.log(palabrasCombinadas)
    crearTabla(); // Llamamos a la función para crear la tabla de botones
  })
  .catch(error => console.error('Error cargando el archivo JSON:', error));


  function signUp(){
    alert("todo ok");
  }
