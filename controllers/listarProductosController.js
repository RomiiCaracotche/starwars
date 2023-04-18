import { productoServices } from '../services/productoServices.js'

const contenedorStarwars = document.querySelector("#contenedor-starwars")
const contenedorConsolas = document.querySelector("#contenedor-consolas")
const contenedorDiversos = document.querySelector("#contenedor-diversos")
const contenedorFiltrados = document.querySelector("#contenedor-filtrados")
const cerrar = document.querySelector(".producto-cerrar")
const buscar = document.querySelector(".nav__lupa")
var busqueda = []

document.addEventListener("DOMContentLoaded", descargarTodo)

cerrar.addEventListener("click", (e) => {
    document.querySelector("#modal").classList.remove("container-modal__show")
})

buscar.addEventListener("click", async (e) => {
    try {
        e.preventDefault()
        if(busqueda.length > 0) {
            busqueda = []
            while(contenedorFiltrados.hasChildNodes()) {
                contenedorFiltrados.removeChild(contenedorFiltrados.firstChild);	
            }
        }
        let palabra = document.querySelector("#buscar").value;
        document.querySelector("#seccion-filtrados").classList.remove("filtrados-ocultos")
        document.querySelector("#seccion-filtrados").classList.add("filtrados")

        const respuesta = await productoServices.listarProductos()
        await filtrando(respuesta, palabra)
        await actualizarFiltrados()
    } catch (error) {
        console.log(error)
    }

})

async function actualizarFiltrados() {
    if(busqueda.length > 0) {
        busqueda.forEach(filtrado => {
            const {id, imagen, nombre, precio} = filtrado;
            const div = document.createElement('div');
            div.classList.add('producto');
    
            div.innerHTML = `   <img class="producto__img" src="${imagen}" alt="">
                                <p class="producto__nombre">${nombre}</p>
                                <p class="producto__precio">${precio}</p>     `
    
            const boton = document.createElement('button');
            boton.setAttribute("data-id", id);
            boton.classList.add('producto__ver');
            boton.onclick = verProducto
            boton.textContent = "Ver producto";
    
            div.appendChild(boton);
            contenedorFiltrados.appendChild(div);
        })
    }
}

async function filtrando(respuesta, palabra) {
    try {
        for (let i=0; i< respuesta.length; i++) {
            
            const datos = await respuesta[i].json()
            datos.forEach(dato => {
                if(dato.nombre.includes(palabra)){
                    busqueda.push(dato)
                }
            })
        }
    }
    catch(error) {
        console.log(error)
    }
}

async function descargarTodo() {
    try {
        const productos = await productoServices.listarProductos()
        console.log(productos)
        const starwars = await productos[0].json()
        const consolas = await productos[1].json()
        const diversos = await productos[2].json()
        mostrarProductos(starwars, "starwars")
        mostrarProductos(consolas, "consolas")
        mostrarProductos(diversos, "diversos") 
    }
    catch(error) {
        console.log(error)
    }
}

function mostrarProductos(productos, categoria) {
    productos.forEach(producto => {
        const {id, imagen, nombre, precio} = producto;

        const div = document.createElement('div');
        div.classList.add('producto');

        div.innerHTML = `   <img class="producto__img" src="${imagen}" alt="">
                            <p class="producto__nombre">${nombre}</p>
                            <p class="producto__precio">${precio}</p>     `

        const boton = document.createElement('button');
        boton.setAttribute("data-id", id);
        boton.setAttribute("data-categoria", categoria);
        boton.classList.add('producto__ver');
        boton.onclick = verProducto
        boton.textContent = "Ver producto";

        div.appendChild(boton);

        switch (categoria) {
            case "starwars":
                contenedorStarwars.appendChild(div);
                break;
            case "consolas":
                contenedorConsolas.appendChild(div);
                break;
            case "diversos":
                contenedorDiversos.appendChild(div);
                break;
            default:
                break;
        }
  
    });
}

async function verProducto(e) {
    try {    
        let id = e.target.getAttribute("data-id");
        let categoria = e.target.getAttribute("data-categoria");

        productoServices.verProducto(id, categoria)
        .then(respuesta => respuesta.json())
        .then(datos => {
            document.querySelector(".modal__imagen").src = datos.imagen;
            document.querySelector(".modal__titulo").innerHTML = datos.nombre;
            document.querySelector(".modal__precio").innerHTML = datos.precio;
            document.querySelector(".modal__descripcion").innerHTML = datos.descripcion;
            document.querySelector("#modal").classList.add("container-modal__show");
        })
    } 
    catch (error) {
        console.log(error)
    }
}

async function agregarFiltrados(coincidencias) {

    const section = document.createElement('section');
    const div1 = document.createElement('div');
    div1.classList.add("section", "section-filtrados");


    div1.innerHTML +=   `   <div class="section-header">
                                <h2>Resultados de Búsqueda</h2>
                                <a class="section-header__todo" href="./pages/verProductos.html"><span>Ver todo</span><i class="fi fi-rr-arrow-small-right"></i></a>
                            </div>  `
                       
    const div2 = document.createElement('div');  
    div2.classList.add("contenedor-productos");
    div2.id = "contenedor-filtrados";

    console.log(coincidencias)

}








    

    








