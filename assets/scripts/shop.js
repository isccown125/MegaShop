const rootElementApp = document.querySelector('#root-app')

// class Notification {
//     constructor() {
//         this.time = 1;
//         this.bgColor = 'green';
//         this.nodeDom = this.addToDom();
//     }
//     addToDom() {
//         const body = document.querySelector('body');
//         const div = document.createElement('div');
//         console.log(body)
//         div.id = 'alert';
//         div.style.display = 'none'
//         body.append(div)
//         return div;
//     }

//     error(text) {
//         this.nodeDom.textContent = 'cos'
//         this.nodeDom.style.display = 'block'

//     }
// }
// const alert = new Notification();

// alert.error('erorr')

const checkNodeElement = (value) => {

    if (!value || value.length === 0) {
        return;
    }
    if (value.ELEMENT_NODE) {
        return document.body.contains(value);
    }
    const el = document.querySelector(value);
    return document.body.contains(el);
}

class Component {
    createElement(tag, selectors = { id: '', cssClasses: '' }, attributes = { name: '', value: '' }) {
        const rootElement = document.createElement(tag);
        if (selectors.cssClasses && selectors.cssClasses.length > 0) {
            rootElement.classList = selectors.cssClasses;
        }
        if (selectors.id && selectors.id.length > 0) {
            rootElement.id = selectors.id;
        }
        if ((attributes.name && attributes.name.length > 0) && (attributes.value && attributes.value.length > 0)) {
            rootElement.setAttribute(attributes.name, attributes.value)
        }
        return rootElement;
    }
    createChild(rootElement, tag, selectors = { id: '', cssClasses: '' }, attributes = { name: '', value: '' }) {
        const child = this.createElement(tag, selectors, attributes);
        rootElement.append(child);
        return child;
    }
}

class FactoryProduct {
    constructor() {
        this.id;
        this.title;
        this.price;
        this.category;
        this.description;
        this.imageUrl;
        this.thumbnail;
    }

    set data(product) {
        if (!product.id) {
            return
        }
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.category = product.category;
        this.description = product.description;
        this.imageUrl = product.images;
        this.thumbnail = product.thumbnail;
    }
    get data() {
        return {
            id: this.id,
            title: this.title,
            price: this.price,
            category: this.category,
            description: this.description,
            imageUrl: this.imageUrl,
            thumbnail: this.thumbnail,
        }
    }
}

class Shop extends Component {
    constructor() {
        super();
        this.products = [];
        this.page = 1;
        this.maxRenderedItems = 12;
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
        return this.createChild(rootElementApp, 'section', { id: 'shop' });
    }
    renderProducts() {
        if (checkNodeElement('.products')) {
            this.productsList.textContent = '';
            this.renderedPagination.remove();
            this.renderedPagination = null
        } else {
            this.productsList = this.createElement('ul', { cssClasses: 'products' }, { name: 'name', value: 'product-list' });
        }
        const shop = document.querySelector('#shop');
        this.products.forEach((el, index) => {
            if (index >= this.firstItem && index < (this.maxRenderedItems * this.page)) {
                const item = this.createChild(this.productsList, 'li', { cssClasses: 'product-item' }, { name: 'data-id', value: el.id.toString() })
                const itemContent = this.createChild(item, 'div', { cssClasses: 'product-item__content' });
                const header = this.createChild(itemContent, 'header', { cssClasses: 'product-item-header' })
                const title = this.createChild(header, 'h3', { cssClasses: 'product-item-header__title' })
                const itemGroupImg = this.createChild(itemContent, 'div', { cssClasses: 'product-item-images' })
                const img = this.createChild(itemGroupImg, 'img', { cssClasses: 'product-item-images__img' })
                const footer = this.createChild(itemContent, 'footer', { cssClasses: 'product-item__footer' })
                const price = this.createChild(footer, 'p', { cssClasses: 'product-item-footer__price' })
                const addToCartBtn = this.createChild(footer, 'button', { cssClasses: 'product-item-footer__btn-add-to-cart btn-style-shop' })
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
        const pagination = this.createChild(shop, 'div', { cssClasses: 'pagination' })
        const actualPage = this.createChild(pagination, 'p', { cssClasses: 'pagination-actual-page' })
        const paginationPages = this.createChild(pagination, 'span', { cssClasses: 'pagination-items' })
        for (let i = 0; i <= this.products.length; i += this.maxRenderedItems) {
            let page
            if (i !== 0) {
                page = (i / this.maxRenderedItems);
                const paginItem = this.createChild(paginationPages, 'span', { cssClasses: 'pagination-item' }, { name: 'data-page', value: `${page}` })
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

class Basket extends Component {
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
(async () => {
    const product = new FactoryProduct();
    const shop1 = new Shop();
    const basket = new Basket();
    basket.render();
    const result = await fetch('https://dummyjson.com/products?limit=100&skip=0')
    const res = await result.json();
    res.products.forEach((value) => {
        product.data = value
        shop1.addProduct(product.data);
    })

    const cos = shop1.render();
    shop1.renderProducts(shop1.products, cos);
    const cart = document.querySelector('#basket');
    const renderedProductsList = document.querySelector('[name|=product-list]');
    renderedProductsList.addEventListener('click', (event) => {
        if (event.target.nodeName === 'BUTTON' && event.target.className.includes("product-item-footer__btn-add-to-cart")) {
            console.log(event.target)
            const id = Number(event.target.parentNode.parentNode.parentNode.dataset.id);
            const product = shop1.findById(id);
            if (product) {
                basket.add({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    qty: 1
                });
                basket.calculateCost()
                basket.update()
            }
        }
    })
    cart.addEventListener('click', (event) => {
        if (event.target.nodeName === 'BUTTON' && event.target.className.includes("basket-product-item__btn-remove")) {
            basket.remove(Number(event.target.parentNode.parentNode.dataset.id))
            basket.calculateCost();
            basket.update();
        }
    })
})();