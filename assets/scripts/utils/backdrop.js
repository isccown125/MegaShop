import { checkNodeElement } from "./utilsFunction.js";

export const backdrop = (elementToDelete)=>{
    if(checkNodeElement(elementToDelete)){
        return;
    }
    const backdrop = document.createElement('div');
    backdrop.style.display = 'block'
    backdrop.classList.add('backdrop')
    backdrop.addEventListener('click', ()=>{
        elementToDelete.remove()
        backdrop.style.display = 'none'
    })  

    return backdrop
}