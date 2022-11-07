import { Component } from "./components.js";

export class Modal extends Component{
    constructor(){
        super()
    }
    render(selectors = {cssClasses: null, id: null}){

        const modal = this.createElement('div', selectors);
        return modal;
    }
}