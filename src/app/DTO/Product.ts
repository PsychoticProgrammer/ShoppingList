export class Product{
    public id: number;
    public name: string;
    public brand: string;
    public alias1: string;
    public alias2: string;
    public alias3: string;
    public image: string;

    constructor(id: number, name: string, brand: string, alias1: string, alias2: string, alias3: string, image: string){
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.alias1 = alias1;
        this.alias2 = alias2;
        this.alias3 = alias3;
        this.image = image;
    }
}