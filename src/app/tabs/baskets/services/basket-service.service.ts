import { Injectable } from '@angular/core';
import { BasketModule } from '../models/basket-model';

@Injectable({
  providedIn: 'root'
})
export class BasketServiceService {

  total = 0.0;
  fakeBasket : BasketModule[] = [];

  constructor() { }

  clearBaskets(){
    this.fakeBasket = []
  }

  getBasketTotalPrice():number{
    this.total = 0.0
    this.fakeBasket.forEach(element=>{
      this.total += element.quantity * Number(element.product.price);
   });
   return this.total
  }

  addBasket(model:BasketModule){
    let durum  = false;
    this.fakeBasket.forEach(elem=>{
      if(elem.product.name === model.product.name && elem.product.price === elem.product.price && elem.productId === model.productId){
        durum = true;
        elem.quantity += model.quantity;
      }
    })

    if(!durum){
      this.fakeBasket.push(model)
    }
  }

  getBasket():BasketModule[]{
    return this.fakeBasket
  }

  deleteBasketItem(id:number){
    this.fakeBasket = this.fakeBasket.filter(
      function(elem){
        return elem.id != id;
      }
    )
  }
    
}
