import { ConsoleLog } from "./consoleColored.js";

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

export const fetchProductFromApi = async (url = '') => {
    if (!url) {
        throw new Error(`Cannot fetch url, without url :D`);
    }
    if (typeof url !== 'string') {
        throw new Error(`Unvalid url`);
    }
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        return ConsoleLog.error('Unvalid url!');
    }
}
