import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ItemDetailsPage } from './item-details.page';
import { ItemsPage } from '../items/items.page';

const routes: Routes = [
  {
    path: '',
    component: ItemDetailsPage
  }
];

@NgModule({
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ItemDetailsPage]
})
export class ItemDetailsPageModule {}
