// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import './theme.js';
import keyboard from './modules/keyboardInit.js';
import create from './modules/create.js';
import getMovies from './getMovies.js';
import mySwiper from './swiperInit.js';
import toggleClass from './toggleClass.js';

const keyboardSwitch = document.getElementsByClassName('keyboard__activation ')[0];
const blurWindow = create('div', 'background__flow hidden', null, document.body);
let inputState = false;

function toggleKeyboard() {
    inputState = !inputState;
    keyboard.active = !keyboard.active;
    toggleClass(keyboard.domElement, 'hidden');
    toggleClass(keyboard.domElement, 'appear-from-top');
    toggleClass(blurWindow, 'hidden');
}
keyboardSwitch.addEventListener('click', () => {
    toggleKeyboard();
});
blurWindow.addEventListener('click', () => {
    toggleKeyboard();
});


// http://www.omdbapi.com/?i=tt3896198&apikey=4679477d
// http://img.omdbapi.com/?i=tt3896198&apikey=4679477d
let movieSlides = []; // [ [...page1], [...page2] ... [...pageN] ]
let searchLine = 'dream';
movieSlides.push(getMovies(searchLine, 1));

const input = document.querySelector('#searchInput');
const searchBtn = document.querySelector('.search__btn');
input.focus();
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(input.value);
    mySwiper.removeAllSlides();
    movieSlides = [];
    searchLine = String(input.value);
    movieSlides.push(getMovies(searchLine, 1));
});

mySwiper.on('slideChange', () => {
    console.log('slide changed', mySwiper.activeIndex, ' total slades = ', mySwiper.slides.length);
    if (mySwiper.activeIndex === mySwiper.slides.length - 6) {
        const nextPage = [...Object.values(movieSlides)].length + 1;
        movieSlides.push(getMovies(searchLine, nextPage));
    }
});
