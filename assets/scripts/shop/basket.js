import { Component } from '../utils/components.js';

const rootElementApp = document.querySelector('#root-app')

export class Basket extends Component {
    constructor() {
        super();
        this.items = [];
        this.cost = 0;
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
        const basket = this.createElement('section', { id: 'basket' });
        const headerBasket = this.createChild(basket, 'header', { cssClasses: 'basket-header' })
        const titleBasket = this.createChild(headerBasket, 'h2', { cssClasses: 'basket-header__title' })
        this.createChild(headerBasket, 'span', { cssClasses: 'basket-spacer' })
        this.createChild(headerBasket, 'button', { cssClasses: 'btn-style-basket-change' })
        const mainBasket = this.createChild(basket, 'main', { cssClasses: 'basket-main' })
        this.createChild(mainBasket, 'ul', { cssClasses: 'basket-products' })
        const footerBasket = this.createChild(basket, 'footer', { cssClasses: 'basket-footer' })
        const cost = this.createChild(footerBasket, 'p', { cssClasses: 'basket-products__cost' })
        titleBasket.textContent = 'Basket'
        cost.textContent = `Total cost: ${this.cost} $`;
        rootElementApp.append(basket)
    }
    update() {
        const productList = document.querySelector('.basket-products')
        productList.textContent = '';
        this.items.forEach((el, index) => {
            const item = this.createChild(productList, 'li', { cssClasses: 'basket-product-item' }, { name: 'data-id', value: index.toString() })
            const indexItem = this.createChild(item, 'p', { cssClasses: 'basket-product-item__index' });
            const title = this.createChild(item, 'p', { cssClasses: 'basket-product-item__title' });
            const price = this.createChild(item, 'p', { cssClasses: 'basket-product-item__price' });
            const qty = this.createChild(item, 'p', { cssClasses: 'basket-product-item__quantity' });
            const btnContainer = this.createChild(item, 'div', { cssClasses: 'basket-product-btn__container' })
            const btnAddProduct = this.createChild(btnContainer, 'button', { cssClasses: 'basket-product-item__btn-add btn-style-basket' });
            const btnRemoveFromBasket = this.createChild(btnContainer, 'button', { cssClasses: 'basket-product-item__btn-remove btn-style-basket' });
            qty.textContent = `quantity ${el.qty}`;
            indexItem.textContent = `${index + 1}.`;
            title.textContent = el.title;
            price.textContent = `price ${el.price} $`;
            btnAddProduct.textContent = 'add'
            btnRemoveFromBasket.textContent = 'remove';
        })
        const cost = document.querySelector('.basket-products__cost')
        cost.textContent = `Total cost: ${this.cost} $`;
    }
}