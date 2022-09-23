window.addEventListener ('load', () => {

   //////////////////       CARRITO        ///////////////////////////////
    const cart = document.querySelector('.cart-button__row-select');
    const containerCart = document.querySelector('.cart-button__list tbody');
    let emptyCartBtn = document.querySelector('.cart-button__vaciar-carrito');
    let listArticles = document.querySelector('.cards-container');
    console.log(listArticles)
    let articlesArray = [];

    console.log(cart);
    console.log(articlesArray);

    loadEventListeners();

    function loadEventListeners() {
        listArticles.addEventListener('click', addArticle);
        console.log('listArticles:', listArticles);
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
        if(e.target.classList.contains('card__link-buy')){
            const selectedArticle = e.target.parentElement.parentElement.parentElement;
            readArticleData(selectedArticle);
        }
    }

    function readArticleData(articulo){
        // objeto articulo actual
        const infoArticle = {
            imagen: articulo.querySelector('img').src,
            titulo: articulo.querySelector('.card__heading').textContent,
            precio: articulo.querySelector('.card__price-final').textContent,
            id:     articulo.querySelector('a').getAttribute('data-id'),
            cantidad:1
        }
        //console.table(infoArticulo);

        const existe = articlesArray.some( articulo => articulo.id === infoArticle.id )

        if(existe){
            //actualizamos cantidad
            const cantArticles = articlesArray.map(articulo => {
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
            articlesArray = [...articlesArray, infoArticle];
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

        //////////////////       CARRUSEL       ///////////////////////////////

    let imagesCarousel = document.querySelector('.carousel-articles__images')
    let sliderPoint = document.querySelectorAll('.carousel-articles__slider-point')

    sliderPoint.forEach((punto, i) => {
        sliderPoint[i].addEventListener('click', () => {                
            let positions = i;
            let operation = positions * -50;

            imagesCarousel.style.transform = `translateX(${operation}%)`

            sliderPoint.forEach((punto, i) => {
                sliderPoint[i].classList.remove('carousel-articles__slider-point--active')
        })

            sliderPoint[i].classList.add('carousel-articles__slider-point--active')
        })    
    });

});