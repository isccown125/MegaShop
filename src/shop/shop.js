import { Component } from "../utils/components.js";
import { checkNodeElement } from "../utils/helperFunctions.js";
import { fetchProductFromApi } from "../utils/helperFunctions.js";
import { FactoryProduct } from "./product.js";
import { basket } from "./basket.js";

const rootElementApp = document.querySelector('#root-app')

class Shop extends Component {
    #page = 1;
    #allPages = null;
    #maxRenderedItems = 18;
    #firstItem = 0;
    #lastItem = null;

    constructor() {
        super();
        this.products = [];
        this.productsList = null;
        this.renderedPagination = [];
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
            this.renderedPagination.forEach((el) => {
                el.remove();
            })
        } else {
            this.productsList = this.createElement('ul', [{ cssClasses: 'products' }], [{ name: 'name', value: 'product-list' }]);
        }
        const shop = document.querySelector('#shop');
        this.pagination()
        this.products.forEach((el, index) => {
            if (index >= this.#firstItem && index < (this.#maxRenderedItems * this.#page)) {
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
        shop.prepend(this.pagination())
        shop.append(this.pagination())

    }
    pagination() {
        const pagination = this.createElement('div', [{ cssClasses: 'pagination' }])
        const actualPage = this.createChild(pagination, 'p', [{ cssClasses: 'pagination-actual-page' }])
        const paginationPages = this.createChild(pagination, 'span', [{ cssClasses: 'pagination-items' }])
        const paginationButtonLastPage = this.createChild(paginationPages, 'span', [{ cssClasses: 'pagination-item__btn' }], [{ name: 'data-btn', value: 'last' }]);

        this.#allPages = Math.floor(this.products.length / this.#maxRenderedItems);
        for (let i = 1; i <= this.#allPages; i++) {
            if (i !== 0) {
                const paginItem = this.createChild(paginationPages, 'span', [{ cssClasses: 'pagination-item' }], [{ name: 'data-page', value: `${i}` }])
                paginItem.textContent = i;
            }
        }
        const paginationButtonNextPage = this.createChild(paginationPages, 'span', [{ cssClasses: 'pagination-item__btn' }], [{ name: 'data-btn', value: 'next' }]);

        actualPage.textContent = `Page: ${this.#page}`;
        paginationButtonLastPage.textContent = '<';
        paginationButtonNextPage.textContent = '>';
        pagination.addEventListener('click', (event) => {
            if (event.target.className === 'pagination-item') {
                if (event.target.dataset.page === this.page) {
                    return
                }
                this.#page = event.target.dataset.page;
                this.#lastItem = this.#page * this.#maxRenderedItems;
                this.#firstItem = this.#lastItem - this.#maxRenderedItems;
                this.renderProducts();
            }
            if (event.target.className === 'pagination-item__btn' && event.target.dataset.btn === 'last') {
                if (this.#page > 1) {
                    this.#page--
                    this.#lastItem = this.#page * this.#maxRenderedItems;
                    this.#firstItem = this.#lastItem - this.#maxRenderedItems;
                    this.renderProducts();
                }
            }
            if (event.target.className === 'pagination-item__btn' && event.target.dataset.btn === 'next') {
                if (this.#page < this.#allPages) {
                    this.#page++
                    this.#lastItem = this.#page * this.#maxRenderedItems;
                    this.#firstItem = this.#lastItem - this.#maxRenderedItems;
                    this.renderProducts();
                }
            }

        })
        this.renderedPagination.push(pagination);
        return pagination;
    }
}

export const shop = new Shop();


(async () => {
    const result = await fetchProductFromApi('https://dummyjson.com/products?skip=0&limit=100')
    const factoryProduct = new FactoryProduct();
    result.products.forEach((product) => {
        factoryProduct.data = {
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            description: product.description,
            images: product.images,
            thumbnail: product.thumbnail,
        }
        shop.addProduct(factoryProduct.data)
    })
    shop.renderProducts();
    shop.productsList.addEventListener('click', (event) => {
        let id = null;
        if (event.target.nodeName === 'BUTTON' && event.target.parentNode.parentNode.parentNode.className.includes('product-item')) {
            id = Number(event.target.parentNode.parentNode.parentNode.dataset.id);
            const product = shop.findById(id);
            basket.add({ id: product.id, title: product.title, price: product.price, qty: 1 });
            basket.update();
        }
    })


})();




