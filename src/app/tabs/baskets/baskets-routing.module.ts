import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasketsPage } from './baskets.page';

const routes: Routes = [
  {
    path: '',
    component: BasketsPage,
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  }   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasketsPageRoutingModule {}
