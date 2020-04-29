import create from './create.js';

const root = document.querySelector(':root');
const darkHolder = create('span', 'hidden rootDark', null, document.body);
const cssVariables = ['--themeColor', '--stageColor', '--secondaryColor', '--thirdColor', '--mainText', '--activeColor', '--secondaryActiveColor'];
const rootLightStyles = getComputedStyle(root);
const rootDarkStyles = getComputedStyle(darkHolder);
const dark = {};
const light = {};
cssVariables.forEach((variable) => {
    dark[variable] = rootDarkStyles.getPropertyValue(variable);
    light[variable] = rootLightStyles.getPropertyValue(variable);
});
const theme = { dark, light };

export default function changeTheme(themeName) {
    const currTheme = theme[themeName];
    [...Object.keys(currTheme)].forEach((color) => {
        root.style.setProperty(color, currTheme[color]);
    });
    return themeName;
}
