/////////////////////////////
// modo oscuro
//capturas nodos DOM
let botonOscuro = document.getElementById("botonDarkMode")
let botonClaro = document.getElementById("botonLightMode")
let eliminarModeBtn = document.getElementById("eliminarMode")

//evento darkMode
botonOscuro.addEventListener("click",()=>{
    document.body.classList.add("darkMode")
    //para que esa preferencia quede al cerrar el navegador usamos el localStorage
    localStorage.setItem("modoOscuro", true)
})
botonClaro.addEventListener("click",()=>{
    console.log("boton claro funca")
    document.body.classList.remove("darkMode")
    localStorage.setItem("modoOscuro", false)
})

//let modoOscuro = localStorage.getItem("modoOscuro")
let modoOscuro 
//condicional que consulte si esto existe, loguarda SINO lo va a crear, va aclarar que entra por primera vez y lo va a setear
if(localStorage.getItem("modoOscuro")){
    modoOscuro = localStorage.getItem("modoOscuro")
}else{
    console.log("entra por primera vez")
    localStorage.setItem("modoOscuro", false)
    modoOscuro = localStorage.getItem("modoOscuro")
}

//condicional en localStorage
if(modoOscuro == "true") {
    document.body.classList.add("darkMode")
    document.body.classList.add("darkMode")
}else{
    document.body.classList.remove("darkMode")
}


eliminarModeBtn.addEventListener("click", ()=>{
    localStorage.removeItem("modoOscuro")
})
/////////////


