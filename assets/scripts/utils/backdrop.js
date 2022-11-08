import { checkNodeElement } from "./utilsFunction.js";

export const backdrop = (elementToDelete) => {
    if (checkNodeElement(elementToDelete)) {
        return;
    }
    const backdrop = document.createElement('div');
    backdrop.style.display = 'block'
    backdrop.classList.add('backdrop')
    const listener = backdrop.addEventListener('click', () => {
        elementToDelete.remove()
        backdrop.remove()
        backdrop.removeEventListener(listener);
    })

    return backdrop
}