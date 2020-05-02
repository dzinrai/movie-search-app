export default function toggleClass(el, classSecond) {
    if (el.classList.contains(classSecond)) el.classList.remove(classSecond);
    else el.classList.add(classSecond);
}
