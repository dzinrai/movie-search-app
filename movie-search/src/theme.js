import create from './modules/create.js';

const root = document.querySelector(':root');
const darkHolder = create('span', 'hidden rootDark', null, document.body);
const cssVariables = ['--themeColor', '--stageColor', '--offStageColor', '--secondaryColor', '--thirdColor',
    '--mainText', '--offText', '--activeColor', '--secondaryActiveColor', '--hoverColor1', '--focusColor',
    '--alertColor', '--btnHover', '--fadedColor',
];
const rootLightStyles = getComputedStyle(root);
const rootDarkStyles = getComputedStyle(darkHolder);
const dark = { name: 'dark' };
const light = { name: 'light' };
cssVariables.forEach((variable) => {
    dark[variable] = rootDarkStyles.getPropertyValue(variable);
    light[variable] = rootLightStyles.getPropertyValue(variable);
});
let theme = light;
if (localStorage.getItem('theme') === 'dark') theme = dark;

export default function setTheme(theme_) {
    [...Object.keys(theme_)].slice(1).forEach((color) => {
        root.style.setProperty(color, theme_[color]);
    });
    return theme_;
}

setTheme(theme);
const themeSwitcherBtn = create('button', 'theme__switcher btn', null, document.body);
themeSwitcherBtn.addEventListener('click', () => {
    if (theme === dark) theme = light;
    else theme = dark;
    setTheme(theme);
    localStorage.setItem('theme', theme.name);
});
