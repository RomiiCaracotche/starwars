function obtenerURL(categoria, registro) {
    let url = ""
    switch (categoria) {
        case "starwars":
            /* respuesta = await fetch(`http://localhost:4000/starwars/${id}`) */
                url = `http://localhost:4000/starwars/${registro}`;
            break;
        case "consolas":
            url = `http://localhost:4000/consolas/${registro}`;
            break;
        case "diversos":
            url = `http://localhost:4000/diversos/${registro}`;
            break;
        default:
            break;
    }
    return url;
}

const listarProductos = () => {
    return Promise.all([fetch("http://localhost:4000/starwars"), fetch("http://localhost:4000/consolas"), fetch("http://localhost:4000/diversos")]) 
}

const agregarProducto = (id, categoria, imagen, nombre, precio, descripcion) => {
    const url = obtenerURL(categoria, "");
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, imagen, nombre, precio, descripcion }),
    });
};

const eliminarProducto = (id, categoria) => {
    const url = obtenerURL(categoria, id)

    return fetch(`${url}`, {
    		method: "DELETE",
  	});
};

const modificarProducto = (id, categoria, imagen, nombre, precio, descripcion) => {
    const url = obtenerURL(categoria, id)

    return fetch(`${url}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ imagen, nombre, precio, descripcion }),
    })
};

const verProducto = (id, categoria) => {
    const url = obtenerURL(categoria, id)

    return fetch(`${url}`)
};

const buscarProducto = (palabra) => {
    const url = obtenerURL(categoria, id)

    return fetch(`${url}`)
};

export const productoServices = {
    listarProductos,
    agregarProducto,
    eliminarProducto,
    modificarProducto,
    verProducto,
    buscarProducto
};

