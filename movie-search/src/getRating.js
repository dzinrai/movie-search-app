import mySwiper from './swiperInit.js';

let loaded = 0;

function load(rate, slide) {
    slide.update(rate);
    loaded += 1;
    mySwiper.updateSlides();
}
function completeLoad() {
    loaded = 0;
    document.querySelector('.loading__spinner').classList.remove('loading');
    mySwiper.updateSlides();
}

export default function getRating(imdbID, slide, loadmax) {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=4679477d`;
    let data = localStorage.getItem(imdbID);
    if (data) {
        data = JSON.parse(data);
        load(data.imdbRating, slide);
        if (loaded === loadmax) completeLoad();
        return 1;
    }
    return fetch(url)
        .then((result) => result.json())
        .then((movieFromAPI) => {
            localStorage.setItem(imdbID, JSON.stringify(movieFromAPI));
            load(movieFromAPI.imdbRating, slide);
            console.log(loaded, movieFromAPI.imdbRating);
            if (loaded === loadmax) completeLoad();
            return 1;
        });
}
