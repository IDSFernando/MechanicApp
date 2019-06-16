import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServiceDetailsPage } from './service-details.page';
import { HereMapComponent } from '../here-map/here-map.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServiceDetailsPage, HereMapComponent],
  exports: [HereMapComponent]
})
export class ServiceDetailsPageModule {}
