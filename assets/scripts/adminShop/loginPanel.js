import { Component } from '../utils/components.js';
import { Modal } from '../utils/modal.js';
import { backdrop } from '../utils/backdrop.js';
const modal = new Modal();

export class LoginPanel extends Component{
    constructor(){
        super();
        
    }
    render(){
        // const header = document.querySelector('.main-header__content')
        const loginPage = modal.render({cssClasses: 'login-modal'});
        const backdropRoRender = backdrop(loginPage);
        const loginPanel = this.createChild(loginPage, 'div', { cssClasses: 'login-modal__content'} )
        const form = this.createChild(loginPanel, 'form', {cssClasses: 'form-control'})
        const loginLabel = this.createChild(form, 'label', { cssClasses: 'from-input-container'}, {name: 'for', value: 'login-input'})
        const loginText = this.createChild(loginLabel, 'p',)
        const passLabel = this.createChild(form, 'label', { cssClasses: 'from-input-container'}, {name: 'for', value: 'password-input'})
        const passText = this.createChild(passLabel, 'p',)
        const loginInput = this.createChild(loginLabel, 'input', { cssClasses: 'login-input-style', id:'login-input' }, {name: 'type', value:'text'})
        const passInput = this.createChild(passLabel, 'input', { cssClasses: 'login-input-style', id:'password-input' },  {name: 'type', value:'password'})
        const btnSubmit = this.createChild(form, 'button', {cssClasses: 'btn-style-login'}, {name: 'value', value:'sign-in'})

        btnSubmit.textContent = 'sign in'
        loginText.textContent = 'Login'
        passText.textContent = 'Password'
        document.body.append(backdropRoRender)
        document.body.append(loginPage)
    }
}