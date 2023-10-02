export class Category {
    id: number;
    name: string;

    constructor(json: Category) {
        this.id = json.id;
        this.name = json.name;
    }
}