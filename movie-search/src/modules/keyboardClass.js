import createDomElement from './createDomElement.js';

class Keyboard {
    constructor(lang, target, buttonList, container) {
        this.language = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : lang;
        this.languageAlter = this.language === 'en' ? 'ru' : 'en';
        this.btnList = buttonList;
        this.domElement = container;
        this.upCase = false;
        this.keyboardRows = [];
        this.active = false;
        for (let row = 0; row <= 4; row += 1) {
            this.keyboardRows[row] = createDomElement('DIV', null, 'keyboard__row', this.domElement);
        }
        this.targetOfKeyboard = target;
        document.addEventListener('keydown', (event) => {
            if (!this.active) return;
            this.targetOfKeyboard.focus();
            const keyCode = event.code ? event.code : event.keyCode;
            if (!this.btnList[keyCode]) return;
            if ((keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') && !this.btnList[keyCode].pressed) {
                this.changeCase();
            }
            this.btnList[keyCode].pressed = true;
            if (this.btnList[keyCode].inputTypeValue) {
                event.preventDefault();
                let value;
                if (this.btnList[keyCode].multiLang) {
                    value = this.language === 'en' ? this.btnList[keyCode].value : this.btnList[keyCode].altValue;
                } else value = this.btnList[keyCode].value;
                let secondValue;
                if (Array.isArray(value)) [value, secondValue] = value;
                //
                const shifted = this.btnList.ShiftLeft.pressed || this.btnList.ShiftRight.pressed;
                if (shifted && secondValue) {
                    this.targetOfKeyboard.value = this.valueApp(secondValue);
                } else this.targetOfKeyboard.value = this.valueApp(value);
            } else if (this.btnList[keyCode].name === 'CapsLock') {
                this.changeCase();
            }
            this.targetOfKeyboard.focus();
            this.targetOfKeyboard.selectionStart = this.posIn;
            this.targetOfKeyboard.selectionEnd = this.posIn;
            if (!this.btnList[keyCode].locked) this.btnList[keyCode].addClass('active');
        });
        // language change:
        document.addEventListener('keydown', () => {
            if (this.btnList.ControlLeft.pressed || this.btnList.ControlRight.pressed) {
                if (this.btnList.AltLeft.pressed || this.btnList.AltLeft.pressed) {
                    this.changeLanguage();
                }
            } else if (this.btnList.Tab.pressed) this.changeLanguage();
        });
        // mouse controls
        this.domElement.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
        this.domElement.addEventListener('mousedown', (event) => {
            let keyCode = null;
            if (event.target.tagName === 'BUTTON') keyCode = event.target.id;
            else if (event.target.tagName === 'SPAN') keyCode = event.target.parentElement.id;
            else return;
            if (keyCode === 'ArrowLeft' || keyCode === 'ArrowRight' || keyCode === 'ArrowUp' || keyCode === 'ArrowDown') {
                this.arrowPress(event, keyCode);
                return;
            }
            this.triggerKeyboardEvent(document, 'keydown', keyCode);
        });
        this.domElement.addEventListener('mouseup', (event) => {
            let keyCode = null;
            if (event.target.tagName === 'BUTTON') keyCode = event.target.id;
            else if (event.target.tagName === 'SPAN') keyCode = event.target.parentElement.id;
            else return;
            this.triggerKeyboardEvent(document, 'keyup', keyCode);
        });
        //
        this.targetOfKeyboard.addEventListener('blur', () => {
            this.posIn = this.targetOfKeyboard.selectionStart;
        });
        document.addEventListener('keyup', (event) => {
            if (!this.active) return;
            const keyCode = event.code ? event.code : event.keyCode;
            if (!this.btnList[keyCode]) return;
            event.preventDefault();
            this.btnList[keyCode].pressed = false;
            if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
                this.changeCase();
            }
            this.btnList[keyCode].removeClass('active');
            this.posIn = this.targetOfKeyboard.selectionStart;
        });
        this.targetOfKeyboard.addEventListener('click', () => {
            this.posIn = this.targetOfKeyboard.selectionStart;
        });
        this.totalNumberOfKeys = this.btnList.length;
        this.rowNumber = 0;
        this.numberOfKeysInRow = 0;
        this.posIn = 0;
        this.buttonListArray = [];
        this.saveKeyboard();
        this.changeLanguage.bind(this);
    }

    addBtn(button) {
        this.totalNumberOfKeys += 1;
        this.btnList[button.name] = button;
        const rowsCounterConst = [14, 14, 14, 13, 14];
        if (this.numberOfKeysInRow < rowsCounterConst[this.rowNumber]) {
            this.keyboardRows[this.rowNumber].appendChild(button.domElement);
        } else {
            this.rowNumber += 1;
            this.numberOfKeysInRow = 0;
            this.keyboardRows[this.rowNumber].appendChild(button.domElement);
        }
        this.numberOfKeysInRow += 1;
    }

    triggerKeyboardEvent(el, keyState = 'keydown', keyCode) {
        this.targetOfKeyboard.focus();
        this.eventObj = new Event(keyState);
        this.eventObj.code = keyCode;
        this.eventObj.which = keyCode;
        el.dispatchEvent(this.eventObj);
    }

    valueApp(value_) {
        if (value_ === 'backspace' && this.posIn > 0) this.posIn -= 1;
        else if (value_ !== 'delete') this.posIn += 1;
        const valueBefore = value_ === 'backspace' ? this.valueSlice(-1) : this.valueSlice(0);
        let value = (value_ === undefined || value_ === 'backspace' || value_ === 'delete') ? '' : value_;
        const valueAfter = value_ === 'delete' ? this.valueSlice(1, true) : this.valueSlice(0, true);
        value = this.upCase ? String(value).toUpperCase() : String(value).toLowerCase();
        value = valueBefore.concat(value).concat(valueAfter);
        this.targetOfKeyboard.selectionStart = this.posIn;
        this.targetOfKeyboard.selectionEnd = this.posIn;
        return value;
    }

    valueSlice(step, toEnd = false) {
        // step = -1/0/+1
        const inputValue = this.targetOfKeyboard.value;
        const { selectionStart } = this.targetOfKeyboard;
        const { selectionEnd } = this.targetOfKeyboard;
        if (toEnd) return inputValue.slice(selectionEnd + step);
        const sliceEnd = selectionStart + step < 0 ? 0 : selectionStart + step;
        return inputValue.slice(0, sliceEnd);
    }

    changeLanguage() {
        const langTemp = this.language;
        this.language = this.languageAlter;
        this.languageAlter = langTemp;
        this.saveKeyboard();
        this.buttonListArray.forEach((btn) => {
            btn.changeText(this.upCase);
        });
    }

    changeCase(upperCase) {
        this.upCase = upperCase === undefined ? !this.upCase : upperCase;
        this.buttonListArray.forEach((btn) => {
            if (btn.multiLang && !btn.digitType) {
                btn.changeText(this.upCase);
            }
        });
    }

    arrowPress(event, arrow) {
        event.preventDefault();
        if (arrow === 'ArrowLeft') {
            this.posIn = this.posIn > 0 ? this.posIn - 1 : 0;
        }
        if (arrow === 'ArrowRight') {
            if (this.posIn < this.targetOfKeyboard.value.length) this.posIn += 1;
        }
        if (arrow === 'ArrowUp') {
            let pos = this.targetOfKeyboard.selectionEnd;
            const prevLine = this.targetOfKeyboard.value.lastIndexOf('\n', pos);
            const TwoBLine = this.targetOfKeyboard.value.lastIndexOf('\n', prevLine - 1);
            if (prevLine === -1) return;
            pos -= prevLine;
            this.targetOfKeyboard.selectionStart = TwoBLine + pos;
            this.targetOfKeyboard.selectionEnd = TwoBLine + pos;
            this.posIn = this.targetOfKeyboard.selectionStart;
            return;
        }
        if (arrow === 'ArrowDown') {
            let pos = this.targetOfKeyboard.selectionEnd;
            const prevLine = this.targetOfKeyboard.value.lastIndexOf('\n', pos);
            const nextLine = this.targetOfKeyboard.value.indexOf('\n', pos + 1);
            if (nextLine === -1) return;
            pos -= prevLine;
            this.targetOfKeyboard.selectionStart = nextLine + pos;
            this.targetOfKeyboard.selectionEnd = nextLine + pos;
            this.posIn = this.targetOfKeyboard.selectionStart;
            return;
        }
        this.targetOfKeyboard.selectionStart = this.posIn;
        this.targetOfKeyboard.selectionEnd = this.posIn;
    }

    updateBtnList(btnList) {
        this.btnList = btnList;
    }

    updateBtnListArray() {
        this.buttonListArray = [...Object.values(this.btnList)];
        return this.buttonListArray;
    }

    deactivateKeyboard() {
        this.buttonListArray.forEach((btn) => {
            btn.removeClass('active');
        });
    }

    saveKeyboard() {
        localStorage.setItem('lang', this.language);
    }
}

export default Keyboard;
