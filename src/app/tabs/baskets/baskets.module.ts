import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasketsPageRoutingModule } from './baskets-routing.module';

import { BasketsPage } from './baskets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasketsPageRoutingModule
  ],
  declarations: [BasketsPage]
})
export class BasketsPageModule {}
