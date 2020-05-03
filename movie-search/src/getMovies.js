import createSlides from './createSlides.js';


export default async function getMovies(search, page = 1) {
    const url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=4679477d`;
    const key = `${search}__page${page}`;
    let data = localStorage.getItem(key);
    if (data) {
        data = await JSON.parse(data);
        const slides = await createSlides(data);
        return slides;
    }
    const result = await fetch(url);
    const movies = await result.json();
    localStorage.setItem(key, JSON.stringify(movies));
    const slides = await createSlides(movies);
    return slides;
    // {"Response":"False","Error":"Movie not found!"}
}
