export class Component {
    createElement(tag, selectors = [{ id: '', cssClasses: '' }], attributes = [{ name: '', value: '' }]) {
        const rootElement = document.createElement(tag);
        if (selectors[0].cssClasses && selectors[0].cssClasses.length > 0) {
            selectors.forEach((el) => {
                rootElement.classList.add(el.cssClasses);
            })
        }
        if (selectors[0].id && selectors[0].id.length > 0) {
            selectors.forEach((el) => {
                rootElement.id = el.id
            })
        }
        if ((attributes[0].name && attributes[0].name.length > 0) && (attributes[0].value && attributes[0].value.length > 0)) {
            attributes.forEach((el) => {
                rootElement.setAttribute(el.name, el.value)
            })

        }
        return rootElement;
    }
    createChild(rootElement, tag, selectors = [{ id: '', cssClasses: '' }], attributes = [{ name: '', value: '' }]) {
        const child = this.createElement(tag, selectors, attributes);
        rootElement.append(child);
        return child;
    }
}