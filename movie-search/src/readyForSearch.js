import toggleClass from './modules/toggleClass.js';

export default function readyForSearch(search) {
    // validate search and start sppiner
    let searchLine = String(search);
    searchLine = search ? search.trim() : null;
    searchLine = search.replace(' ', '+');
    if (!search || search.length < 0) {
        return null;
    }
    toggleClass(document.querySelector('.loading__spinner'), 'loading');
    toggleClass(document.querySelector('.clear-search__btn'), 'hidden');
    return searchLine;
}
