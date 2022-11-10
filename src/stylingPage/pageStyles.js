import { checkNodeElement } from "../utils/helperFunctions.js";

const mainHeader = document.querySelector('.main-header__content');
const btnChangeBasketVisibility = document.querySelector('.btn-style-basket-change');
const basketProducts = document.querySelector('.basket-products');
const basketMain = document.querySelector('.basket-main');

const mainHeaderHandler = (e) => {
    const positionHeader = mainHeader.getBoundingClientRect();
    if (window.scrollY >= positionHeader.height) {
        mainHeader.classList.add('main-header__stick-top')
    } else {
        mainHeader.classList.remove('main-header__stick-top')
    }
}
let animated = false;
let visibiltyBasket = false;

const btnChangeBasketVisiHandler = () => {
    const animationHideHandler = () => {
        basketProducts.classList.remove('basket-animation-hide-products');
        animated = false;
        visibiltyBasket = false;
        basketProducts.classList.add('basket-hide-products')
        basketProducts.removeEventListener('animationend', animationHideHandler)
        return
    }
    const animationShowHandler = () => {
        basketProducts.classList.remove('basket-animation-show-products');
        animated = false;
        visibiltyBasket = true;
        basketProducts.classList.add('basket-show-products')
        basketProducts.removeEventListener('animationend', animationShowHandler)
        return
    }
    if (basketProducts.classList.contains('basket-show-products') && btnChangeBasketVisibility.classList.contains('show') && animated === false && visibiltyBasket === true) {
        animated = true;
        btnChangeBasketVisibility.classList.remove('show');
        btnChangeBasketVisibility.classList.add('hide');

        basketProducts.classList.remove('basket-show-products')
        basketProducts.classList.add('basket-animation-hide-products');

        basketProducts.addEventListener('animationend', animationHideHandler)
    }
    if (animated === false && visibiltyBasket === false) {
        visibiltyBasket = true;
        animated = true;

        btnChangeBasketVisibility.classList.add('show');
        btnChangeBasketVisibility.classList.remove('hide');

        basketProducts.classList.remove('basket-hide-products')


        basketProducts.classList.add('basket-animation-show-products');

        basketProducts.addEventListener('animationend', animationShowHandler)
    }


}

if (checkNodeElement(btnChangeBasketVisibility)) {
    btnChangeBasketVisibility.addEventListener('click', btnChangeBasketVisiHandler)
    window.addEventListener('scroll', mainHeaderHandler);
}

