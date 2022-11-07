import { Component } from '../utils/components.js';
import { Modal } from '../utils/modal.js';

const modal = new Modal();

export class LoginPanel extends Component{
    constructor(){
        super();
        
    }
    render(){
        const loginPage = modal.render();
        const header = document.querySelector('.main-header__content')
        const loginPanel = this.createElement('section', { id:'id'} )

        document.body.append(loginPage)
    }
}