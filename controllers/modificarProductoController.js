import { productoServices } from '../services/productoServices.js'
let categoriaURL, idURL;

const btnModificar = document.querySelector("#btn-modificar")

btnModificar.addEventListener("click", (e) => {
    e.preventDefault()
    const nombre = document.querySelector("#nombre").value;
    const precio = document.querySelector("#precio").value;
    const descripcion = document.querySelector("#descripcion").value;
    const imagen = document.querySelector("#url").value;

    productoServices.modificarProducto(idURL, categoriaURL, imagen, nombre, precio, descripcion)
        .then(respuesta => respuesta.json())

    window.location = "../pages/verProductos.html"

})  

function obtenerValores() {
    const url = new URLSearchParams(window.location.search);
    categoriaURL = url.get("categoria")
    idURL = url.get("id")

    productoServices.verProducto(idURL, categoriaURL)
        .then(respuesta => respuesta.json())
        .then(datos => {
            document.querySelector("#nombre").value = datos.nombre;
            document.querySelector("#precio").value = datos.precio;
            document.querySelector("#descripcion").value = datos.descripcion;
            document.querySelector("#url").value = datos.imagen;
    })
}

obtenerValores()


 
