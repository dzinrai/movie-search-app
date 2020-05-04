import getByTitle from './getByTitle.js';
import MovieSlide from './MovieSlide.js';
import clearElement from './modules/clearElement.js';

export default function soloTitle(searchLine, target) {
    // very specific search that runs if getMovies failed
    // Example search: "21" - no page searches, but movie by this title exists
    getByTitle(searchLine).then((movie) => {
        if (typeof movie === 'string') return;
        const slide = new MovieSlide(
            movie.Title,
            movie.Year,
            movie.imdbRating,
            movie.Poster,
            movie.imdbID,
        );
        slide.dom.container.removeChild(slide.dom.title);
        slide.dom.innerDiv.append(slide.dom.title);
        clearElement(target);
        target.append(slide.dom.container);
    });
}
