import create from './modules/create.js';
import preloadImage from './preloadImage.js';
import toggleClass from './modules/toggleClass.js';


export default class MovieSlide {
    constructor(title, year, rate, poster, id, swiperSlide, position) {
        this.title = title;
        this.year = year;
        this.rate = rate;
        this.posterURL = poster;
        this.imdbID = id;
        this.swiperSlide = swiperSlide;
        this.position = position;
        // dom
        const container = create('div', 'movie-card');
        const noPoster = create('i', 'fas fa-camera');
        this.dom = {
            container,
            title: create('a', 'movie-card_title', title, container, ['href', `https://www.imdb.com/title/${id}/videogallery/`], ['target', '_blank']),
            poster: create('div', 'movie-card_poster', noPoster, container),
            innerDiv: create('div', 'mini__container', null, container),
            year: create('span', 'movie-card_year', year),
            rate: create('span', 'movie-card_rate', rate),
            description: create('div', 'movie-card_description hidden', null, container),
            descriptionBtn: create('span', 'description btn hidden', '<i class="fas fa-info-circle"></i>', container),
        };
        this.dom.innerDiv.append(this.dom.year);
        this.dom.innerDiv.append(this.dom.rate);
        this.createDescription();
    }

    createDescription() {
        const { description } = this.dom;
        this.dom.runtime = create('span', 'movie-card_runtime', 'N/A', description);
        this.dom.genre = create('span', 'movie-card_genre', 'N/A', description);
        this.dom.director = create('span', 'movie-card_director', 'N/A', description);
        this.dom.released = create('span', 'movie-card_released', 'N/A', description);
        this.dom.rated = create('span', 'movie-card_rated', 'N/A', description);
        this.dom.actors = create('span', 'movie-card_actors', 'N/A', description);
        this.dom.plot = create('span', 'movie-card_plot', 'N/A', description);
    }

    update(rate) {
        this.rate = rate;
        this.dom.rate.innerHTML = rate;
    }

    updateDescription(description) {
        [...Object.keys(description)].forEach((key) => {
            this[key] = description[key];
            const value = description[key];
            const text = `<span class="movie-card_key">${key.slice(0, 1).toUpperCase() + key.slice(1)}:</span> ${value}`;
            if (description[key]) {
                this.dom[key].innerHTML = text;
            }
        });
    }

    render(target = this.dom.container) {
        const {
            container, poster, descriptionBtn, description,
        } = this.dom;
        this.swiperSlide.append(target);
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
