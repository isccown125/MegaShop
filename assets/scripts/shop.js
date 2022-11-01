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

class Product {
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

const product = new Product();



class Shop {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product)
    }
    render() {
        const section = document.createElement('section');
        const body = document.body;
        section.id = 'shop';
        body.append(section);
    }
    renderProducts() {
        if (this.products.length > 0) {
            const shop = document.querySelector('#shop');
            const ul = document.createElement('ul');
            ul.id = 'products';
            this.products.forEach((el, index) => {
                console.log(el);
                const li = document.createElement('li');
                li.classList.add('products__item');
                li.textContent = el.title;
                ul.append(li);
            })
            shop.append(ul);
        }
    }

}
// const shop1 = new Shop();

// (async () => {
//     const result = await fetch('https://dummyjson.com/products?limit=100&skip=0')
//     console.log()
//     const res = await result.json();
//     res.products.forEach((value, index, array) => {
//         product.data = value
//         shop1.addProduct(product.data);
//     })
//     console.log(shop1.products)



//     shop1.render();
//     shop1.renderProducts();
// })();

















