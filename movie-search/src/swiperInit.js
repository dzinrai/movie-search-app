import {
    Swiper, Navigation, Pagination, Lazy,
} from 'swiper/js/swiper.esm.js';

Swiper.use([Swiper, Navigation, Pagination, Lazy]);

const mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    updateOnWindowResize: true,
    slidesPerView: 4,
    loop: false,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        dynamicMainBullets: 6,
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
export default mySwiper;
