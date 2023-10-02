export class Product {
    id: number;
    title: string;
    price: number;
    stateId: number;
    categoryId: number;
    stock: boolean;
    picture: string;
    description: string;

    constructor(json: Product) {
        this.id = json.id;
        this.title = json.title;
        this.price = json.price;
        this.stateId = json.stateId;
        this.categoryId = json.categoryId;
        this.stock = json.stock;
        this.picture = json.picture;
        this.description = json.description;
    }
}