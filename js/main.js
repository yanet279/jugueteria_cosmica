let cartButtonContainer = document.querySelector('.main-header__cart-button-container');
let inputCreated = false;
let cartModalContainer = document.querySelectorAll('div')[0];
let container = document.querySelector('.sections-carousel');
let hamburgerContainer = document.querySelector('.main-header__hamburger-button-container');
let navContainer = document.querySelector('.main.nav');

let flag;

// let closeNotVisible = () => cartModalContainer.innerHTML = ''

cartButtonContainer.addEventListener('click', e => {
    const botonCarrito = e.target.parentElement;
    
    if(flag==0){
        botonCarrito.querySelector('#carrito').style.display="block";
        flag=1;
    }else{
        botonCarrito.querySelector('#carrito').style.display="none";
        flag=0;
    }
    
})

document.addEventListener('keydown', e => {
    console.log(e.key)
    const boton = document.querySelector('#carrito');
    if(e.key === 'Escape'){
        boton.style.display="none";
        flag=0;
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