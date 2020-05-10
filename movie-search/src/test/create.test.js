/* eslint-disable */
import create from '../modules/create.js';
import MovieSlide from '../MovieSlide.js';


describe('create', () => {
    let func1;
    beforeEach(() => {
        func1 = create;
    });
    test('create returns something', () => {
        expect(func1('a')).toBeDefined();
    });
    test('created element has attribute', () => {
        expect(func1('a', 'link', 'Link 2', document.body, ['href', 'https://www.omdbapi.com/']).getAttribute('href')).toEqual('https://www.omdbapi.com/');
        expect(func1('a', 'link', 'Link 3').classList.contains('link')).toBeTruthy();
        expect(func1('a', 'link', 'Link 4').innerHTML).toEqual('Link 4');
    });
});
describe('Movie', () => {
    let movie;
    beforeEach(() => {
        movie = new MovieSlide({Title: 'Lion King', Year: '1994', imdbID: 'tt0110357'});
    });
    test('Movie', () => {
        expect(movie.title).toEqual('Lion King');
    });
});


