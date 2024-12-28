export class MealIngredient{
    mealId: number | any;
    ingredientId: number;
    name: string;
    alias1: string | any;
    alias2: string | any;
    alias3: string | any;
    image: string | any;
    quantity: number | any;
    measurement: number | any;
    measurementUnit: string | any;
    brand: string | any;
    estimatedCost: number | any;

    constructor(mealId: number | any, ingredientId: number, name: string, alias1: string | any, alias2: string | any,
        alias3: string | any, image: string | any, quantity: number | any, measurement: number | any,
        measurementUnit: string | any, productBrand: string | any, ingredientBrand: string | any,
        estimatedCost: number | any){
        this.mealId =  mealId;
        this.ingredientId = ingredientId;
        this.name = name;
        this.alias1 = alias1;
        this.alias2 = alias2;
        this.alias3 = alias3;
        this.image = image;
        this.quantity = quantity;
        this.measurement = measurement;
        this.measurementUnit = measurementUnit;
        this.brand = ingredientBrand == undefined ? productBrand : ingredientBrand;
        this.estimatedCost = estimatedCost
    }
}