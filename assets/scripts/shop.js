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

const product = new FactoryProduct();



class Shop extends Component {
    constructor() {
        super();
        this.products = [];
        this.maxRenderedItems = 25;
        this.firstItem = 0;
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
        return this.createChild(document.body, 'section', { id: 'shop' });
    }
    renderProducts() {
        if (checkNodeElement('#products')) {
            const productList = document.querySelector('#products')
            productList.remove();
        }
        const shop = document.querySelector('#shop');
        const productList = this.createElement('ul', { cssClasses: 'products' });
        this.products.forEach((el, index) => {
            if (index >= 25 && index < this.maxRenderedItems+25) {
                const item = this.createChild(productList, 'li', { cssClasses: 'product-item' }, { name: 'data-id', value: el.id.toString() })
                const itemContent = this.createChild(item, 'div', { cssClasses: 'product-item__content' });
                const header = this.createChild(itemContent, 'header', { cssClasses: 'product-item-header' })
                const title = this.createChild(header, 'h3', { cssClasses: 'product-item-header__title' })
                const itemGroupImg = this.createChild(itemContent, 'div', { cssClasses: 'product-item-images' })
                const img = this.createChild(itemGroupImg, 'img', { cssClasses: 'product-item-images__img' })
                const footer = this.createChild(itemContent, 'footer', { cssClasses: 'product-item__footer' })
                const price = this.createChild(footer, 'p', { cssClasses: 'product-item-footer__price' })
                const desctiption = this.createChild(footer, 'p', { cssClasses: 'product-item-footer__description' })
                const addToCartBtn = this.createChild(footer, 'button', { cssClasses: 'product-item-footer__btn-add-to-cart' })
                title.textContent = el.title;
                img.src = el.thumbnail;
                price.textContent = `${el.price} $`
                desctiption.textContent += `${el.description}`
                addToCartBtn.textContent = 'Add to cart'
            } else {
                return;
            }
        })
        shop.append(productList);
    }
}

class Basket extends Component {
    constructor() {
        super();
        this.items = [];
        this.cost = 0;
    }
    add(product = { id: null, title: '', price: null }) {
        if (!product) {
            return
        }
        if (product.id === null || product.title.length === 0 || product.price === null) {
            return
        }
        this.items.push(product);
    }
    remove(id) {
        if (isNaN(id)) {
            return;
        }
        const itemIndex = this.items.findIndex((el, index) => index === id)
        if (itemIndex >= 0) {
            this.items.splice(itemIndex, 1)
            return
        }
        return
    }
    render() {
        const basket = this.createElement('section', { id: 'basket' });
        const titleBasket = this.createChild(basket ,'h2', {cssClasses:'basket-title'} )
        const productList = this.createChild(basket, 'ul', { cssClasses: 'basket-products' })
        this.items.forEach((el, index) => {
            const item = this.createChild(productList, 'li', { cssClasses: 'basket-product-item' }, { name: 'data-id', value: index.toString() })
            const indexItem = this.createChild(item, 'p', { cssClasses: 'basket-product-item__index' });
            const title = this.createChild(item, 'p', { cssClasses: 'basket-product-item__title' });
            const btnRemoveFromBasket = this.createChild(item, 'button', { cssClasses: 'basket-product-item__btn-remove' });
            const price = this.createChild(item, 'p', { cssClasses: 'basket-product-item__price' });
            indexItem.textContent = `${index}`;
            title.textContent = el.title;
            price.textContent = el.price + " $";
            btnRemoveFromBasket.textContent = 'remove';
        })
        const cost = this.createChild(basket, 'p', {cssClasses: 'basket-products__cost'})


        titleBasket.textContent = 'Basket'
        cost.textContent = `Cost: ${this.cost} $`;
        document.body.prepend(basket)
        
    }
    calculateCost(){
        const priceItems = [];
        this.items.map((element, index)=>{ 
            priceItems.push(element.price)
        })
        if(priceItems.length > 0){
            this.cost = priceItems.reduce((prev, curr)=> prev+=curr, 0)
        } else {
            this.cost = 0
        }
        
        console.log(this.cost);
        return this.cost;
        
    }
    update() {
        const productList = document.querySelector('.basket-products')
        productList.textContent = '';
        this.items.forEach((el, index) => {
            const item = this.createChild(productList, 'li', { cssClasses: 'basket-product-item' }, { name: 'data-id', value: index.toString()})
            const indexItem = this.createChild(item, 'p', { cssClasses: 'basket-product-item__index' });
            const title = this.createChild(item, 'p', { cssClasses: 'basket-product-item__title' });
            const price = this.createChild(item, 'p', { cssClasses: 'basket-product-item__price' });
            const btnRemoveFromBasket = this.createChild(item, 'button', { cssClasses: 'basket-product-item__btn-remove' });
            indexItem.textContent = `${index+1}`;
            title.textContent = el.title;
            price.textContent = el.price + " $";
            btnRemoveFromBasket.textContent = 'remove';
            
        })
        const cost = document.querySelector('.basket-products__cost')
        cost.textContent = `Cost: ${this.cost} $`;
    }
}

(async () => {
    const shop1 = new Shop();
    const basket = new Basket();
    const result = await fetch('https://dummyjson.com/products?limit=100&skip=0')
    const res = await result.json();
    res.products.forEach((value) => {
        product.data = value
        shop1.addProduct(product.data);
    })

    basket.render();
    const cos = shop1.render();
    shop1.renderProducts(shop1.products, cos);

    const cart = document.querySelector('#basket');
    const renderedProductsList = document.querySelector('.products');


    cart.addEventListener('click', (event) => {
        if (event.target.nodeName === 'BUTTON' && event.target.className === "basket-product-item__btn-remove") {
            basket.remove(Number(event.target.parentNode.dataset.id))
            basket.calculateCost();
            basket.update();
            
        }
    })

    renderedProductsList.addEventListener('click', (event) => {
        if (event.target.nodeName === 'BUTTON' && event.target.className === "product-item-footer__btn-add-to-cart") {
            const id = Number(event.target.parentNode.parentNode.parentNode.dataset.id);
            const product = shop1.findById(id);
            if (product) {
                basket.add({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                });
                basket.calculateCost()
                basket.update()
            }

        }
    })


})();



















