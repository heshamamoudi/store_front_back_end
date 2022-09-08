export class Order{
    id?:number;
    status:string="";
    user_id:string="";
    products_id?:number[];
    total:number=0;
}