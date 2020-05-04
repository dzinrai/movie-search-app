export default function clearElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
    return el;
}
