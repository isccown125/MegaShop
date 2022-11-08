import { Component } from "../utils/components.js";
import { checkNodeElement } from "../utils/utilsFunction.js";

const rootElementApp = document.querySelector('#root-app')

export class Shop extends Component {
    constructor() {
        super();
        this.products = [];
        this.page = 1;
        this.maxRenderedItems = 15;
        this.firstItem = 0;
        this.lastItem = null;
        this.productsList = null;
        this.rendererPagination = null;
    }
    addProduct(product) {
        this.products.push(product)
    }
    findById(id) {
        if (this.products && this.products.length > 0) {
            return this.products.find((el) => el.id === id);
        }
    }
    render() {
        return this.createChild(rootElementApp, 'section', [{ id: 'shop' }]);
    }
    renderProducts() {
        if (checkNodeElement('.products')) {
            this.productsList.textContent = '';
            this.renderedPagination.remove();
            this.renderedPagination = null
        } else {
            this.productsList = this.createElement('ul', [{ cssClasses: 'products' }], [{ name: 'name', value: 'product-list' }]);
        }
        const shop = document.querySelector('#shop');
        this.products.forEach((el, index) => {
            if (index >= this.firstItem && index < (this.maxRenderedItems * this.page)) {
                const item = this.createChild(this.productsList, 'li', [{ cssClasses: 'product-item' }], [{ name: 'data-id', value: el.id.toString() }])
                const itemContent = this.createChild(item, 'div', [{ cssClasses: 'product-item__content' }]);
                const header = this.createChild(itemContent, 'header', [{ cssClasses: 'product-item-header' }])
                const title = this.createChild(header, 'h3', [{ cssClasses: 'product-item-header__title' }])
                const itemGroupImg = this.createChild(itemContent, 'div', [{ cssClasses: 'product-item-images' }])
                const img = this.createChild(itemGroupImg, 'img', [{ cssClasses: 'product-item-images__img' }])
                const footer = this.createChild(itemContent, 'footer', [{ cssClasses: 'product-item__footer' }])
                const price = this.createChild(footer, 'p', [{ cssClasses: 'product-item-footer__price' }])
                const addToCartBtn = this.createChild(footer, 'button', [{ cssClasses: 'product-item-footer__btn-add-to-cart' }, { cssClasses: 'btn-style-shop' }])
                title.textContent = el.title;
                img.src = el.thumbnail;
                price.innerText = `price ${el.price} $`
                addToCartBtn.textContent = 'Add to cart'
            } else {
                return;
            }
        })
        shop.prepend(this.productsList);
        this.renderedPagination = this.pagination();
    }
    pagination() {
        const shop = document.querySelector('#shop');
        const pagination = this.createChild(shop, 'div', [{ cssClasses: 'pagination' }])
        const actualPage = this.createChild(pagination, 'p', [{ cssClasses: 'pagination-actual-page' }])
        const paginationPages = this.createChild(pagination, 'span', [{ cssClasses: 'pagination-items' }])
        for (let i = 0; i <= this.products.length; i += this.maxRenderedItems) {
            let page
            if (i !== 0) {
                page = (i / this.maxRenderedItems);
                const paginItem = this.createChild(paginationPages, 'span', [{ cssClasses: 'pagination-item' }], [{ name: 'data-page', value: `${page}` }])
                paginItem.textContent = page;
            }

        }
        actualPage.textContent = `Page: ${this.page}`
        pagination.addEventListener('click', (event) => {
            if (event.target.className === 'pagination-item') {
                if (event.target.dataset.page === this.page) {
                    return
                }
                this.page = event.target.dataset.page;
                this.lastItem = this.page * this.maxRenderedItems;
                this.firstItem = this.lastItem - this.maxRenderedItems;
                this.renderProducts();
            }
        })
        return pagination;
    }
}




