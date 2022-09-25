import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BasketModule } from '../../baskets/models/basket-model';
import { ProductModule } from '../models/product-module';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  products : ProductModule[] = 
  [
    new ProductModule(1,"Krem Peynir",100,20.50,"https://www.peynircibaba.com/image/catalog/urunler/3073781122596.jpg","a1"),
    new ProductModule(2,"Zeytin",100.00,65.00,"https://cdn.dsmcdn.com/mnresize/500/-/ty278/product/media/images/20211222/9/14930386/17329977/2/2_org.jpg","a2"),
    new ProductModule(3,"Süzme Peynir",100,45.60,"https://cdn.akakce.com/pinar/pinar-500-gr-suzme-z.jpg","a3"),
    new ProductModule(4,"Yoğurt",100,35.00,"https://cdn.akakce.com/sutas/sutas-2-kg-kaymaksiz-z.jpg","a4"),
    new ProductModule(5,"Yumurta",100,50.00,"https://www.tasomarket.com/files/products/karaman-yumurta-30lu-buyuk-boy-l-06df.jpeg","a5")
  ];

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpServis:HttpClient
  ) { }

  getList1(){
    const api = this.apiUrl+'product/getList';
    console.log(api);
    return this.httpServis.get(api);
  }

  getList():ProductModule[]{
    return this.products
  }

  stokDurumuAyarlaEksiltim(bModel:BasketModule){
    this.products.forEach(elem=>{
      if(elem.id === bModel.productId){
        elem.inventoryQuantity -= bModel.quantity;
      }
    })
  }

  stokDurumuAyarlaArtirim(bModel:BasketModule){
    this.products.forEach(elem=>{
      if(elem.id === bModel.productId){
        elem.inventoryQuantity += bModel.quantity;
      }
    })
  }
}
