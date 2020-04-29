// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import Swiper from 'swiper';
import Movie from './movie.js';

const mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    updateOnWindowResize: true,
    slidesPerView: 4,
    loop: false,
    autoHeight: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
        snapOnRelease: true,
    },
    lazy: {
        loadPrevNext: true,
    },
});
mySwiper.init();
document.getElementById('bt').addEventListener('click', () => {

});
// http://www.omdbapi.com/?i=tt3896198&apikey=4679477d
// http://img.omdbapi.com/?i=tt3896198&apikey=4679477d
const movies = [];

async function getMovieRating(imdbID, movie, index) {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=4679477d`;
    const g = localStorage.getItem(imdbID);
    if (g) {
        const data = JSON.parse(g);
        movie.update(data.imdbRating);
        mySwiper.update();
        return null;
    }
    return fetch(url)
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem(imdbID, JSON.stringify(data));
            if (movie) {
                console.log('movie=', movie, 'rate=', data.imdbRating, data);
                movie.update(data.imdbRating);
            } else console.log(data);
            mySwiper.update();
        });
}
function createSlides(data) {
    data.Search.slice(0, 4).forEach((searchedMovie, index) => {
        mySwiper.addSlide(index, '<div class="swiper-slide"></div>');
        mySwiper.update();
        const movie = new Movie(searchedMovie.Title, searchedMovie.Year, null, searchedMovie.Poster);
        getMovieRating(searchedMovie.imdbID, movie, index);
        movie.render(mySwiper.slides[index]);
        movies.push(movie);
    });
    mySwiper.update();
    console.log(data);
}
function getMovieTitle(search, page) {
    const url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=4679477d`;
    const g = localStorage.getItem(search);
    if (g) {
        const data = JSON.parse(g);
        createSlides(data);
        return null;
    }
    return fetch(url)
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem(search, JSON.stringify(data));
            createSlides(data);
        });
}

getMovieTitle('dream', 1);
