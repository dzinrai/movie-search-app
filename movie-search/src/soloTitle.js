import MovieSlide from './MovieSlide.js';
import preloadImage from './api/preloadImage.js';
import create from './modules/create.js';
import fetchAPI from './api/fetchAPI.js';

export default async function soloTitle(searchLine, target) {
    // very specific search that runs if fetchAPI for page=1 failed
    // Example search: "21" - no page searches, but movie by this title exists
    const url = `https://www.omdbapi.com/?t=${searchLine}&apikey=4679477d`;
    const movieData = await fetchAPI(url);
    if (typeof movieData === 'string') return;
    const slide = new MovieSlide(movieData);
    slide.updateDescription(movieData);
    preloadImage(slide.dom.poster, slide.posterURL);
    slide.dom.container.removeChild(slide.dom.title);
    slide.dom.innerDiv.append(slide.dom.title);
    target.append(create('span', 'alert', 'Maybe you are looking for:'));
    target.append(slide.dom.container);
}
