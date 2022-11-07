const mainHeader = document.querySelector('.main-header__content');
const btnChangeBasketVisibility = document.querySelector('.btn-style-basket-change');
const basketProducts = document.querySelector('.basket-products');

const mainHeaderHandler = (e) => {
    const positionHeader = mainHeader.getBoundingClientRect();
    if (window.scrollY >= positionHeader.height) {
        mainHeader.classList.add('main-header__stick-top')
    } else {
        mainHeader.classList.remove('main-header__stick-top')
    }
}
const btnChangeBasketVisiHandler = () => {
    if (basketProducts.classList.contains('basket-show-products') && btnChangeBasketVisibility.classList.contains('show')) {
        basketProducts.classList.replace('basket-show-products', 'basket-hide-products');
        btnChangeBasketVisibility.classList.replace('show', 'hide');
        return
    }
    basketProducts.classList.remove('basket-hide-products');
    basketProducts.classList.add('basket-show-products');
    btnChangeBasketVisibility.classList.remove('hide')
    btnChangeBasketVisibility.classList.add('show');

}


btnChangeBasketVisibility.addEventListener('click', btnChangeBasketVisiHandler)
window.addEventListener('scroll', mainHeaderHandler);