import { Injectable } from '@angular/core';
import { PaymentModule } from '../payment/model/payment-model';
import { SendPaymentModule } from '../payment/model/send-payment-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  payments:SendPaymentModule[] = []

  constructor() { }

  sendPayment(odeme:SendPaymentModule){
    this.payments.push(odeme)
  }

  getPayments():SendPaymentModule[]{
    return this.payments
  }
}
