export class State {
    id: number;
    name: string;
    tax: number;

    constructor(json: State) {
        this.id = json.id;
        this.name = json.name;
        this.tax = json.tax;
    }
}