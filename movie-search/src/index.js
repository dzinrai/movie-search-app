// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import './theme.js';
import './modules/keyboardInit.js';
import create from './modules/create.js';
import getMovies from './getMovies.js';
import getRating from './getRating.js';
import mySwiper from './swiperInit.js';
import toggleClass from './modules/toggleClass.js';
import clearElement from './modules/clearElement.js';
import getByTitle from './getByTitle.js';
import MovieSlide from './MovieSlide.js';
import readyForSearch from './readyForSearch.js';


let movieSlides = []; // [ [...page1], [...page2] ... [...pageN] ]
let pagesLoaded = 0;
const input = document.querySelector('#searchInput');
const clearInputBtn = document.querySelector('.clear-search__btn');
const searchBtn = document.querySelector('.search__btn');
const alertArea = document.querySelector('.alert__warnings');
input.value = '';
input.focus();
let searchString = 'dream';

function soloTitle(searchLine) {
    // very specific search that runs if getMovies failed
    getByTitle(searchLine).then((movie) => {
        if (typeof movie === 'string') return;
        const slide = new MovieSlide(
            movie.Title,
            movie.Year,
            movie.imdbRating,
            movie.Poster,
            movie.imdbID,
        );
        slide.dom.container.removeChild(slide.dom.title);
        slide.dom.innerDiv.append(slide.dom.title);
        clearElement(alertArea);
        alertArea.append(slide.dom.container);
    });
}
function afterLoad(error = null, updateSlider = true, page, search) {
    if (error && page === 1) {
        clearElement(alertArea);
        create('span', 'alert', `No results for "${search}"`, alertArea);
    }
    toggleClass(document.querySelector('.loading__spinner'), 'loading');
    toggleClass(clearInputBtn, 'hidden');
    if (updateSlider) mySwiper.updateSlides();
    pagesLoaded += 1;
}
function loadSearch(search, page) {
    let loaded = 0;
    if (page <= 1) {
        movieSlides = [];
        pagesLoaded = 0;
    }
    const searchLine = readyForSearch(search);
    if (!searchLine) return;
    //
    getMovies(searchLine, page).then((slides) => {
        movieSlides.push(slides);
        mySwiper.updateSlides();
        // Errors in response:
        if (!slides || slides.length === 0 || typeof slides === 'string') {
            const error = slides;
            soloTitle(searchLine);
            afterLoad(error, false, page, search);
            return;
        }
        // Response is valid
        slides.forEach((slide) => {
            getRating(slide.imdbID).then((rate) => {
                slide.update(rate);
                loaded += 1;
                if (loaded === slides.length) afterLoad(null, false);
            });
        });
    });
}
let nextPage = 1;
loadSearch('dream', nextPage); // initial load


// Event listeners:
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearElement(alertArea);
    searchString = String(input.value);
    loadSearch(searchString, 1);
});
document.addEventListener('keydown', (event) => {
    const keyCode = event.code ? event.code : event.keyCode;
    if (keyCode === 'Enter') {
        event.preventDefault();
        clearElement(alertArea);
        searchString = String(input.value);
        loadSearch(searchString, 1);
    }
});
mySwiper.on('slideChange', () => {
    if (mySwiper.activeIndex >= mySwiper.slides.length - 8 && nextPage === pagesLoaded) {
        nextPage = pagesLoaded + 1;
        loadSearch(searchString, nextPage);
    }
});
clearInputBtn.addEventListener('click', (e) => {
    e.preventDefault();
    input.value = '';
    input.focus();
});
