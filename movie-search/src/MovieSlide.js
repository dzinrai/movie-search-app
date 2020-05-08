import create from './modules/create.js';
import preloadImage from './api/preloadImage.js';
import toggleClass from './modules/toggleClass.js';


export default class MovieSlide {
    constructor(slideInfo, swiperSlide) {
        this.title = slideInfo.Title;
        this.year = slideInfo.Year;
        this.rate = 0;
        this.posterURL = slideInfo.Poster;
        this.imdbID = slideInfo.imdbID;
        this.swiperSlide = swiperSlide;
        // dom
        const container = create('div', 'movie-card');
        const noPoster = create('i', 'fas fa-camera');
        this.dom = {
            container,
            title: create('a', 'movie-card_title', this.title, container, ['href', `https://www.imdb.com/title/${this.imdbID}/videogallery/`], ['target', '_blank']),
            poster: create('div', 'movie-card_poster', noPoster, container),
            innerDiv: create('div', 'mini__container', null, container),
            year: create('span', 'movie-card_year', this.year),
            rate: create('span', 'movie-card_rate', this.rate),
            description: create('div', 'movie-card_description hidden', null, container),
            descriptionBtn: create('span', 'description btn hidden', '<i class="fas fa-info-circle"></i>', container),
        };
        this.dom.innerDiv.append(this.dom.year);
        this.dom.innerDiv.append(this.dom.rate);
        const descriptionIncludes = ['Runtime', 'Genre', 'Director', 'Released', 'Rated', 'Actors', 'Plot'];
        descriptionIncludes.forEach((key) => {
            this.dom[key] = create('span', `movie-card_${key.toLowerCase()}`, 'N/A', this.dom.description);
        });
    }

    updateDescription(data) {
        const update = ['Runtime', 'Genre', 'Director', 'Released', 'Rated', 'Actors', 'Plot'];
        [...Object.keys(data)].forEach((key) => {
            if (update.includes(key) && data[key]) {
                this[key] = data[key];
                const value = data[key];
                const text = `<span class="movie-card_key">${key.slice(0, 1).toUpperCase() + key.slice(1)}:</span> ${value}`;
                this.dom[key].innerHTML = text;
            }
        });
        // imdbRating
        this.rate = data.imdbRating;
        this.dom.rate.innerHTML = data.imdbRating;
    }

    render() {
        const {
            container, poster, descriptionBtn, description,
        } = this.dom;
        this.swiperSlide.append(container);
        preloadImage(poster, this.posterURL);
        container.addEventListener('mouseenter', () => {
            descriptionBtn.classList.remove('hidden');
        });
        container.addEventListener('mouseleave', () => {
            descriptionBtn.classList.add('hidden');
            description.classList.add('hidden');
        });
        descriptionBtn.addEventListener('click', () => {
            descriptionBtn.classList.add('hidden');
            toggleClass(description, 'hidden');
        });
    }
}
