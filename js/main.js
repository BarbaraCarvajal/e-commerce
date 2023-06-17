//Productos
const productos = [
    //Videojuegos
    {
        id: "videojuego-01",
        titulo: "God Of Ward",
        imagen: "./imagenes/videojuego/gow.jpg",
        categoria: { nombre: "Videojuegos", id: "videojuegos" },
        precio: 69990
    },
    {
        id: "videojuego-02",
        titulo: "GTA V",
        imagen: "./imagenes/videojuego/gta5.jpg",
        categoria: { nombre: "Videojuegos", id: "videojuegos" },
        precio: 49990
    },
    {
        id: "videojuego-03",
        titulo: "Horizon",
        imagen: "./imagenes/videojuego/horizon.jpg",
        categoria: { nombre: "Videojuegos", id: "videojuegos" },
        precio: 69990
    },
    {
        id: "videojuego-04",
        titulo: "Kirby",
        imagen: "./imagenes/videojuego/kirby.jpg",
        categoria: { nombre: "Videojuegos", id: "videojuegos" },
        precio: 50990
    },
    {
        id: "videojuego-05",
        titulo: "Zelda",
        imagen: "./imagenes/videojuego/zelda.jpg",
        categoria: { nombre: "Videojuegos", id: "videojuegos" },
        precio: 49990
    },
    //Juegos de mesa
    {
        id: "juegodemesa-01",
        titulo: "Catan",
        imagen: "./imagenes/juegodemesa/catan.jpg",
        categoria: { nombre: "Juegos de mesa", id: "juegosdemesa" },
        precio: 29990
    },
    {
        id: "juegodemesa-02",
        titulo: "Clue",
        imagen: "./imagenes/juegodemesa/clue.jpg",
        categoria: { nombre: "Juegos de mesa", id: "juegosdemesa" },
        precio: 19990
    },
    {
        id: "juegodemesa-03",
        titulo: "Dixit",
        imagen: "./imagenes/juegodemesa/dixit.jpg",
        categoria: { nombre: "Juegos de mesa", id: "juegosdemesa" },
        precio: 28990
    },
    {
        id: "juegodemesa-04",
        titulo: "Imploding Kittens",
        imagen: "./imagenes/juegodemesa/kittens.jpg",
        categoria: { nombre: "Juegos de mesa", id: "juegosdemesa" },
        precio: 19990
    },
    {
        id: "juegodemesa-05",
        titulo: "Monopoly",
        imagen: "./imagenes/juegodemesa/monopoly.jpg",
        categoria: { nombre: "Juegos de mesa", id: "juegosdemesa" },
        precio: 22990
    },
    //Consolas
    {
        id: "consola-01",
        titulo: "Switch Lite",
        imagen: "./imagenes/consolas/lite.jpg",
        categoria: { nombre: "Consolas", id: "consolas" },
        precio: 219990
    },
    {
        id: "consola-02",
        titulo: "PlayStation 4",
        imagen: "./imagenes/consolas/play4.jpg",
        categoria: { nombre: "Consolas", id: "consolas" },
        precio: 349990
    },
    {
        id: "consola-03",
        titulo: "PlayStation 5",
        imagen: "./imagenes/consolas/play5.jpg",
        categoria: { nombre: "Consolas", id: "consolas" },
        precio: 599990
    },
    {
        id: "consola-04",
        titulo: "Switch OLED",
        imagen: "./imagenes/consolas/switch.jpg",
        categoria: { nombre: "Consolas", id: "consolas" },
        precio: 379990
    },
    {
        id: "consola-05",
        titulo: "Xbox Serie S",
        imagen: "./imagenes/consolas/xbox.jpg",
        categoria: { nombre: "Consolas", id: "consolas" },
        precio: 299990
    }
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto=>{

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML=`
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
            `;

        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}


cargarProductos(productos);


botonesCategoria.forEach(boton=>{
    boton.addEventListener("click",(evento) =>{

        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        evento.currentTarget.classList.add("active");

        if(evento.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === evento.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            
            const productosBoton = productos.filter(producto => producto.categoria.id === evento.currentTarget.id)
            cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    });
}
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");



if(productosEnCarritoLS){
     productosEnCarrito = JSON.parse(productosEnCarritoLS);
     actualizarNumerito(); 
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(evento){
    const idBoton = evento.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito(); 

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// acc -> acumulador
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}