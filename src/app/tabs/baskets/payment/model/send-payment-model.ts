import { BasketModule } from "../../models/basket-model";
import { PaymentModule } from "./payment-model";

export class SendPaymentModule{
    payment:PaymentModule;
    basket:BasketModule[]=[];
}