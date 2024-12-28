export class List{
    public id: number;
    public name: string;
    public date: string;
    public status: string;
    public estimatedCost: number | undefined;
    
    constructor();
    constructor(id: number, name: string, date: string, status: string, estimatedCost: number);

    constructor(id?: number, name?: string, date?: string, status?: string, estimatedCost?: number){
        this.id = (id == undefined) ? 0 : id;
        this.name = (name == undefined) ? "" : name;
        this.date = (date == undefined) ? "" : date;
        this.status = (status == undefined) ? "" : status;
        this.estimatedCost = estimatedCost;
    }
}