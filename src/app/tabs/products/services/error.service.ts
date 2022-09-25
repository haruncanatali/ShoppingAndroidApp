import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastController:ToastController) { }

  errorHandler(err:any){
    this.presentToast(err);
  }

  errorHandlerTxt(err:string){
    this.presentToastTxt(err);
  }

  async presentToast(err:any){
    const toast = await this.toastController.create({
      message : err.error,
      duration : 2000
    });
    toast.present();
  }

  async presentToastTxt(err:string){
    const toast = await this.toastController.create({
      message : err,
      duration : 2000
    });
    toast.present();
  }
}
