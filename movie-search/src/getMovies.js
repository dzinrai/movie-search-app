import createSlides from './createSlides.js';


export default async function getMovies(search, page = 1) {
    const url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=4679477d`;
    const key = `${search}__page${page}`;
    let data = localStorage.getItem(key);
    let result;
    if (data) {
        data = await JSON.parse(data);
    } else {
        try {
            result = await fetch(url);
            data = await result.json();
            if (data.Response === 'False') {
                // {"Response":"False","Error":"Movie not found!"}
                return data.Error;
            }
        } catch (err) {
            return data.Error;
        }
        localStorage.setItem(key, JSON.stringify(data));
    }
    const slides = createSlides(data, page);
    return slides;
}
