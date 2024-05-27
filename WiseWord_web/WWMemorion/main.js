let palabrasCombinadas = []; // Array para almacenar las palabras y sus traducciones
let tarjeta1 = null;
let tarjeta2 = null;
let primeraPalabra = null;
let segundaPalabra = null;
let tarjetasVolteadas = 0;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let tiempo = 5;
let tiempoRegresivo = null;
let auxArr = []
let actualId = -1;
let lastID = -1
let objAComprobar = { espanol: "", ingles: "" }
let fail = false

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

function crearTabla() {
  // Generamos la tabla de botones en el HTML
  visualizarTiempo.innerHTML = `Tiempo: ${tiempo} s`;
  
  for(let i=0; i<palabrasCombinadas.length; i++){
    auxArr.push(palabrasCombinadas[i].espanol)
    auxArr.push(palabrasCombinadas[i].ingles)
  }

  auxArr = auxArr.sort(() => Math.random() - 0.5); 
  let tabla = document.getElementById('tabla');
  let contador = 0; // contador para asignar IDs a las tarjetas
  for (let i = 0; i < 4; i++) {
    let fila = tabla.insertRow();
    for (let j = 0; j < 4; j++) {
      let celda = fila.insertCell();
      celda.innerHTML = `<button id="${contador}" onclick="voltear(${contador})"></button>`;
      contador++;
    }
  }
}

function contarTiempo() {
  tiempoRegresivo = setInterval(() => {
    tiempo--;
    visualizarTiempo.innerHTML = `Tiempo: ${tiempo} s`;

    if(fail){
      let lastBtn = document.getElementById(lastID);
      lastBtn.innerHTML = ""
      lastBtn.disabled = false;
  
      let btnSel = document.getElementById(actualId);
      btnSel.innerHTML = ""
      btnSel.disabled = false;

      fail = false
    }

    if (tiempo == 0) {
      visualizarTiempo.innerHTML = `Game Over &#128078`;
      gameOver();
      clearInterval(tiempoRegresivo);
    }
  }, 1000);
}

function gameOver() {
  for (let i = 0; i < auxArr.length; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = auxArr[i];
    tarjetaBloqueada.disabled = true;
    


    //alert("GAME OVER -> Tienes "+visualizarAciertos.innerHTML.substring(10)+" aciertos.")
    //visualizarAciertos.innerHTML = "Aciertos: 0"
  }
}

function voltear(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  visualizarMovimientos.innerHTML = "Movimientos: "+(parseInt(visualizarMovimientos.innerHTML.substring(13))+1).toString()
  let btnSel = document.getElementById(id);
  actualId = id
  btnSel.innerHTML = auxArr[id]
  btnSel.disabled = true;

  if(tarjetasVolteadas == 0){
    lastID = id

    for(let i=0; i<palabrasCombinadas.length; i++){
      if(palabrasCombinadas[i].espanol == auxArr[id] || palabrasCombinadas[i].ingles == auxArr[id]){
        objAComprobar = palabrasCombinadas[i]
        break
      } 
    }
  }else{
    // Comprobación
    for(let i=0; i<palabrasCombinadas.length; i++){

      // Si gana
      if((palabrasCombinadas[i].espanol == auxArr[id] || palabrasCombinadas[i].ingles == auxArr[id]) && (palabrasCombinadas[i].espanol == auxArr[lastID] || palabrasCombinadas[i].ingles == auxArr[lastID])){
        
        visualizarAciertos.innerHTML = "Aciertos: "+(parseInt(visualizarAciertos.innerHTML.substring(10))+1).toString()
        

        let lastBtn = document.getElementById(lastID);
        lastBtn.innerHTML = auxArr[lastID]
        lastBtn.disabled = true;
    
        btnSel.innerHTML = auxArr[id]
        btnSel.disabled = true;

        tarjetasVolteadas = 0
        return
      } 
    }
    
// Si pierde
    fail = true
    tarjetasVolteadas = 0
    return 
  }

  tarjetasVolteadas++;

/*
  if (tarjetasVolteadas == 0) {
    
    primeraPalabra = palabraMostrada.ingles;
    tarjeta1.innerHTML = primeraPalabra;
    tarjeta1.disabled = true;
  } else if (tarjetasVolteadas == 1) {
    tarjeta2 = document.getElementById(id);
    segundaPalabra = palabraMostrada.espanol;
    tarjeta2.innerHTML = segundaPalabra;
    tarjeta2.disabled = true;

    movimientos++;
    visualizarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primeraPalabra === segundaPalabra) {
      aciertos++;
      visualizarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      if (aciertos == palabrasCombinadas.length / 2) {
        clearInterval(tiempoRegresivo);
        visualizarAciertos.innerHTML = `Aciertos: ${aciertos} 🎉`;
        visualizarTiempo.innerHTML = `¡Enhorabuena! ¡Lo has conseguido en ${tiempoInicial - tiempo} segundos! 🏆`;
        visualizarMovimientos.innerHTML = `Movimientos: ${movimientos} 📊`;
      }
    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = '';
        tarjeta2.innerHTML = '';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
      }, 600);
    }
  }
*/
  //tarjetasVolteadas = (tarjetasVolteadas + 1) % 2;
}
