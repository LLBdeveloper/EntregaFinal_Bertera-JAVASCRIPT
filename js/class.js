////////////////////////
// clase  CONSTRUCTORA de productos
///////////////////////
class tabla {
    constructor (nombre, precio, id, imagen) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.id = id;
        this.imagen = imagen;
        this.cantidad = 1
    }
    
    sumarUnidad(){
        this.cantidad = this.cantidad + 1
        return this.cantidad
    }
    restarUnidad(){
        this.cantidad = this.cantidad - 1
        return this.cantidad
    }
}


////////////////////
// Array
////////////////////
let tablas = []

const cargarTablas = async ()=>{
    const response = await fetch("tablas.json")
    const data = await response.json()
    for(let tablis of data){
        let tablaNueva = new tabla(tablis.nombre, tablis.precio, tablis.id, tablis.imagen)
        tablas.push(tablaNueva)
    }
    localStorage.setItem("tablas", JSON.stringify(tablas))

}

///////////////////
// storage y json 
//////////////////
if(localStorage.getItem("tablas")){
    for(let tablis of JSON.parse(localStorage.getItem("tablas"))){
        let tablaNueva = new tabla(tablis.nombre, tablis.precio, tablis.id, tablis.imagen)
        tablas.push(tablaNueva)
    }
}else{
    cargarTablas()    
}