function create(tag, className, inner, target, ...attrs) {
    const element = document.createElement(tag.toUpperCase());
    if (className) element.classList.add(...className.split(' '));
    if (inner) element.innerHTML = inner;
    if (target) target.append(element);
    if (attrs.length) {
        attrs.forEach(([attrName, attrValue]) => {
            element.setAttribute(attrName, attrValue);
        });
    }
    return element;
}

export default create;
