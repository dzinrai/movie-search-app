import mySwiper from './swiperInit.js';

let loaded = 0;

export default function getRating(imdbID, slide, loadmax) {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=4679477d`;
    let data = localStorage.getItem(imdbID);
    if (data) {
        data = JSON.parse(data);
        slide.update(data.imdbRating);
        mySwiper.updateSlides();
        loaded += 1;
        if (loaded === loadmax) {
            loaded = 0;
            document.querySelector('.loading__spinner').classList.remove('loading');
        }
        return 1;
    }
    return fetch(url)
        .then((result) => result.json())
        .then((movieFromAPI) => {
            localStorage.setItem(imdbID, JSON.stringify(movieFromAPI));
            slide.update(movieFromAPI.imdbRating);
            mySwiper.updateSlides();
            loaded += 1;
            console.log(loaded, movieFromAPI.imdbRating);
            if (loaded === loadmax) {
                loaded = 0;
                document.querySelector('.loading__spinner').classList.remove('loading');
            }
            return 1;
        });
}
