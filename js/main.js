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
        <div class="card-body bg-secondary">
        <h5 class="card-title h2">${tablis.nombre}</h5>
        <img class="card-img-top img-producto" src="assets/${tablis.imagen}" alt="Card image cap">
                <p class="card-text mt-2 h5 ${tablis.precio <= 3100 && "oferton" }">Precio $ ${tablis.precio}</p>
                ${ tablis.precio <= 3100 ? `<p class="oferton">OFERTA</P>` : " "}
                <p class="card-text"><small class="text-muted ">Producto original de SURF CLUB</small></p>
                <div><button id="buttonSumar${tablis.id}" class="btn btn-outline-warning btn-lg" style="width:100%">Sumar al carro</button></div>
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
            text:`El producto ${productoAgregado.nombre} ya existe en el carrito, entrando a tu carrito podes sumar mas de este producto.`,
            timer: 3000,
            showConfirmButton: false,
            theme: dark,
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
            <div class="card border-dark rounded  mb-3" id ="productoCarrito${productoEnCarrito.id}" style="max-width: 540px;">
                <div class="card-body">
                    <h4 class="card-title h1 ">${productoEnCarrito.nombre}</h4>
                    <p class="card-text h3">Precio $${productoEnCarrito.precio}</p> 
                    <img class="card-img-top" height="300px" src="assets/${productoEnCarrito.imagen}" alt="">
                    <p class="card-text h4 text-center mt-3"><em>Cantidad ${productoEnCarrito.cantidad}</em></p> 
                    <p class="card-text h4">Costo $${productoEnCarrito.precio * productoEnCarrito.cantidad}</p> 

                    <button class= "btn btn-secondary " style="width: 49%" id="botonSumarUnidad${productoEnCarrito.id}"><i class="fas fa-plus"> </i></button>
                    <button class= "btn btn-secondary" style="width: 49%" id="botonEliminarUnidad${productoEnCarrito.id}"><i class="fas fa-minus"> </i></button>
                    <div><button class= "btn btn-danger mt-3" style="width: 100%" id="botonEliminar${productoEnCarrito.id}"><i class="far fa-trash-alt"></i></button></div>
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

//total de carrito
function calcularTotal(array){
    let total = array.reduce((acc, productoEnCarrito)=> acc + (productoEnCarrito.precio * productoEnCarrito.cantidad) ,0)

    total == 0 ? precioTotal.innerHTML =  ` No hay productos en su carrito de compras.` :
    precioTotal.innerHTML = `   Usted tiene un carrito con costo total de $${total}`

    return total
}

//finalizar compra en carrito
function FinalizarCompra(){
    swal.fire({
        title: `¿ Confirma compra ahora o seguir mirando ?`,
        icon: `Info`,
        showCancelButton: true,
        padding: '3rem',
        imageUrl: 'https://media1.giphy.com/media/MvbGGZEXr4qVq/giphy.gif?cid=ecf05e47o0ol25larmcuj6o5d0h91z4yumohx6yswc50af28&rid=giphy.gif&ct=g',
        imageWidth: 400,
        imageHeight: 200,
        confirmButtonText: `Confirmar`,
        cancelButtonText: `No, quiero seguir mirando`,
        confirmButtonColor: `Green`,
        cancelbuttonColor: `red`,
    }).then((result)=>{
        if(result.isConfirmed){
            let finalizarTotal = calcularTotal(productosEnCarrito)
            Swal.fire({
                title: '¡Compra confirmada!',
                text: `Gracias por su compra, has a realizado tu compra con exito. `,
                icon: `success`,
                width: 400,
                padding: '1rem',
                color: '#fff',
                background: '#444',
                confirmButtonColor: `Green`,

                backdrop: `
                    url("https://media0.giphy.com/media/dwmNhd5H7YAz6/giphy.gif?cid=ecf05e47otpmsz4j40r3zgzp96clw32yxvlsu1wi741jfgea&rid=giphy.gif&ct=g")
                    right top
                    repeat
                    
                `
            })
            productosEnCarrito = []
            localStorage.removeItem("carrito")
        }else{
            swal.fire({
                title: `Compra no completada`,
                icon: ` info`,
                text: `La compra no fue completada con exito, su carrito sigue con sus productos`,
                confirmButtonColor: `black`,
                timer:3500
            })
        }
        
    }
    )
}

//vaciar carrito
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
