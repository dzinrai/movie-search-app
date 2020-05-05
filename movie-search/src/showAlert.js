import create from './modules/create.js';
import clearElement from './modules/clearElement.js';

export default function showAlert(text, el = null) {
    const alertHolder = document.querySelector('.alert__warnings');
    clearElement(alertHolder);
    let messageSpan;
    if (text && typeof text === 'string') messageSpan = create('span', 'alert', text, alertHolder);
    if (el instanceof HTMLElement) messageSpan.append(el);
    const closeBtn = create('i', 'closer far fa-times-circle', null, alertHolder);
    closeBtn.addEventListener('click', () => {
        clearElement(alertHolder);
    });
}
