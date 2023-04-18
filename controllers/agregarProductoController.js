import { productoServices } from '../services/productoServices.js'

const form = document.querySelector("[data-form]")

form.addEventListener("submit", agregarProducto)

function agregarProducto(e) {
    e.preventDefault()
    const categoria = document.querySelector("[form-select]").value;
    const imagen = document.querySelector("[form-url]").value;
    const nombre = document.querySelector("[form-nombre]").value;
    const precio = document.querySelector("[form-precio]").value;
    const descripcion = document.querySelector("[form-descripcion]").value;

    //Valido el producto
    const existeAlerta = document.querySelector(".alerta");
    if(imagen == "" || nombre == "" || precio == "" || descripcion == ""){
        if(!existeAlerta) {
           const alerta = document.createElement('div');
            alerta.innerHTML = `<p class="alerta">Debe completar todos los campos!!!</p>`
            form.insertBefore(alerta, form.children[form.children.length-1]);
            setTimeout(() => {
                alerta.remove()
            }, 3000)
        }
    }
    else {
        //Creo el producto
        productoServices.agregarProducto(uuid.v4(), categoria, imagen, nombre, precio, descripcion)
        .then(() => {window.location.href = "../pages/verProductos.html";})
        .catch((error) => console.log(error));
    }
}

