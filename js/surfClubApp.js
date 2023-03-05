
//Aplicacion MEDIDOR DE VIENTO
function medidor(){

    Swal.fire({
        title: '¿Cuantos nudos sopla en tu spot?',
        input: 'text',
        inputLabel: 'Ingresa los nudos en numeros.',
        inputPlaceholder: 'Escribe los nudos aquí',
        confirmButtonText: 'Aceptar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
        if (!value) {
            return 'Debes introducir los nudos.';
        }
        }
    }).then((result) => {
        if (result.isConfirmed) {
        const nudos = result.value;
        
        if ((nudos > 0) && (nudos <= 10)){
            swal.fire("Surf-Club APP recomienda:", "Hay muy poco viento, espera a otro dia que sople, no seas manija.", "info")
        }
        else if ((nudos >= 11) && (nudos <= 19)){
            swal.fire("Surf-Club APP recomienda:", "Usa el kite 12 de metros.", "success")
        }
        else if ((nudos >= 20) && (nudos <= 23)){
            swal.fire("Surf-Club APP recomienda:", "Usa el kite 10 de metros.", "success")
        }
        else if ((nudos >= 24) && (nudos <= 28)){
            swal.fire("Surf-Club APP recomienda:", "Usa el kite 9 de metros.", "success")
        }
        else if ((nudos >= 29) && (nudos <= 35)){
            swal.fire("Surf-Club APP recomienda:", "Usa el kite 7 de metros.", "success")
        }
        else if (nudos >= 36){
            swal.fire("Surf-Club APP recomienda:", "Peligro!!! Hay mucho mucho viento. No Apto para kitesurf.", "warning")
        }
        else {
            swal.fire("Respuesta incorrecta, ingrese en numeros la cantidad de nudos.", "", "error")
        }
        }
    })
    
}


//evento kitesurf-app
let kitesurfAPP = document.getElementById("kitesurfAPP")
kitesurfAPP.addEventListener("click", medidor)



