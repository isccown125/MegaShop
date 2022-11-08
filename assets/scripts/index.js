import { FactoryProduct } from './shop/product.js';
import { Basket } from './shop/basket.js';
import { LoginPanel } from './adminShop/loginPanel.js';
import { Shop } from './shop/shop.js';

(async () => {
    const product = new FactoryProduct();
    const shop1 = new Shop();
    const basket = new Basket();
    const loginPanel = new LoginPanel();
    basket.render();
    const result = await fetch('https://dummyjson.com/products?limit=100&skip=0')
    const res = await result.json();
    res.products.forEach((value) => {
        product.data = value
        shop1.addProduct(product.data);
    })

    const cos = shop1.render();
    shop1.renderProducts();
    const cart = document.querySelector('#basket');
    const renderedProductsList = document.querySelector('[name|=product-list]');

    renderedProductsList.addEventListener('click', (event) => {
        if (event.target.nodeName === 'BUTTON' && event.target.className.includes("product-item-footer__btn-add-to-cart")) {
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
    const loginBtn = loginPanel.buttonRender();
    loginBtn.addEventListener('click', () => {
        loginPanel.render();
    })


})();