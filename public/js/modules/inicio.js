import productController from '/js/controllers/product.js'
class Inicio {

    
    //////////////////       CARRITO        ///////////////////////////////
    static cart = document.querySelector('.cart-button__row-select');
    static containerCart = document.querySelector('.cart-button__list tbody');
    static emptyCartBtn = document.querySelector('.cart-button__vaciar-carrito');
    static listArticles = document.querySelector('.cards-container');
    static divTotal = document.querySelector('.cart-button__total');
    static acumuladorTotal = 0;
    static articlesArray = [];

    // loadEventListeners();

    static loadEventListeners() {
        Inicio.listArticles.addEventListener('click', Inicio.addArticle);
        Inicio.cart.addEventListener('click', Inicio.removeArticle);
        Inicio.emptyCartBtn.addEventListener('click', () => {
            Inicio.cleanHTML();
            Inicio.articlesArray= [];
            Inicio.acumuladorTotal = 0;
            Inicio.divTotal.removeChild(Inicio.divTotal.lastChild)

        })
    }

    //eliminar un articulo del carrito
    static removeArticle(e){
        if(e.target.classList.contains('cart-button__delete-article')){
            const articleToClean = e.target.parentElement.parentElement;
            const precio = articleToClean.querySelector('.prop_art_3');
            const cantidad = articleToClean.querySelector('.prop_art_4');
            let precioXCantidad = parseInt(precio.textContent) * parseInt(cantidad.textContent);
            Inicio.acumuladorTotal = Inicio.acumuladorTotal - precioXCantidad;
            
            const articuloId = e.target.getAttribute('data-id');
            
            //eliminar producto del carrito por data-id
            Inicio.articlesArray = Inicio.articlesArray.filter( articulo => articulo.id !== articuloId);

            if(Inicio.divTotal.hasChildNodes())
                Inicio.divTotal.removeChild(Inicio.divTotal.lastChild)
            Inicio.cartHTML();
        }
    }

    static addArticle(e){
        console.log('bbbbbbbbbbb');
        e.preventDefault();
        if(e.target.classList.contains('card__link-buy')){
            const selectedArticle = e.target.parentElement.parentElement.parentElement;
            Inicio.readArticleData(selectedArticle);
        }
    }

    static readArticleData(articulo){
        // objeto articulo actual
        const infoArticle = {
            imagen: articulo.querySelector('img').src,
            titulo: articulo.querySelector('.card__heading').textContent,
            precio: articulo.querySelector('.card__price-final-value').value,
            id:     articulo.querySelector('a').getAttribute('data-id'),
            cantidad:1
        }
        Inicio.acumuladorTotal = parseInt(Inicio.acumuladorTotal) + parseInt(infoArticle.precio);
        // console.table(infoArticulo);

        const existe = Inicio.articlesArray.some( articulo => articulo.id === infoArticle.id )

        if(existe){
            //actualizamos cantidad
            const cantArticles = Inicio.articlesArray.map(articulo => {
                if(articulo.id === infoArticle.id){
                    articulo.cantidad++;
                    return articulo; //retorna objeto actualizado
                }else{
                    return articulo; //retorna no duplicados
                }
            })

            Inicio.articlesArray= [...cantArticles];
        }else{
            // agregar elementos al array=carrito
            Inicio.articlesArray = [...Inicio.articlesArray, infoArticle];
        }

        Inicio.cartHTML();
    }

    static cartHTML(){

        //limpiar html del carrito
        Inicio.cleanHTML();

        Inicio.articlesArray.forEach( article => {
            const { imagen, titulo, precio, cantidad } = article;
            const row = document.createElement('tr');
            const sumaTotal = document.createElement('p');
            sumaTotal.textContent = Inicio.acumuladorTotal

            row.innerHTML = 
            `
                <td class="prop_art_1"><img src='${imagen}' width='100'</td>
                <td class="prop_art_2">${titulo}</td>
                <td class="prop_art_3">${precio}</td>
                <td class="prop_art_4">${cantidad}</td>
                <td class="buttons__cards">
                    <a href='#' class='cart-button__delete-article' data-id='${article.id}'>X</a>
                </td>
            `;

            if(Inicio.divTotal.hasChildNodes()) {
                Inicio.divTotal.removeChild(Inicio.divTotal.lastChild)
            }
            Inicio.divTotal.appendChild(sumaTotal);
            //agregar el html
            Inicio.containerCart.appendChild(row);
            
        })

    }

    static cleanHTML(){
        Inicio.containerCart.innerHTML = ''; 
    }

    //////////////////       CARRUSEL       ///////////////////////////////

    static imagesCarousel = document.querySelector('.carousel-articles__images')
    static sliderPoint = document.querySelectorAll('.carousel-articles__slider-point')

    static async carrusel (){
        Inicio.sliderPoint.forEach((punto, i) => {
            Inicio.sliderPoint[i].addEventListener('click', () => {                
                let positions = i;
                let operation = positions * -50;
                console.log(operation)

                Inicio.imagesCarousel.style.transform = `translateX(${operation}%)`

                Inicio.sliderPoint.forEach((punto, i) => {
                    Inicio.sliderPoint[i].classList.remove('carousel-articles__slider-point--active')
            })

                Inicio.sliderPoint[i].classList.add('carousel-articles__slider-point--active')
            })    
        });
    }


    static async renderTemplateCards(products) {
        const hbsFile = await fetch('templates/inicio.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        document.querySelector('.cards-container').innerHTML += html;
    }


    static async init() {
        Inicio.loadEventListeners();

        const products =await productController.getProducts();
        await Inicio.renderTemplateCards(products);
        await Inicio.carrusel();
    }
};

export default Inicio;

