import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServiceTestimonialDetailPage } from './service-testimonial-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceTestimonialDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServiceTestimonialDetailPage]
})
export class ServiceTestimonialDetailPageModule {}
