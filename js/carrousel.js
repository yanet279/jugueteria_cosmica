// export const carro = () => {
window.addEventListener('load', ()=> {

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
// }