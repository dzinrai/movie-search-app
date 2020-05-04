import getByTitle from './getByTitle.js';
import MovieSlide from './MovieSlide.js';
import clearElement from './modules/clearElement.js';
import preloadImage from './preloadImage.js';
import create from './modules/create.js';

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
        preloadImage(slide.dom.poster, slide.posterURL);
        target.append(slide.dom.container);
        const closeBtn = create('i', 'closer far fa-times-circle', null, slide.dom.container);
        closeBtn.addEventListener('click', () => {
            const alertArea = document.querySelector('.alert__warnings');
            alertArea.removeChild(slide.dom.container);
        });
    });
}
