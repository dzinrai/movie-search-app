export default function toggleClass(el, classOld, classNew) {
    const set1 = classOld ? classOld.split(' ') : null;
    const set2 = classNew ? classNew.split(' ') : null;
    if (!set2) {
        set1.forEach((cl) => {
            if (el.classList.contains(cl)) el.classList.remove(cl);
            else el.classList.add(cl);
        });
    } else {
        set1.forEach((cl) => {
            el.classList.remove(cl);
        });
        set2.forEach((cl) => {
            el.classList.add(cl);
        });
    }
}
