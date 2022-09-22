// import {carrusel} from './carrousel.js';
// const a = document.querySelector('body');

// a.addEventListener('load', carrusel());

const getIdFromHash = () => location.hash ? location.hash.slice(1) : 'inicio';
const getUrlFromId = id => `templates/${id}.html`;

const mainElement = document.querySelector('main');


let links;

function ajaxInit(url, method = 'get') {
    console.log('url 1:', url);
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send();
    return xhr;
}

const urlNavBar = getUrlFromId('nav-bar');

loadAjaxResponseToElement(urlNavBar, response => {
    document.querySelector('body > header').innerHTML = response;
    // console.log('Barra de navegación cargada');
    links = document.querySelectorAll('.main-nav__link');
    getTemplates();
})



function getTemplates() {
    let id = getIdFromHash();
    
    const url = getUrlFromId(id);

    loadAjaxResponseToElement(url, response => {
        mainElement.innerHTML = response;
        // console.log('Página inicial cargada');
        setActiveLink();
    });

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const id = e.target.href.split('#')[1];
            location.hash = id;
        });
    });

    window.addEventListener('hashchange', e => {
        console.log('from:', getIdFromHash());
        let id = getIdFromHash();
        let carousel = document.querySelector('.carousel-articles');

        // if(id === 'inicio') {
        //     id = '/inicio';
        // }
        console.log('id:', id);

        const url = getUrlFromId(id);
        loadAjaxResponseToElement(url, response => {
            mainElement.innerHTML = response;
            // console.log('Contenido cargado por el cambio de hash');
            setActiveLink();
        });

    });
}

function setActiveLink () {
    // console.warn('se recorren los links. Id actual:');
    links.forEach(link => {

        if (link.href.split('#')[1] === getIdFromHash()) {
            link.classList.add('active');
            link.ariaCurrent = 'page';
            console.log('link 1:', link)

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
