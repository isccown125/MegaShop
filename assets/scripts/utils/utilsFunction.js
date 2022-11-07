export const checkNodeElement = (value) => {

    if (!value || value.length === 0) {
        return;
    }
    if (value.ELEMENT_NODE) {
        return document.body.contains(value);
    }
    const el = document.querySelector(value);
    return document.body.contains(el);
}