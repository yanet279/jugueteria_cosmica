const carrito = document.getElementById('carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const listaArticulos = document.querySelector('.cards-container');
let articulosArray = [];

cargarEventListeners();

function cargarEventListeners(){
    listaArticulos.addEventListener('click', agregarArticulo);
    carrito.addEventListener('click', eliminarArticulo);
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosArray = [];
        limpiarHTML();
    })
}

//eliminar un articulo del carrito
function eliminarArticulo(e){
    if(e.target.classList.contains('borrar-articulo')){
        const articuloId = e.target.getAttribute('data-id');
        
        //eliminar producto del carrito por data-id
        articulosArray = articulosArray.filter( articulo => articulo.id !== articuloId);

        carritoHTML();
    }
}

function agregarArticulo(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const articuloSeleccionado = e.target.parentElement.parentElement.parentElement;
        leerDatosArticulos(articuloSeleccionado);
    }
}

function leerDatosArticulos(articulo){
    // objeto articulo actual
    const infoArticulo = {
        imagen: articulo.querySelector('img').src ,
        titulo: articulo.querySelector('.card__heading').textContent,
        precio: articulo.querySelector('.card__price-final').textContent,
        id:     articulo.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    //console.table(infoArticulo);

    const existe = articulosArray.some( articulo => articulo.id === infoArticulo.id )

    if(existe){
        //actualizamos cantidad
        const articulos = articulosArray.map( articulo => {
            if(articulo.id === infoArticulo.id){
                articulo.cantidad++;
                return articulo; //retorna objeto actualizado
            }else{
                return articulo; //retorna no duplicados
            }
        })

        articulosArray = [...articulos];
    }else{

        // agregar elementos al array=carrito
        articulosArray = [...articulosArray, infoArticulo];
    }

    carritoHTML();
}

function carritoHTML(){

    //limpiar html del carrito
    limpiarHTML();

    articulosArray.forEach( articulo => {
        
        const { imagen, titulo, precio, cantidad } = articulo;
        const row = document.createElement('tr');
        row.innerHTML = 
        `
            <td ><img src='${imagen}' width='100'</td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href='#' class='borrar-articulo' data-id='${articulo.id}'>X</a></td>
        `;
        //agregar el html
        contenedorCarrito.appendChild(row);
    })

}

function limpiarHTML(){
    contenedorCarrito.innerHTML = ''; 
}
