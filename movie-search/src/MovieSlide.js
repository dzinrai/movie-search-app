import create from './modules/create.js';
import preloadImage from './preloadImage.js';


export default class MovieSlide {
    constructor(title, year, rate, poster, id, swiperSlide, position) {
        this.title = title;
        this.year = year;
        this.rate = rate;
        this.posterURL = poster;
        this.imdbID = id;
        this.swiperSlide = swiperSlide;
        this.position = position;
        //
        const container = create('div', 'movie-card');
        const noPoster = create('i', 'fas fa-camera');
        this.dom = {
            container,
            title: create('a', 'movie-card_title', title, container, ['href', `https://www.imdb.com/title/${id}/`], ['target', '_blank']),
            poster: create('div', 'movie-card_poster', noPoster, container),
            innerDiv: create('div', 'mini__container', null, container),
            year: create('span', 'movie-card_year', year),
            rate: create('span', 'movie-card_rate', rate),
        };
        this.dom.innerDiv.append(this.dom.year);
        this.dom.innerDiv.append(this.dom.rate);
    }

    update(rate) {
        this.rate = rate;
        this.dom.rate.innerHTML = rate;
    }

    render(target = this.dom.container) {
        this.swiperSlide.append(target);
        preloadImage(this.dom.poster, this.posterURL);
    }
}
