import { ProductModule } from "../../products/models/product-module";

export class BasketModule{
    id:number;
    quantity:number;
    productId:number;
    product:ProductModule;
}