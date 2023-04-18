import { productoServices } from '../services/productoServices.js'

export async function eliminarProducto(e) {
    try {    
        e.preventDefault()
        console.log("estoy en el eliminar")
        let id = e.target.getAttribute("data-id");
        let categoria = e.target.getAttribute("data-categoria");

        productoServices.eliminarProducto(id, categoria)
            .then(respuesta => console.log(respuesta))
        
    } 
    catch (error) {
        console.log(error)
    }
}

