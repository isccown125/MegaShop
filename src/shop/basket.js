import { Component } from '../utils/components.js';
import { ConsoleLog } from '../utils/consoleColored.js';
import { checkNodeElement } from '../utils/helperFunctions.js';



const rootElementApp = document.querySelector('#root-app')

export class Basket extends Component {
    constructor() {
        super();
        this.items = [];
        this.cost = 0;
    }
    findProductById(id) {
        return this.items.find((el, index) => index === id);
    }
    add(product = { id: null, title: '', price: null, qty: 0 }) {
        if (!product) {
            return
        }
        if (product.id === null || product.title.length === 0 || product.price === null) {
            return
        }
        const itemInBasketIndex = this.items.findIndex((el) => el.id === product.id)
        if (this.items.length > 0 && itemInBasketIndex >= 0) {
            return this.items[itemInBasketIndex].qty += 1;
        }
        this.items.push(product);
    }
    payament() {
        this.items = [];
    }
    remove(id) {
        if (isNaN(id)) {
            return;
        }
        const itemIndex = this.items.findIndex((el, index) => index === id)
        if (this.items[itemIndex].qty === 1 || this.items[itemIndex].qty <= 1) {
            this.items.splice(itemIndex, 1)
            return
        }
        return this.items[itemIndex].qty--
    }
    calculateCost() {
        const costItems = [];
        this.items.map((element) => {
            costItems.push(element.price * element.qty)
        })
        if (costItems.length > 0) {
            this.cost = costItems.reduce((prev, curr) => {
                return prev + curr
            }, 0)
            return this.cost;
        } else {
            this.cost = 0
        }
    }
    render() {
        const basket = this.createElement('section', [{ id: 'basket' }]);
        const headerBasket = this.createChild(basket, 'header', [{ cssClasses: 'basket-header' }])
        const titleBasket = this.createChild(headerBasket, 'h2', [{ cssClasses: 'basket-header__title' }])
        this.createChild(headerBasket, 'span', [{ cssClasses: 'basket-spacer' }])
        const btn = this.createChild(headerBasket, 'button', [{ cssClasses: 'btn-style-basket-change' }])
        const mainBasket = this.createChild(basket, 'main', [{ cssClasses: 'basket-main' }])
        const productList = this.createChild(mainBasket, 'ul', [{ cssClasses: 'basket-products' }])
        const footerBasket = this.createChild(basket, 'footer', [{ cssClasses: 'basket-footer' }])
        const cost = this.createChild(footerBasket, 'p', [{ cssClasses: 'basket-products__cost' }])
        const btnPayament = this.createChild(footerBasket, 'button', [{ cssClasses: 'btn-payament' }, { cssClasses: 'btn-style-basket' }], [{ name: 'data-type', value: 'pay' }])

        btnPayament.textContent = 'Go to payament'
        btn.textContent = '^'
        titleBasket.textContent = 'Basket'
        cost.textContent = `Total cost: ${this.cost} $`;
        rootElementApp.append(basket)
        if (this.items.length === 0) {
            const emptyBasket = this.createChild(productList, 'h1', [{ cssClasses: 'basket-empty' }])
            emptyBasket.textContent = 'Basket is empty!';
        }
        productList.addEventListener('click', (event) => {
            let id;
            if (event.target.nodeName === 'BUTTON' && event.target.dataset.type === 'remove') {
                if (event.target.parentNode.parentNode.className === 'basket-product-item') {
                    id = Number(event.target.parentNode.parentNode.dataset.id);
                    this.remove(id);
                    this.update();
                }
            }
            if (event.target.nodeName === 'BUTTON' && event.target.dataset.type === 'add') {
                if (event.target.parentNode.parentNode.className === 'basket-product-item') {
                    id = Number(event.target.parentNode.parentNode.dataset.id);
                    const product = this.findProductById(id);
                    if (product) {
                        this.add(product);
                        this.update();
                    }
                }
            }
        })
        btnPayament.addEventListener('click', () => {
            this.payament();
            this.update();
        })
    }
    update() {
        const productList = document.querySelector('.basket-products')
        productList.textContent = '';
        if (this.items.length === 0) {
            const emptyBasket = this.createChild(productList, 'h1', [{ cssClasses: 'basket-empty' }])
            emptyBasket.textContent = 'Basket is empty!';
        }

        this.items.forEach((el, index) => {
            const item = this.createChild(productList, 'li', [{ cssClasses: 'basket-product-item' }], [{ name: 'data-id', value: index.toString() }])
            const indexItem = this.createChild(item, 'p', [{ cssClasses: 'basket-product-item__index' }]);
            const title = this.createChild(item, 'p', [{ cssClasses: 'basket-product-item__title' }]);
            const price = this.createChild(item, 'p', [{ cssClasses: 'basket-product-item__price' }]);
            const qty = this.createChild(item, 'p', [{ cssClasses: 'basket-product-item__quantity' }]);
            const btnContainer = this.createChild(item, 'div', [{ cssClasses: 'basket-product-btn__container' }])
            const btnAddProduct = this.createChild(btnContainer, 'button', [{ cssClasses: 'basket-product-item__btn-add' }, { cssClasses: 'btn-style-basket' }], [{ name: 'data-type', value: 'add' }]);
            const btnRemoveFromBasket = this.createChild(btnContainer, 'button', [{ cssClasses: 'basket-product-item__btn-remove' }, { cssClasses: 'btn-style-basket' }], [{ name: 'data-type', value: 'remove' }]);
            qty.textContent = `quantity ${el.qty}`;
            indexItem.textContent = `${index + 1}.`;
            title.textContent = el.title;
            price.textContent = `price ${el.price} $`;
            btnAddProduct.textContent = 'add'
            btnRemoveFromBasket.textContent = 'remove';
        })
        this.calculateCost();
        const cost = document.querySelector('.basket-products__cost')
        cost.textContent = `Total cost: ${this.cost} $`;
    }
}

export const basket = new Basket();


