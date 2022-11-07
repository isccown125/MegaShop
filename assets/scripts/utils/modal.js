import { Component } from "./components.js";

export class Modal extends Component{
    constructor(){
        super()
    }
    render(selectors = {cssClasses: null, id: null}){
        const backdrop = this.createElement('div', {cssClasses: 'backdrop'});
        const modal = this.createChild(backdrop,'div', selectors);
        const modalContent = this.createChild(modal, 'div', {cssClasses: 'modal__content'});
        return backdrop;
    }
}