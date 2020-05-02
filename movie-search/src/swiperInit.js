import Swiper from 'swiper';

const mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    updateOnWindowResize: true,
    slidesPerView: 4,
    loop: false,
    fadeEffect: {
        crossFade: true,
    },
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    lazy: {
        loadPrevNext: true,
    },
});
mySwiper.init();
console.log('swiperInitialized');
export default mySwiper;
