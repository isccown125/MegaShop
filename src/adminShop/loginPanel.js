import { Component } from '../utils/components.js';
import { Modal } from '../utils/modal.js';
import { backdrop } from '../utils/backdrop.js';
import { checkNodeElement } from '../utils/helperFunctions.js';
const modal = new Modal();

export class LoginPanel extends Component {
    constructor() {
        super();

    }
    buttonRender() {
        const header = document.querySelector('.main-header__content')
        const btn = this.createElement('button', [{ cssClasses: 'btn-style-login' }])
        header.append(btn)
        btn.textContent = 'Sign in';
        btn.addEventListener('click', () => {
            this.render();
        })


        return btn;
    }

    render() {
        if (checkNodeElement('.login-modal')) {
            return
        }

        const loginPage = modal.render([{ cssClasses: 'login-modal' }]);
        const backdropRoRender = backdrop(loginPage);
        const loginPanel = this.createChild(loginPage, 'div', [{ cssClasses: 'login-modal__content' }])
        const form = this.createChild(loginPanel, 'form', [{ cssClasses: 'form-control' }], [{ name: 'method', value: 'GET' }])
        const loginLabel = this.createChild(form, 'label', [{ cssClasses: 'from-input-container' }], [{ name: 'for', value: 'login-input' }])
        const loginText = this.createChild(loginLabel, 'p',)
        const passLabel = this.createChild(form, 'label', [{ cssClasses: 'from-input-container' }], [{ name: 'for', value: 'password-input' }])
        const passText = this.createChild(passLabel, 'p',)
        const loginInput = this.createChild(loginLabel, 'input', [{ cssClasses: 'login-input-style', id: 'login-input' }], [{ name: 'type', value: 'text' }, { name: 'name', value: 'login' }])
        const passInput = this.createChild(passLabel, 'input', [{ cssClasses: 'login-input-style', id: 'password-input' }], [{ name: 'type', value: 'password' }, { name: 'name', value: 'pass' }])
        const btnSubmit = this.createChild(form, 'button', [{ cssClasses: 'btn-style-login' }], [{ name: 'value', value: 'sign-in' }])
        form.addEventListener('submit', (e) => {
            // e.preventDefault();
            console.log('login')
        })


        btnSubmit.textContent = 'sign in'
        loginText.textContent = 'Login'
        passText.textContent = 'Password'
        document.body.append(backdropRoRender)
        document.body.append(loginPage)

    }
}

export const loginPanel = new LoginPanel();