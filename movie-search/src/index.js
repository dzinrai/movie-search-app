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


// http://www.omdbapi.com/?i=tt3896198&apikey=4679477d
// http://img.omdbapi.com/?i=tt3896198&apikey=4679477d
let movieSlides = []; // [ [...page1], [...page2] ... [...pageN] ]
const input = document.querySelector('#searchInput');
const clearInputBtn = document.querySelector('.clear-search__btn');
const searchBtn = document.querySelector('.search__btn');
const alertArea = document.querySelector('.alert__warnings');
input.value = '';
input.focus();
let searchString = 'dream';
//
function getReadyForLoad(search, page) {
    // validate search and start sppiner
    if (page <= 1) movieSlides = [];
    toggleClass(document.querySelector('.loading__spinner'), 'loading');
    toggleClass(document.querySelector('.clear-search__btn'), 'hidden');
    let searchLine = search ? search.trim() : null;
    searchLine = search.replace(' ', '+');
    if (!search || search.length < 0) {
        input.value = '';
        return null;
    }
    return searchLine;
}
function completeLoad(error = null, updateSlider = true, page, search) {
    if (error && page === 1) {
        clearElement(alertArea);
        create('span', 'alert', `No results for "${search}"`, alertArea);
    }
    toggleClass(document.querySelector('.loading__spinner'), 'loading');
    toggleClass(clearInputBtn, 'hidden');
    if (updateSlider) mySwiper.updateSlides();
}
function loadSearch(search, page) {
    let loaded = 0;
    const searchLine = getReadyForLoad(search, page);
    if (!searchLine) return;
    getMovies(searchLine, page).then((slides) => {
        movieSlides.push(slides);
        mySwiper.updateSlides();
        // Errors in response:
        if (!slides || slides.length === 0 || typeof slides === 'string') {
            const error = slides;
            completeLoad(error, false, page, search);
            return;
        }
        // Response is valid
        slides.forEach((slide) => {
            getRating(slide.imdbID).then((rate) => {
                slide.update(rate);
                loaded += 1;
                if (loaded === slides.length) completeLoad(null, false);
            });
        });
    });
}
loadSearch('dream', 1); // initial load
//
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
//
mySwiper.on('slideChange', () => {
    console.log('slide changed', mySwiper.activeIndex, ' total slades = ', mySwiper.slides.length);
    if (mySwiper.activeIndex === mySwiper.slides.length - 8) {
        const nextPage = [...Object.values(movieSlides)].length + 1;
        loadSearch(searchString, nextPage);
    }
});
//
clearInputBtn.addEventListener('click', (e) => {
    e.preventDefault();
    input.value = '';
    input.focus();
});
