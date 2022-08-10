import { Product } from './product';

export class CartItem {

    id: string;
    name: string;
    imageUrl: string;
    price: number;

    quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.price = product.price;

        this.quantity = 1;
    }
}