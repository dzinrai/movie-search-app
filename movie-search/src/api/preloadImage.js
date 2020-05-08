import clearElement from '../modules/clearElement.js';

export default async function preloadImage(element, url) {
    // preloadImage(this.dom.poster, this.posterURL)
    const image = new Image();
    let imageURLResponse;
    console.clear();
    if (url === 'N/A') return;
    try {
        imageURLResponse = await fetch(url);
    } catch (err) {
        return;
    }
    if (imageURLResponse && imageURLResponse.ok) {
        image.src = imageURLResponse.url;
        image.addEventListener('load', () => {
            clearElement(element);
            // eslint-disable-next-line no-param-reassign
            element.style = `background-image: url(${image.src})`;
        });
    }
}
