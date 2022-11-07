import { checkNodeElement } from "./utilsFunction.js";

export const backdrop = (elementToDelete)=>{
    if(!checkNodeElement('.backdrop')){
        return;
    }
    const backdrop = document.createElement('div');
    backdrop.classList.add('backdrop')
    backdrop.addEventListener('click', ()=>{
        backdrop.style.display = 'none'
    })  

    document.body.append(backdrop)
}