const cart = document.querySelector('.cart-button__row');
const containerCart = document.querySelector('.cart-button__list tbody');
const emptyCartBtn = document.querySelector('.cart-button__vaciar-carrito');
const listArticles = document.querySelector('.cards-container');
let articlesArray = [];

loadEventListeners();

function loadEventListeners(){
    listArticles.addEventListener('click', addArticle);
    cart.addEventListener('click', removeArticle);
    emptyCartBtn.addEventListener('click', () => {
        articlesArray= [];
        cleanHTML();
    })
}

//eliminar un articulo del carrito
function removeArticle(e){
    if(e.target.classList.contains('cart-button__delete-article')){
        const articuloId = e.target.getAttribute('data-id');
        
        //eliminar producto del carrito por data-id
        articlesArray = articlesArray.filter( articulo => articulo.id !== articuloId);

        cartHTML();
    }
}

function addArticle(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const selectedArticle = e.target.parentElement.parentElement.parentElement;
        readArticleData(selectedArticle);
    }
}

function readArticleData(articulo){
    // objeto articulo actual
    const infoArticle = {
        imagen: articulo.querySelector('img').src ,
        titulo: articulo.querySelector('.card__heading').textContent,
        precio: articulo.querySelector('.card__price-final').textContent,
        id:     articulo.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    //console.table(infoArticulo);

    const existe = articlesArray.some( articulo => articulo.id === infoArticle.id )

    if(existe){
        //actualizamos cantidad
        const cantArticles = articlesArray.map( articulo => {
            if(articulo.id === infoArticle.id){
                articulo.cantidad++;
                return articulo; //retorna objeto actualizado
            }else{
                return articulo; //retorna no duplicados
            }
        })

        articlesArray= [...cantArticles];
    }else{

        // agregar elementos al array=carrito
        articlesArray= [...articlesArray, infoArticle];
    }

    cartHTML();
}

function cartHTML(){

    //limpiar html del carrito
    cleanHTML();

    articlesArray.forEach( article => {
        
        const { imagen, titulo, precio, cantidad } = article;
        const row = document.createElement('tr');
        row.innerHTML = 
        `
            <td ><img src='${imagen}' width='100'</td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href='#' class='cart-button__delete-article' data-id='${article.id}'>X</a></td>
        `;

        console.log(row);
        //agregar el html
        containerCart.appendChild(row);
    })

}

function cleanHTML(){
    containerCart.innerHTML = ''; 
}
