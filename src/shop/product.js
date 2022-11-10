export class FactoryProduct {
    #id = null;
    #title = '';
    #price = null;
    #category = '';
    #description = '';
    #imageUrl = '';
    #thumbnail = '';

    set data(product) {
        if (!product.id) {
            return
        }
        this.#id = product.id;
        this.#title = product.title;
        this.#price = product.price;
        this.#category = product.category;
        this.#description = product.description;
        this.#imageUrl = product.images;
        this.#thumbnail = product.thumbnail;
    }
    get data() {
        return {
            id: this.#id,
            title: this.#title,
            price: this.#price,
            category: this.#category,
            description: this.#description,
            imageUrl: this.#imageUrl,
            thumbnail: this.#thumbnail,
        }
    }
}