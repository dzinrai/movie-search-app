import {
    Swiper, Navigation, Pagination, Lazy,
} from 'swiper/js/swiper.esm.js';

Swiper.use([Swiper, Navigation, Pagination, Lazy]);

const mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 1,
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
        1020: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        800: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        700: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        600: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 40,
        },
        1: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        // when window width is >= 320px
    },
});
mySwiper.init();
export default mySwiper;
