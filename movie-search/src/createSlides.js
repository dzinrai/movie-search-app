import MovieSlide from './MovieSlide.js';
import mySwiper from './swiperInit.js';

export default function createSlides(data) {
    if (!Array.isArray(data.Search)) return null;
    const slides = [];
    //
    data.Search.forEach((searchedMovie) => {
        mySwiper.appendSlide('<div class="swiper-slide"></div>');
        mySwiper.updateSlides();
        const slide = new MovieSlide(
            searchedMovie.Title,
            searchedMovie.Year,
            0,
            searchedMovie.Poster,
            searchedMovie.imdbID,
            mySwiper.slides[mySwiper.slides.length - 1],
            mySwiper.slides.length - 1,
        );
        slide.render();
        slides.push(slide);
    });
    mySwiper.update();
    return slides;
}
