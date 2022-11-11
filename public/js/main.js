
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
    console.log(1111111111111)

    document.addEventListener('keydown', e => {
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

//////////////////////////  SPA    //////////////////////////////
const getIdFromHash = () => location.hash ? location.hash.slice(1) : 'inicio';
const getUrlFromId = id => `../templates/${id}.html`;
const scripts = js => `js/${js}.js`;
const main = document.querySelector('main');
let links = document.querySelectorAll('.main-nav__link');

async function initPromise (id) {
    try {
        let response = await fetch(getUrlFromId(id));
        if (response.ok){
            let text = await response.text();
            main.innerHTML= text;
        }
    }catch (error) {
        console.error(`ERROR: ${error.message}`);
    }
}

window.addEventListener('load', e => {

    let id = getIdFromHash();
    location.hash = id;
    initPromise(id);
    createScripts(id);
});


// window.addEventListener('hashchange', e => {
//     let id = getIdFromHash();
//     const url = getUrlFromId(id);

// })




links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();  
        const id = link.href.split('#')[1] ;
        location.hash = id;
        initPromise(id)
        // setActiveLink(id);
        createScripts(id)
    });
});

function createScripts (jsName) {
    let urlScript =  scripts(jsName);
    let name = location.hash.split('#')[1];
    let idJs = document.getElementById('inicioJs');
    let idJsAlta = document.getElementById('altaJs');
    addScript(urlScript, name);
    

}

async function addScript(url, id) {
    const scriptJs = document.createElement('script');
    scriptJs.src = url;
    scriptJs.id =  id +'Js'
    let response = await fetch(url);
    if (response.ok){
        let textJs = await response.text();
        scriptJs.innerHTML= textJs;
    }
    document.body.appendChild(scriptJs);
}
