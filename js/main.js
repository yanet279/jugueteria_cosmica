window.addEventListener('load', ()=> {
    let cartButtonContainer = document.querySelector('.main-header__cart-button-container');
    // let inputCreated = false;
    // let cartModalContainer = document.querySelectorAll('div')[0];
    // let container = document.querySelector('.sections-carousel');
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

})