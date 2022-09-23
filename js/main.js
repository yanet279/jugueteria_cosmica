
/////////////////////         MAIN         //////////////////////

    let cartButtonContainer = document.querySelector('.main-header__cart-button-container');
    let hamburgerContainer = document.querySelector('.main-header__hamburger-button-container');
    // let navContainer = document.querySelector('.main.nav');

    let flag;

    // let closeNotVisible = () => cartModalContainer.innerHTML = ''

    cartButtonContainer.addEventListener('click', e => {
        const botonCarrito = e.target.parentElement;
        if(flag==0){
            console.log(1)
            flag=1;
            botonCarrito.querySelector('.cart-button__row').style.display = "none";
        }else{
            botonCarrito.querySelector('.cart-button__row').style.display = "block";
            console.log(2)
            flag=0;
        }
        
    })

    document.addEventListener('keydown', e => {
        console.log(e.key)
        const boton = document.querySelector('.cart-button__row');
        if(e.key === 'Escape'){
            boton.style.display="none";
            flag = 1;
        }
    })

    hamburgerContainer.addEventListener('click', e => {
        const topBread = document.querySelector('.hamburger-button__top-bread') 
        topBread.classList.toggle('hamburger-button__top-bread--close')
        const meat = document.querySelector('.hamburger-button__meat') 
        meat.classList.toggle('hamburger-button__meat--close')
        const bottonBread = document.querySelector('.hamburger-button__botton-bread') 
        bottonBread.classList.toggle('hamburger-button__botton-bread--close')
    })

///////////////////////    SPA    //////////////////////////////
    const getIdFromHash = () => location.hash ? location.hash.slice(1) : 'inicio';
    const getUrlFromId = id => `../templates/${id}.html`;
    const scripts = js => `/js/${js}.js`;

    const main = document.querySelector('main');
    let links = document.querySelectorAll('.main-nav__link');

    function ajaxInit(url, method = 'get') {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send();
        return xhr;
    }

    console.log(getTemplates());
    function getTemplates() {
        let id = getIdFromHash();
        const url = getUrlFromId(id);
        loadAjaxResponseToElement(url, response => {
            main.innerHTML = response;
            // console.log('Página inicial cargada');
            setActiveLink();
        });

        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();            
                const id = link.id;
                location.hash = id;
            });
        });

        window.addEventListener('hashchange', e => {
            let id = getIdFromHash();
            const url = getUrlFromId(id);
            loadAjaxResponseToElement(url, response => {

                main.innerHTML = response;
                console.log('Contenido cargado por el cambio de hash');
                setActiveLink();
            });
        });
    }
    function setActiveLink () {
        // console.warn('se recorren los links. Id actual:');
        links.forEach(link => {
            if (link.id === location.href.split('#')[1]) {
                link.classList.add('active');
                link.ariaCurrent = 'page';
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    function loadAjaxResponseToElement(url, callbackOnLoad) {
        const xhr = ajaxInit(url);
        xhr.addEventListener('load', e => {
            if (e.target.status === 200) {
                callbackOnLoad(e.target.responseText);
            }
        });
    }