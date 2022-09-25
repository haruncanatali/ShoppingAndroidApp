export class ProductModule{
    id:number;
    name:string;
    inventoryQuantity:number;
    price:number;
    imageUrl:string;
    codeGuid:string;
    
    public constructor(id_:number,name_:string,inventoryQuantity_:number,price_:number,imageUrl_:string,codeGuid_:string){
        this.id = id_;
        this.name = name_;
        this.inventoryQuantity = inventoryQuantity_;
        this.price = price_;
        this.imageUrl = imageUrl_;
        this.codeGuid = codeGuid_;
    }
}