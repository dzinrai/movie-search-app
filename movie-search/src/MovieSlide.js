import create from './modules/create.js';
import noPoster from './img/cinema-logo.jpg';

export default class MovieSlide {
    constructor(title, year, rate, poster, id, swiperSlide, position) {
        this.title = title;
        this.year = year;
        this.rate = rate;
        this.poster = poster || noPoster;
        this.imdbID = id;
        this.swiperSlide = swiperSlide;
        this.position = position;
        //
        const container = create('div', 'movie-card');
        this.dom = {
            container,
            title: create('span', 'movie-card_title', title, container),
            poster: create('div', 'movie-card_poster', null, container, ['style', `background-image: url(${poster})`]),
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

    render() {
        this.swiperSlide.append(this.dom.container);
    }
}
