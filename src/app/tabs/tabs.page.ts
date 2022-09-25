import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { BasketServiceService } from './baskets/services/basket-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit,AfterContentChecked {

  total : number = 0.0

  constructor(private basketServis:BasketServiceService) { }
  ngAfterContentChecked(): void {
    this.getBasketTotal()
  }

  ngOnInit() {
    
  }

  getBasketTotal(){
    this.total = this.basketServis.getBasketTotalPrice()
  }

}
