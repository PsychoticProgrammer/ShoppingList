export class Meal{
    public id: number;
    public name: string;
    public alias1: string;
    public alias2: string;
    public alias3: string;
    public type: string;

    constructor(id: number, name: string, alias1: string, alias2: string, alias3: string, type: string);

    constructor(id?: number, name?: string, alias1?: string, alias2?: string, alias3?: string, type?: string){
        this.id = (id == undefined) ? 0 : id;
        this.name = (name == undefined) ? "" : name;
        this.alias1 = (alias1 == undefined) ? "" : alias1;
        this.alias2 = (alias2 == undefined) ? "" : alias2;
        this.alias3 = (alias3 == undefined) ? "" : alias3;
        this.type = (type == undefined) ? "" : type;
    }
}