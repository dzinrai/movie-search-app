import showAlert from './showAlert.js';
import create from './modules/create.js';

function urlFor(word) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200505T183703Z.5aa275d74e3af395.0285e5924cb39c653874330f01c706ea8732f95f&text=${word}&lang=ru-en`;
    return url;
}
async function getTranslate(str) {
    const result = await fetch(urlFor(str));
    let translation = await result.json();
    if (translation.text && translation.text.length) [translation] = translation.text;
    return translation;
    // Powered by Yandex.Translate
}

export default async function readyForSearch(search) {
    // validate search and start sppiner
    if (!search || search.length < 0) {
        return null;
    }
    //
    let searchLine = String(search);
    searchLine = search ? search.trim() : null;
    if (/[а-яА-Я]+/g.test(searchLine)) {
        searchLine = await getTranslate(searchLine);
        const yandexLink = create('a', 'extarnal__link fas fa-external-link-alt', null, null, ['href', 'http://translate.yandex.com'], ['target', '_blank']);
        showAlert(`Showing results for "${searchLine}". Powered by Yandex.Translate `, yandexLink);
    }
    searchLine = searchLine ? searchLine.replace(' ', '+') : null;
    return searchLine;
}
