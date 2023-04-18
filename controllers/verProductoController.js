import { productoServices } from '../services/productoServices.js'

export function verProducto(e) {
    try {    
        let id = e.target.getAttribute("data-id");
        let categoria = e.target.getAttribute("data-categoria");

        productoServices.verProducto(id, categoria)
        .then(respuesta => respuesta.json())
        .then(datos => mostrarProducto(datos))

    } 
    catch (error) {
        console.log(error)
    }
}

function mostrarProducto({ imagen, nombre, precio, descripcion }) {
    if(imagen.charAt(0) == '.') {
        imagen = ".".concat(imagen)
    }
    document.querySelector(".modal__imagen").src = imagen;
    document.querySelector(".modal__titulo").innerHTML = nombre;
    document.querySelector(".modal__precio").innerHTML = precio;
    document.querySelector(".modal__descripcion").innerHTML = descripcion;
    document.querySelector("#modal").classList.add("container-modal__show");
}