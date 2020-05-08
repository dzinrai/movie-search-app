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
    // Responsive breakpoints
    breakpoints: {
    // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1020: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
    },
});
mySwiper.init();
export default mySwiper;
