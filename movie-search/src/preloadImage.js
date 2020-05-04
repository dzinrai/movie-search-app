import clearElement from './modules/clearElement.js';

export default function preloadImage(element, url) {
    // preloadImage(this.dom.poster, this.posterURL)
    const image = new Image();
    image.src = url;
    image.addEventListener('load', () => {
        clearElement(element);
        // eslint-disable-next-line no-param-reassign
        element.style = `background-image: url(${image.src})`;
    });
}
