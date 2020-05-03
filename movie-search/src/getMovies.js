import createSlides from './createSlides.js';


export default async function getMovies(search, page = 1) {
    const url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=4679477d`;
    const key = `${search}__page${page}`;
    let data = localStorage.getItem(key);
    if (data) {
        data = await JSON.parse(data);
        return createSlides(data);
    }
    //
    document.querySelector('.loading__spinner').classList.add('loading');
    //
    const result = await fetch(url);
    const movies = await result.json();
    data = await JSON.stringify(movies);
    localStorage.setItem(key, data);
    return createSlides(movies);
    // {"Response":"False","Error":"Movie not found!"}
}
