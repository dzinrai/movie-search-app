import mySwiper from './swiperInit.js';

let loaded = 0;

function completeLoad() {
    loaded = 0;
    document.querySelector('.loading__spinner').classList.remove('loading');
    mySwiper.updateSlides();
}

export default async function getRating(imdbID, slide, loadmax) {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=4679477d`;
    let data = localStorage.getItem(imdbID);
    let result = {};
    let rate = 0;
    if (data) {
        data = await JSON.parse(data);
    } else {
        result = await fetch(url);
        data = await result.json();
        localStorage.setItem(imdbID, JSON.stringify(data));
    }
    loaded += 1;
    mySwiper.updateSlides();
    if (loaded === loadmax) completeLoad();
    rate = await data.imdbRating;
    return rate;
}
