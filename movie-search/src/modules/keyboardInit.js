import Keyboard from './keyboardClass.js';
import Button from './buttonClass.js';
import create from './create.js';
import toggleClass from './toggleClass.js';

const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
}
const search = document.getElementById('searchInput');
const btns = {};
const keyboardContainer = create('DIV', 'keyboard__container hidden', null, form.querySelector('.container'));
const keyboard = new Keyboard('en', search, btns, keyboardContainer);
// Creating buttons
btns.Backquote = new Button('Backquote', ['`', '~'], ['ё', ''], true);
btns.Digit1 = new Button('Digit1', ['1', '!'], ['1', '!'], true);
btns.Digit2 = new Button('Digit2', ['2', '@'], ['2', '"'], true);
btns.Digit3 = new Button('Digit3', ['3', '#'], ['3', '№'], true);
btns.Digit4 = new Button('Digit4', ['4', '$'], ['4', ';'], true);
btns.Digit5 = new Button('Digit5', ['5', '%'], ['5', '%'], true);
btns.Digit6 = new Button('Digit6', ['6', '^'], ['6', ':'], true);
btns.Digit7 = new Button('Digit7', ['7', '&'], ['7', '?'], true);
btns.Digit8 = new Button('Digit8', ['8', '*'], ['8', '*'], true);
btns.Digit9 = new Button('Digit9', ['9', '('], ['9', '('], true);
btns.Digit0 = new Button('Digit0', ['0', ')'], ['0', ')'], true);
btns.Minus = new Button('Minus', ['-', '_'], ['-', '_'], true);
btns.Equal = new Button('Equal', ['=', '+'], ['=', '+'], true);
btns.Backspace = new Button('Backspace', 'backspace');

btns.Tab = new Button('Tab', ['ENG', 'РУС'], ['РУС', 'ENG'], true, false);

btns.KeyQ = new Button('KeyQ', 'q', 'й', true);
btns.KeyW = new Button('KeyW', 'w', 'ц', true);
btns.KeyE = new Button('KeyE', 'e', 'у', true);
btns.KeyR = new Button('KeyR', 'r', 'к', true);
btns.KeyT = new Button('KeyT', 't', 'е', true);
btns.KeyY = new Button('KeyY', 'y', 'н', true);
btns.KeyU = new Button('KeyU', 'u', 'г', true);
btns.KeyI = new Button('KeyI', 'i', 'ш', true);
btns.KeyO = new Button('KeyO', 'o', 'щ', true);
btns.KeyP = new Button('KeyP', 'p', 'з', true);
btns.BracketLeft = new Button('BracketLeft', ['[', '{'], ['х', ''], true);
btns.BracketRight = new Button('BracketRight', [']', '}'], ['ъ', ''], true);
btns.Delete = new Button('Delete', 'delete');
btns.CapsLock = new Button('CapsLock', 'Caps', null, false, false);
btns.KeyA = new Button('KeyA', 'a', 'ф', true);
btns.KeyS = new Button('KeyS', 's', 'ы', true);
btns.KeyD = new Button('KeyD', 'd', 'в', true);
btns.KeyF = new Button('KeyF', 'f', 'а', true);
btns.KeyG = new Button('KeyG', 'g', 'п', true);
btns.KeyH = new Button('KeyH', 'h', 'р', true);
btns.KeyJ = new Button('KeyJ', 'j', 'о', true);
btns.KeyK = new Button('KeyK', 'k', 'л', true);
btns.KeyL = new Button('KeyL', 'l', 'д', true);
btns.Semicolon = new Button('Semicolon', [';', ':'], ['ж', ''], true);
btns.Quote = new Button('Quote', ['\'', '"'], ['э', ''], true);
btns.Backslash = new Button('Backslash', ['\\', '|'], ['\\', '/'], true);
btns.Enter = new Button('Enter', '\n');
btns.ShiftLeft = new Button('ShiftLeft', 'Shift', null, false, false);
btns.IntlBackslash = new Button('IntlBackslash', ['\\', '|'], ['\\', '/'], true);
btns.KeyZ = new Button('KeyZ', 'z', 'я', true);
btns.KeyX = new Button('KeyX', 'x', 'ч', true);
btns.KeyC = new Button('KeyC', 'c', 'с', true);
btns.KeyV = new Button('KeyV', 'v', 'м', true);
btns.KeyB = new Button('KeyB', 'b', 'и', true);
btns.KeyN = new Button('KeyN', 'n', 'т', true);
btns.KeyM = new Button('KeyM', 'm', 'ь', true);
btns.Comma = new Button('Comma', [',', '<'], ['б', ''], true);
btns.Period = new Button('Period', ['.', '>'], ['ю', ''], true);
btns.Slash = new Button('Slash', ['/', '?'], ['.', ','], true);
// btns.ArrowUp = new Button('ArrowUp', 'up', null, false, false);
btns.ShiftRight = new Button('ShiftRight', 'Shift', null, false, false);

btns.ControlLeft = new Button('ControlLeft', 'Ctrl', null, false, false);
// btns.OSLeft = new Button('OSLeft', 'Win', null, false, false);
btns.AltLeft = new Button('AltLeft', 'Alt', null, false, false);
btns.Space = new Button('Space', ' ');
btns.AltRight = new Button('AltRight', 'Alt', null, false, false);
btns.ControlRight = new Button('ControlRight', 'Ctrl', null, false, false);
btns.ArrowLeft = new Button('ArrowLeft', 'left', null, false, false);
// btns.ArrowDown = new Button('ArrowDown', 'down', null, false, false);
btns.ArrowRight = new Button('ArrowRight', 'right', null, false, false);
//
keyboard.updateBtnList(btns);
keyboard.updateBtnListArray().forEach((btn) => {
    btn.addToKeyboard(keyboard);
});
const keyboardSwitch = document.querySelector('.keyboard__activation ');
const blurWindow = create('div', 'background__flow hidden', null, document.body);

export function toggleKeyboard() {
    keyboard.active = !keyboard.active;
    toggleClass(keyboard.targetOfKeyboard, 'targeted');
    toggleClass(keyboard.domElement, 'hidden');
    toggleClass(keyboard.domElement, 'appear-from-top');
    toggleClass(blurWindow, 'hidden');
    toggleClass(keyboardSwitch, 'deactivate');
    keyboard.deactivateKeyboard();
}
keyboardSwitch.addEventListener('click', () => {
    toggleKeyboard();
});
blurWindow.addEventListener('click', () => {
    toggleKeyboard();
});

export default { keyboard, toggleKeyboard };
