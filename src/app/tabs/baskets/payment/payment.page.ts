import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ViewDidEnter } from '@ionic/angular';
import { ErrorService } from '../../products/services/error.service';
import { BasketModule } from '../models/basket-model';
import { BasketServiceService } from '../services/basket-service.service';
import { PaymentService } from '../services/payment.service';
import { PaymentModule } from './model/payment-model';
import { SendPaymentModule } from './model/send-payment-model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements ViewDidEnter {

  baskets : BasketModule[] = [];
  payment: PaymentModule;
  paymentSend: SendPaymentModule;

  cartOwner:string='';
  cartNumber:string='';
  expirationDate:string='';
  cvv:string='';

  total = 0.0;

  loading : any;
  isLoading : boolean = false;

  constructor(
    private basketServis:BasketServiceService,
    private paymentServis:PaymentService,
    private errorServis:ErrorService,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private router:Router
  ) { }

  ionViewDidEnter(): void {
    this.getBasketList()
    this.getBasketTotal()
  }

  getBasketList(){
    this.baskets = this.basketServis.getBasket()
  }

  getBasketTotal(){
    this.total = this.basketServis.getBasketTotalPrice()
  }

  odemeGerceklestir(){
    if(this.cartNumber !='' && this.cartNumber !== '' && this.expirationDate !== '' && this.cvv !== ''){
      
      this.presentLoading(1500)
      
      this.payment = new PaymentModule();

      this.payment.cartNumber = this.cartNumber;
      this.payment.cartOwner = this.cartOwner;
      this.payment.cvv = this.cvv;
      this.payment.expirationDate = this.expirationDate;
      this.payment.date = Date();
      this.payment.id = Math.random()

      this.paymentSend = new SendPaymentModule();

      this.paymentSend.payment = this.payment;
      this.paymentSend.basket = this.baskets

      this.paymentServis.sendPayment(this.paymentSend);
      this.basketServis.clearBaskets()

      this.dissmissLoading();

      this.presentToast("Ödeme başarıyla gerçekleşti.");
    
      this.router.navigate(["/tabs/baskets"])
    }
    else{
      this.errorServis.errorHandlerTxt("Lütfen bilgilerinizi eksiksiz giriniz.")
    }
  }

  async presentToast(msj:string){
    const toast = await this.toastController.create({
      message : msj,
      duration : 1000,
      position : 'top'
    });
    toast.present();
  }

  async presentLoading(_duration:number){
    this.isLoading = true
    this.loading = await this.loadingController.create({
      cssClass:'my-custom-class',
      message : 'Ödemeniz alınıyor lütfen bekleyin ...',
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

}
