import { basket } from './shop/basket.js';
import { loginPanel } from './adminShop/loginPanel.js';
import { shop } from './shop/shop.js';

class App {
    static init() {
        loginPanel.buttonRender()
        basket.render();
        shop.render();


    }
}

App.init();











