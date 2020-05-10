import MovieSlide from './MovieSlide.js';
import mySwiper from './swiperInit.js';
import create from './modules/create.js';

export default function createSlides(data) {
    if (!Array.isArray(data.Search)) return null;
    const slides = [];
    data.Search.forEach((searchedMovie) => {
        const newDivSlide = create('div', 'swiper-slide');
        if (mySwiper) mySwiper.appendSlide(newDivSlide);
        const slide = new MovieSlide(searchedMovie, newDivSlide);
        if (mySwiper) slide.render();
        slides.push(slide);
    });
    if (mySwiper) mySwiper.updateSlides();
    return slides;
}
