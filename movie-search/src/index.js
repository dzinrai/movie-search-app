// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import './theme.js';
import './modules/keyboardInit.js';
import mySwiper from './swiperInit.js';
import clearElement from './modules/clearElement.js';
import readyForSearch from './readyForSearch.js';
import showAlert from './showAlert.js';
import soloTitle from './soloTitle.js';
import create from './modules/create.js';
import createSlides from './createSlides.js';
import fetchAPI from './api/fetchAPI.js';


let movieSlides = []; // [ [...page1], [...page2] ... [...pageN] ]
let nextPage = 0;
const input = document.querySelector('#searchInput');
const clearInputBtn = document.querySelector('.clear-search__btn');
const searchBtn = document.querySelector('.search__btn');
const alertArea = document.querySelector('.alert__warnings');
const loadingBar = document.querySelector('.loading__bar');
input.value = '';
input.focus();

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
let searchString = 'batman';

async function loadSearch(search, page) {
    console.log(`loadSearch(${search}, ${page})`);
    let loaded = 0;
    let url = '';
    if (page === 1) {
        movieSlides = [];
        nextPage = 1;
    }
    loadbarStart(loadingBar);
    const searchLine = await readyForSearch(search);
    if (!searchLine || (typeof searchLine === 'object' && searchLine.code)) {
        afterLoad(null, false, 0);
        return;
    }
    //
    const key = `${searchLine}__page${page}`;
    url = `https://www.omdbapi.com/?s=${searchLine}&page=${page}&apikey=4679477d`;
    const data = await fetchAPI(url, key);
    // Errors in response:
    if (!data || data.length === 0 || typeof data === 'string') {
        const error = data;
        if (page === 1) soloTitle(searchLine, alertArea);
        afterLoad(error, false, page, searchLine);
        return;
    }
    if (page === 1) mySwiper.removeAllSlides();
    const slides = createSlides(data, page);
    nextPage = page + 1;
    movieSlides.push(slides);
    slides.forEach(async (slide) => {
        const { imdbID } = slide;
        url = `https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=4679477d`;
        const movieData = await fetchAPI(url, imdbID);
        if (movieData) {
            slide.updateDescription(movieData);
            loaded += 1;
            if (loaded === slides.length) afterLoad(null, false, page);
        } else if (typeof movieData === 'string') {
            const error = movieData;
            afterLoad(error, false);
        }
    });
}

loadSearch(searchString, 1); // initial load


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
    if (mySwiper.slides.length === 0) {
        loadSearch(searchString, 1);
        return;
    }
    if (movieSlides.length < 1) return;
    let loadedSlides = 0;
    movieSlides.forEach((pageOfSlides) => {
        if (pageOfSlides) loadedSlides += pageOfSlides.length;
    });
    if (mySwiper.activeIndex >= loadedSlides - 8 && movieSlides.slice(-1)[0].length === 10) {
        loadSearch(searchString, nextPage);
    }
});

clearInputBtn.addEventListener('click', (e) => {
    e.preventDefault();
    input.value = '';
    input.focus();
});
