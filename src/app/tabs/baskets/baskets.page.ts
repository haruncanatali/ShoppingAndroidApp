import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { ErrorService } from '../products/services/error.service';
import { ProductServiceService } from '../products/services/product-service.service';
import { BasketModule } from './models/basket-model';
import { BasketServiceService } from './services/basket-service.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.page.html',
  styleUrls: ['./baskets.page.scss'],
})
export class BasketsPage implements OnInit,AfterContentChecked {

  total = 0.0;
  isLoading = false;
  loading : any
  liste : BasketModule[] = []

  constructor(
    private basketServis:BasketServiceService,
    private loadingController:LoadingController,
    private productServis:ProductServiceService,
    private menu:MenuController,
    private router : Router,
    private errorServis:ErrorService
    ) { }
  ngAfterContentChecked(): void {
    this.getTotal()
    this.getBasketList()
  }

  routeToPaymentPage(){
    if(this.total === 0.0){
      this.errorServis.errorHandlerTxt("Önce sepetinizi doldurun.");
    }
    else{
      this.router.navigate(["/tabs/baskets/payment"])
    }
  }

  getBasketList(){
    this.liste = this.basketServis.getBasket()
  }

  deleteBasketItem(bItem:BasketModule){
    this.presentLoading(500);
    this.basketServis.deleteBasketItem(bItem.id)
    this.productServis.stokDurumuAyarlaArtirim(bItem)
    this.isLoading = false;
    this.dissmissLoading();
  }


  ngOnInit() {
    this.getFakeSpinner()
  }

  getFakeSpinner(){
    this.presentLoading(500);
    this.isLoading = false;
    this.dissmissLoading();
  }

  getTotal(){
    this.total = this.basketServis.getBasketTotalPrice()
  }

  async presentLoading(_duration:number){
    this.isLoading = true
    this.loading = await this.loadingController.create({
      cssClass:'my-custom-class',
      message : 'Lütfen bekleyin ...',
      duration : _duration
    }).then(a=>{
      a.present().then(()=>{
        if(!this.isLoading){
          a.dismiss()
        }
      });
    });
    await this.loading.present();
    this.dissmissLoading()
  }

  async dissmissLoading(){
    this.isLoading = false
    return await this.loading.dismiss();
  }

  openFirst(){
    this.menu.enable(true,'first')
    this.menu.open('first')
  }
}
