let cartButtonContainer = document.querySelector('.main-header__cart-button-container')
let inputCreated = false
let cartModalContainer = document.querySelectorAll('div')[0]
let container = document.querySelector('.sections-carousel')
let hamburgerContainer = document.querySelector('.main-header__hamburger-button-container')
let navContainer = document.querySelector('.main.nav')

let closeNotVisible = () => cartModalContainer.innerHTML = ''

cartButtonContainer.addEventListener('click', e => {
    const modal = cartModalContainer.classList.toggle('cart-modal-container')
    if(modal) {
        const imageHtml = `<img src="/img/iconos/Windows_Close_Program_22531.png" alt="close">`
        cartModalContainer.innerHTML = imageHtml
        cartModalContainer.addEventListener('click', e => {
            if (e.target.tagName === 'IMG') {
                cartModalContainer.classList.remove('cart-modal-container')
                cartButtonContainer.classList.remove('main-header__cart-button-container--press')
                closeNotVisible()
            }
        })
    }else {
        closeNotVisible()
    }
    e.target.classList.toggle('main-header__cart-button-container--press')
})

document.addEventListener('keydown', e => {
    console.log(e.key)
    if(e.key === 'Escape'){
        closeNotVisible()
        console.log('Cerrar modal.')
        cartModalContainer.classList.remove('cart-modal-container')
        cartButtonContainer.classList.remove('main-header__cart-button-container--press')
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