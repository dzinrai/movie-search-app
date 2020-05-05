// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import './theme.js';
import './modules/keyboardInit.js';
import getMovies from './getMovies.js';
import getRating from './getRating.js';
import mySwiper from './swiperInit.js';
import clearElement from './modules/clearElement.js';
import readyForSearch from './readyForSearch.js';
import showAlert from './showAlert.js';
import soloTitle from './soloTitle.js';
import create from './modules/create.js';


let movieSlides = []; // [ [...page1], [...page2] ... [...pageN] ]
let pagesLoaded = 0;
const input = document.querySelector('#searchInput');
const clearInputBtn = document.querySelector('.clear-search__btn');
const searchBtn = document.querySelector('.search__btn');
const alertArea = document.querySelector('.alert__warnings');
const loadingBar = document.querySelector('.loading__bar');
input.value = '';
input.focus();
let searchString = 'dream';

function loadbarStart(bar) {
    for (let i = 0; i < 30; i += 1) create('div', 'bar_peace', null, bar);
    bar.classList.add('start');
    bar.classList.remove('hidden');
}
function loadbarStop(bar) {
    for (let i = 0; i < 30; i += 1) clearElement(bar);
    bar.classList.remove('start');
    bar.classList.add('hidden');
}
function afterLoad(error = null, updateSlider = true, page, search) {
    if (error && page === 1) {
        showAlert(`No results for "${search.replace('+', ' ')}"`);
    }
    loadbarStop(loadingBar);
    if (updateSlider) mySwiper.updateSlides();
    pagesLoaded = page;
}

async function loadSearch(search, page) {
    let loaded = 0;
    if (page <= 1) {
        movieSlides = [];
        pagesLoaded = 0;
    }
    loadbarStart(loadingBar);
    const searchLine = await readyForSearch(search);
    if (!searchLine) {
        afterLoad(null, false, 0);
        return;
    }
    //
    getMovies(searchLine, page).then((slides) => {
        movieSlides.push(slides);
        mySwiper.updateSlides();
        // Errors in response:
        if (!slides || slides.length === 0 || typeof slides === 'string') {
            const error = slides;
            if (page === 1) soloTitle(searchLine, alertArea);
            afterLoad(error, false, page, searchLine);
            return;
        }
        // Response is valid
        slides.forEach((slide) => {
            getRating(slide.imdbID).then((rate) => {
                slide.update(rate);
                loaded += 1;
                if (loaded === slides.length) afterLoad(null, false, page);
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
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
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
