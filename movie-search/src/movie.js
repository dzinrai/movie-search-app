import create from './create.js';
import noPoster from './img/cinema-logo.jpg';

export default class Movie {
    constructor(title, year, rate, poster) {
        this.title = title;
        this.year = year;
        this.rate = rate;
        this.poster = poster || noPoster;
        //
        this.container = create('div', 'movie-card');
        this.nameContainer = create('span', 'movie-card_title', this.title, this.container);
        this.posterContainer = create('img', 'movie-card_poster', null, this.container, ['src', this.poster]);
        this.rateContainer = create('span', 'movie-card_rate', this.rate, this.container);
        this.yearContainer = create('span', 'movie-card_year', this.year, this.container);
    }

    update(rate) {
        this.rate = rate;
        this.rateContainer.innerHTML = this.rate;
    }

    render(target) {
        target.append(this.container);
    }
}
