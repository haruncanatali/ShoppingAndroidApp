import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ViewDidEnter } from '@ionic/angular';
import { SendPaymentModule } from '../baskets/payment/model/send-payment-model';
import { PaymentService } from '../baskets/services/payment.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit,AfterContentChecked {

  paymendList : SendPaymentModule[] = [];
  isLoading : boolean = false;
  loading : any;
  total : number = 0.0

  constructor(
    private paymentServis:PaymentService,
    private loadingController : LoadingController,
    private menu:MenuController
  ) { }
  ngAfterContentChecked(): void {
    this.paymendList = this.paymentServis.getPayments()
  }

  ngOnInit() {
    this.presentLoading(500)
    this.isLoading = false;
    this.dissmissLoading()
  }

  getTotalPrice():number{
    this.total = 0.0
    this.paymendList.forEach(elem=>{
      elem.basket.forEach(elemx=>{
        this.total += elemx.quantity*elemx.product.price
      });
    });
    return this.total
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
