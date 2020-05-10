// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import './theme.js';
import mySwiper from './swiperInit.js';
import clearElement from './modules/clearElement.js';
import readyForSearch from './readyForSearch.js';
import showAlert from './showAlert.js';
import soloTitle from './soloTitle.js';
import create from './modules/create.js';
import createSlides from './createSlides.js';
import fetchAPI from './api/fetchAPI.js';
import keyboardInited, { toggleKeyboard } from './modules/keyboardInit.js';

let movieSlides = []; // [ [...page1], [...page2] ... [...pageN] ]
let nextPage = 0;
const input = document.querySelector('#searchInput');
const clearInputBtn = document.querySelector('.clear-search__btn');
const searchBtn = document.querySelector('.search__btn');
const alertArea = document.querySelector('.alert__warnings');
const loadingBar = document.querySelector('.loading__bar');
input.value = '';
input.focus();
let searchString = 'batman';

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

function afterSearch(error = null, updateSlider = true, page, search) {
    loadbarStop(loadingBar);
    if (error === 'Request limit reached!') {
        showAlert('Sorry, we have reached today\'s limit of API');
        return;
    }
    if (error && page === 1 && search) {
        showAlert(`No results for "${search.replace('+', ' ')}"`);
    }
    if (updateSlider) mySwiper.updateSlides();
}

function setUrl(params) {
    let url;
    if (params.searchLine && params.page) url = `https://www.omdbapi.com/?s=${params.searchLine}&page=${params.page}&apikey=4679477d`;
    if (params.imdbID) url = `https://www.omdbapi.com/?i=${params.imdbID}&plot=full&apikey=4679477d`;
    return url;
}

function updateSlides(slides) {
    let updated = 0;
    movieSlides.push(slides);
    slides.forEach(async (slide) => {
        const { imdbID } = slide;
        const urlId = setUrl({ imdbID });
        const movieData = await fetchAPI(urlId, imdbID);
        if (movieData) {
            slide.updateDescription(movieData);
            updated += 1;
            if (updated === slides.length) afterSearch(null, false);
        } else if (typeof movieData === 'string') {
            const error = movieData;
            afterSearch(error, false);
        }
    });
}

async function pageSearch(search, page) {
    if (page === 1) {
        movieSlides = [];
        nextPage = 1;
    }
    loadbarStart(loadingBar);
    const searchLine = await readyForSearch(search);
    if (!searchLine || (typeof searchLine === 'object' && searchLine.code)) {
        afterSearch(null, false, 0);
        return;
    }
    const key = `${searchLine}__page${page}`;
    const urlPage = setUrl({ searchLine, page });
    const data = await fetchAPI(urlPage, key);
    if (!data || data.length === 0 || typeof data === 'string') {
        const error = data;
        if (page === 1) soloTitle(searchLine, alertArea);
        afterSearch(error, false, page, searchLine);
        return;
    }
    if (page === 1) mySwiper.removeAllSlides();
    const slides = createSlides(data);
    nextPage = page + 1;
    updateSlides(slides);
}

pageSearch(searchString, 1); // initial search

// Event listeners:
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (keyboardInited.keyboard.active) toggleKeyboard();
    clearElement(alertArea);
    searchString = String(input.value);
    pageSearch(searchString, 1);
});
document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        if (keyboardInited.keyboard.active) toggleKeyboard();
        clearElement(alertArea);
        searchString = String(input.value);
        pageSearch(searchString, 1);
    }
});
mySwiper.on('slideChange', () => {
    if (mySwiper.slides.length === 0) {
        pageSearch(searchString, 1);
        return;
    }
    if (movieSlides.length < 1) return;
    let loadedSlides = 0;
    movieSlides.forEach((pageOfSlides) => {
        if (pageOfSlides) loadedSlides += pageOfSlides.length;
    });
    if (mySwiper.activeIndex >= loadedSlides - 8 && movieSlides.slice(-1)[0].length === 10) {
        pageSearch(searchString, nextPage);
    }
});
clearInputBtn.addEventListener('click', (e) => {
    e.preventDefault();
    input.value = '';
    input.focus();
});
