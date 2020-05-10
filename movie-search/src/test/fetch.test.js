/* eslint-disable */
import regeneratorRuntime from 'regenerator-runtime';
import preloadImage from '../api/preloadImage.js';
import fetchAPI from '../api/fetchAPI.js';

describe('fetchAPI methods', () => {
    test('preloader', () => {
        expect(preloadImage(null, 'N/A')).toBeDefined();
    });
    test('fetchAPI', async () => {
        const data = await fetchAPI('https://www.omdbapi.com/?i=tt0312528&plot=full&apikey=4679477d');
        expect(data).toEqual('Error');
    });
});

