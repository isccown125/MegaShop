export class Component {
    createElement(tag, selectors = { id: '', cssClasses: '' }, attributes = { name: '', value: '' }) {
        const rootElement = document.createElement(tag);
        if (selectors.cssClasses && selectors.cssClasses.length > 0) {
            rootElement.classList = selectors.cssClasses;
        }
        if (selectors.id && selectors.id.length > 0) {
            rootElement.id = selectors.id;
        }
        if ((attributes.name && attributes.name.length > 0) && (attributes.value && attributes.value.length > 0)) {
            rootElement.setAttribute(attributes.name, attributes.value)
        }
        return rootElement;
    }
    createChild(rootElement, tag, selectors = { id: '', cssClasses: '' }, attributes = { name: '', value: '' }) {
        const child = this.createElement(tag, selectors, attributes);
        rootElement.append(child);
        return child;
    }
}