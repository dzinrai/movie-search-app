import createSlides from './createSlides.js';


export default function getMovies(search, page = 1) {
    const url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=4679477d`;
    const key = `${search}__page${page}`;
    let data = localStorage.getItem(key);
    if (data) {
        data = JSON.parse(data);
        return createSlides(data);
    }
    //
    document.querySelector('.loading__spinner').classList.add('loading');
    //
    return fetch(url)
        .then((result) => result.json())
        .then((movies) => {
            data = JSON.stringify(movies);
            localStorage.setItem(key, data);
            // {"Response":"False","Error":"Movie not found!"}
            console.log(movies);
            return createSlides(movies);
        });
}
