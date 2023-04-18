import { productoServices } from '../services/productoServices.js'
import { verProducto } from './verProductoController.js'
import { eliminarProducto } from './eliminarProductoController.js'


const contenedorProductos = document.querySelector("#contenedor-productos")
const cerrar = document.querySelector(".producto-cerrar")

document.addEventListener("DOMContentLoaded", descargarTodo)

cerrar.addEventListener("click", () => {
    document.querySelector("#modal").classList.remove("container-modal__show")
})

async function descargarTodo() {
    try {
        const productos = await productoServices.listarProductos()
        const starwars = await productos[0].value.json()
        const consolas = await productos[1].value.json()
        const diversos = await productos[2].value.json()
        mostrarProductos(starwars, "starwars")
        mostrarProductos(consolas, "consolas")
        mostrarProductos(diversos, "diversos") 
    }
    catch(error) {
        console.log(error)
    }
}

async function mostrarProductos(productos, categoria) {
    productos.forEach(producto => {
        let {id, imagen, nombre, precio, descripcion} = producto;

        if(imagen.charAt(0) == '.') {
            imagen = imagen.slice(1)
        }

        const div = document.createElement('div');
        div.classList.add('producto');

        div.innerHTML = `   <img class="producto__img" src="${imagen}" alt="">
                            <p class="producto__nombre">${nombre}</p>
                            <p class="producto__precio">${precio}</p>     `

        const botonVer = document.createElement('button');
        botonVer.setAttribute("data-id", id);
        botonVer.setAttribute("data-categoria", categoria);
        botonVer.classList.add('producto__ver');
        botonVer.onclick = verProducto
        botonVer.textContent = "Ver";

        const botonModificar = document.createElement('a');
        botonModificar.classList.add('producto__eliminar');
        botonModificar.href = `../pages/modificarProducto.html?categoria=${categoria}&id=${id}`
        botonModificar.textContent = "Modificar";

        const botonEliminar = document.createElement('a');
        botonEliminar.setAttribute("data-id", id);
        botonEliminar.setAttribute("data-categoria", categoria);
        botonEliminar.classList.add('producto__eliminar');
        botonEliminar.onclick = eliminarProducto
        botonEliminar.textContent = "Eliminar";

        div.appendChild(botonVer);
        div.appendChild(botonModificar);
        div.appendChild(botonEliminar);

        contenedorProductos.appendChild(div);
  
    });
}
