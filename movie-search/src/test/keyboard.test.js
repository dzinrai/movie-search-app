/* eslint-disable */
import regeneratorRuntime from 'regenerator-runtime';
import Keyboard from '../modules/keyboardClass.js';

describe('keyboard methods', () => {
    const keyb = new Keyboard('en', document.createElement('input'), {}, document.createElement('div'));
    const keyb2 = new Keyboard('en', document.createElement('input'), {}, document.createElement('div'));
    test('keyboard', () => {
        expect(keyb.language).toEqual('en');
    });
    test('keyboard changeLanguage', () => {
        expect(keyb2.language).toEqual('en');
        keyb2.changeLanguage();
        expect(keyb2.language).toEqual('ru');
    });
    test('keyboard changeCase', () => {
        expect(keyb2.upCase).toEqual(false);
        keyb2.changeCase();
        expect(keyb2.upCase).toEqual(true);
    });
});
