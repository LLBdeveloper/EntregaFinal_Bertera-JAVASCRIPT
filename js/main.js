////////////////////
//  CAPTURAS DEL DOM
///////////////////
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let verProductos = document.getElementById("verProductos")
let guardarLibroBtn = document.getElementById("guardarLibroBtn")
let ocultarProductos = document.getElementById("ocultarProductos")
let selectOrden = document.getElementById("selectOrden")
let shop = document.getElementById("shop")
let miFormulario = document.getElementById("formulario");
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let personalizador = document.getElementById("personalizador")
let precioTotal = document.getElementById("precioTotal")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let botonVaciar = document.getElementById("BotonVaciar")



///////////////
// FUNCIONES
//////////////

// ver catalogo - shop - plantillas para las tablas
function catalogo(array){
    shop.innerHTML = "" 
    for(let tablis of array){
        let nuevaTabla = document.createElement("div")
        nuevaTabla.innerHTML = `
        <div class="card border border-secondary rounded">
            <img class="card-img-top img-producto" src="assets/${tablis.imagen}" alt="Card image cap">
            <div class="card-body bg-secondary">
                <h5 class="card-title">${tablis.nombre}</h5>
                <p class="card-text ${tablis.precio <= 3100 && "oferton" }">$ ${tablis.precio}</p>
                ${ tablis.precio <= 3100 ? `<p class="oferton">OFERTA</P>` : " "}
                <p class="card-text"><small class="text-muted">Producto original de SURF CLUB</small></p>
                <button id="buttonSumar${tablis.id}" class="btn btn-outline-warning">Sumar al carrito</button>
            </div>
        </div>
        `
        shop.appendChild(nuevaTabla)

        let buttonSumar = document.getElementById(`buttonSumar${tablis.id}`)
        buttonSumar.addEventListener("click", ()=>{
            agregarAlCarrito(tablis)
            
        })

    }
}

//carrito localStorage
let productosEnCarrito = []
if(localStorage.getItem("carrito")){
    for(let tablis of JSON.parse(localStorage.getItem("carrito"))){
        let cantStorage = tablis.cantidad
        let tablaCarrito = new tabla(tablis.nombre, tablis.precio, tablis.id, tablis.imagen)
        tablaCarrito.cantidad = cantStorage
        productosEnCarrito.push(tablaCarrito)
    }
}else{
    productosEnCarrito = []
}
// personalizar tabla 
function agregarTabla(array){
    let inputModelo = document.getElementById("inputModelo")
    let inputPrecio = document.getElementById("inputPrecio")
    const tablaNueva = new tabla(inputModelo.value, inputPrecio.value, tablas.length+1, "tablaPersonalizada.jpg" )
    tablas.push(tablaNueva) 
    localStorage.setItem("tablas", JSON.stringify(array))
    catalogo(array)
    personalizador.reset()
    Toastify({
        text: "Personalizaste tu tabla, la podes encontrar en PRODUCTOS, sumala al carrito!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "left", 
        stopOnFocus: true, 
        style: {
            color: "black",
            background: "linear-gradient(to right, yellow , green)",
        },
    }).showToast();
}

// buscador
function buscarInfo(buscado, array){
    let busquedaArray = array.filter(
        (tablis) => tablis.nombre.toLowerCase().includes(buscado.toLowerCase())
    )
    
    if(busquedaArray.length == 0){
        coincidencia.innerHTML = ` <h3 class=" coincidenciaNO"> - No hay coinidencias con su busqueda - </h3> `
        catalogo(busquedaArray)
    }else{
        catalogo(busquedaArray)
    }
}

//ordenar por
function ordenarMenorMayor(array){
    const menorMayor = [].concat(array)
    menorMayor.sort((a,b) => a.precio - b.precio)
    catalogo(menorMayor)
}
function ordenarMayorMenor(arr){
    const mayorMenor = [].concat(arr)
    mayorMenor.sort((param1, param2)=>{
        return param2.precio - param1.precio
    })
    catalogo(mayorMenor)
}
function ordenarAlfabeticamenteTitulo(array){
    const ordenadoAlfabeticamente = [].concat(array)
    ordenadoAlfabeticamente.sort((a,b) => {
        if(a.nombre > b.nombre) {
            return 1
        }
        if (a.nombre < b.nombre) {
            return -1
        }
        return 0;
    })
    catalogo(ordenadoAlfabeticamente)
}

// agregar al carrito productos y al localStorage
function agregarAlCarrito(tablis){
    let productoAgregado = productosEnCarrito.find((elem)=> elem.id == tablis.id)
    if (productoAgregado == undefined){
        productosEnCarrito.push(tablis)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `El producto ${tablis.nombre} con precio de $${tablis.precio} fue agregado al carrito con exito.`,
            showConfirmButton: false,
            timer: 2900
        })
    }else{
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: `Producto repetido`,
            text:`El producto ${productoAgregado.nombre} ya existe en el carrito.`,
            timer: 2000,
            showConfirmButton: false,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }
}

// modal modificacion cargar carrito
function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoEnCarrito) => {

        modalBodyCarrito.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${productoEnCarrito.id}" style="max-width: 540px;">
                <img class="card-img-top" height="300px" src="assets/${productoEnCarrito.imagen}" alt="">
                <div class="card-body">
                    <h4 class="card-title">${productoEnCarrito.nombre}</h4>
                
                    <p class="card-text">$${productoEnCarrito.precio}</p> 
                    <p class="card-text">Cantidad ${productoEnCarrito.cantidad}</p> 
                    <p class="card-text">Costo $${productoEnCarrito.precio * productoEnCarrito.cantidad}</p> 

                    <button class= "btn btn-success" id="botonSumarUnidad${productoEnCarrito.id}"><i class=""></i>+</button>
                    <button class= "btn btn-danger" id="botonEliminarUnidad${productoEnCarrito.id}"><i class=""></i>-</button>
                    <button class= "btn btn-danger" id="botonEliminar${productoEnCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                </div>    
            </div>
        `
    })
    array.forEach((productoEnCarrito)=>{
        document.getElementById(`botonEliminar${productoEnCarrito.id}`).addEventListener("click", ()=>{
            let cardProducto = document.getElementById(`productoCarrito${productoEnCarrito.id}`)
            cardProducto.remove()
            
            let productoEliminar = array.find((tablis)=> tablis.id == productoEnCarrito.id)
            let posicion = array.indexOf(productoEliminar)
            
            array.splice(posicion,1)

            localStorage.setItem("carrito", JSON.stringify(array))

            calcularTotal(array)
        })
        document.getElementById(`botonSumarUnidad${productoEnCarrito.id}`).addEventListener("click", ()=>{
            productoEnCarrito.sumarUnidad()
            localStorage.setItem("carrito", JSON.stringify(array))
            cargarProductosCarrito(array)
        })

        document.getElementById(`botonEliminarUnidad${productoEnCarrito.id}`).addEventListener("click", ()=>{
            let eliminar = productoEnCarrito.restarUnidad()
            if(eliminar < 1){
                let cardProducto = document.getElementById(`productoCarrito${productoEnCarrito.id}`)
            cardProducto.remove()
            
            let productoEliminar = array.find((tablis)=> tablis.id == productoEnCarrito.id)
            let posicion = array.indexOf(productoEliminar)
            
            array.splice(posicion,1)

            localStorage.setItem("carrito", JSON.stringify(array))

            calcularTotal(array)
            }else{
                localStorage.setItem("carrito", JSON.stringify(array))

            }

            cargarProductosCarrito(array)

        })

    })

    calcularTotal(array)
}

function calcularTotal(array){
    let total = array.reduce((acc, productoEnCarrito)=> acc + (productoEnCarrito.precio * productoEnCarrito.cantidad) ,0)

    total == 0 ? precioTotal.innerHTML =  ` No hay productos en su carrito de compras.` :
    precioTotal.innerHTML = `   Usted tiene un carrito con costo total de $${total}`

    return total
}

function FinalizarCompra(){
    swal.fire({
        title: `Confirma compra ahora o seguir mirando ?`,
        icon: `Info`,
        showCancelButton: true,
        confirmButtonText: `Confirmar`,
        cancelButtonText: `No, quiero seguir mirando`,
        confirmButtonColor: `Green`,
        cancelbuttonColor: `red`,
    }).then((result)=>{
        if(result.isConfirmed){
            let finalizarTotal = calcularTotal(productosEnCarrito)
            swal.fire({
                title: `Compra confirmada`,
                icon: `success`,
                confirmButtonColor: `green`,
                text: `Gracias por su compra, has a realizado tu compra con exito. Su costo final es de $${finalizarTotal}`
            })
            productosEnCarrito = []
            localStorage.removeItem("carrito")
        }else{
            swal.fire({
                title: `Compra no completada`,
                icon: ` info`,
                text: `La compra no fue completada con exito, su carrito sigue con sus productos`,
                confirmButtonColor: `green`,
                timer:3500
            })
        }
        
    }
    )
}

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarProductosCarrito(carrito)
    productosEnCarrito = []

}

////////////////////
// EVENTOS
//////////////////
botonFinalizarCompra.addEventListener("click", ()=> { 
    FinalizarCompra()
})

botonVaciar.addEventListener("click", ()=>{
    vaciarCarrito()
})

verProductos.onclick = () => {
    loaderTexto.innerHTML = `   <h3 id="loaderTextoo" class="text-secondary text-center">Cargando Productos...</h3>
    <div id="loader" class="d-flex justify-content-center">
        <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden"></span>
        </div>
    </div>`
    setTimeout(()=>{
        loaderTexto.innerHTML = ``
        catalogo(tablas)
    }, 2000)
    
}

guardarLibroBtn.addEventListener("click", ()=>{
    agregarTabla(tablas)
})

ocultarProductos.addEventListener("click", ()=>{
    shop.innerHTML = ""})

botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})

buscador.addEventListener("input", ()=>{
    buscarInfo(buscador.value, tablas)
})

miFormulario.addEventListener("submit", validarFormulario);
    function validarFormulario(e){
        e.preventDefault();
}

selectOrden.addEventListener("change",()=>{
    console.log(selectOrden.value)
    if(selectOrden.value == 1){
        ordenarMayorMenor(tablas)
    }else if(selectOrden.value == 2){
        ordenarMenorMayor(tablas)
    }else if(selectOrden.value == 3){
    ordenarAlfabeticamenteTitulo(tablas)
    }else{mostrarCatalogo(tablas)
    }
})



