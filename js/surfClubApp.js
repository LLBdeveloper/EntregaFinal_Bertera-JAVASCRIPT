
//Aplicacion MEDIDOR DE VIENTO
function medidor(){
    let nudos = prompt("Ingresa en numeros la cantidad de nudos que sopla en tu spot.");
    
    if ((nudos > 0) && (nudos <= 10)){
        alert("Hay muy poco viento, espera a otro dia que sople, no seas manija.");
    }
    else if ((nudos >= 11) && (nudos <= 19)){
        alert("Usa el kite 12 de metros.");
    }
    else if ((nudos >= 20) && (nudos <= 23)){
        alert("Usa el kite de 10 metros.");
    }
    else if ((nudos >= 24) && (nudos <= 28)){
        alert("Usa el kite de 9 metros.");
    }
    else if ((nudos >= 29) && (nudos <= 35)){
        alert("Usa el kite de 7 metros.");
    }
    else if (nudos >= 36){
        alert("Peligro!!! Hay mucho mucho viento. No Apto para kitesurf.");
    }
    else {
        alert("Respuesta incorrecta, ingrese en numeros la cantidad de nudos.");
        medidor ()
    }
}

//evento kitesurf-app
let kitesurfAPP = document.getElementById("kitesurfAPP")
kitesurfAPP.addEventListener("click", medidor)



