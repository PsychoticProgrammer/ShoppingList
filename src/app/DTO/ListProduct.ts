export class ListProduct{
    public listId: number | any;
    public productId: number;
    public name: string;
    public alias1: string | any;
    public alias2: string | any;
    public alias3: string | any;
    public image: string | any;
    public quantity: number | any;
    public measurement: number | any;
    public measurementUnit: string | any;
    public brand: string | any
    public estimatedCost: number | any;
    public status: string | any;
    public isInList: boolean | any;
    public mealId: number | any;
    
    constructor(listId: number | any, productId: number, name: string, alias1: string | any, alias2: string | any, alias3: string | any,
        image: string | any, quantity: number | any, measurement: number | any, measurementUnit: string | any,
        productBrand: string | any, listProductBrand: string | any, estimatedCost: number | any, status: string | any,
        mealId: number| any){
        this.listId = listId;
        this.productId = productId;
        this.name = name;
        this.alias1 = alias1;
        this.alias2 = alias2;
        this.alias3 = alias3;
        this.image = image;
        this.quantity = quantity;
        this.measurement = measurement;
        this.measurementUnit = measurementUnit;
        this.brand = listProductBrand == undefined ? productBrand : listProductBrand;
        this.estimatedCost = estimatedCost;
        this.status = status;
        this.mealId = mealId;
    }
}