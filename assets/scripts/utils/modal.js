import { Component } from "./components.js";

export class Modal extends Component {
    constructor() {
        super()
    }
    render(selectors = [{ cssClasses: null, id: null }]) {

        const modal = this.createElement('div', selectors);
        const header = this.createChild(modal, 'header', [{ cssClasses: 'modal-header' }])
        const closeBtn = this.createChild(header, 'button', [{ cssClasses: 'close-modal-btn' }])
        closeBtn.textContent = 'X'
        const closeBtnHandler = () => {
            const backdrop = document.querySelector('.backdrop')
            backdrop.remove();
            modal.remove();
            closeBtn.removeEventListener('click', closeBtnHandler)
        }

        closeBtn.addEventListener('click', closeBtnHandler)
        return modal;
    }
}