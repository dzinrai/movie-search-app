/* eslint-disable */
import createSlides from './createSlides.js';

describe('createSlides', () => {
    let func1;
    const data = { Search: [{
            Title:"Batman Begins", 
            Year:"2005", 
            imdbID:"tt0372784", 
            Poster:"https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
        }],
    };
    beforeEach(() => {
        func1 = createSlides();
    });
    test('func 1', () => {
        expect(func1).toBeInstanceOf(Array);
    });
});
