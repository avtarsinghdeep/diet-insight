import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TestimonialDetailPage } from './testimonial-detail.page';


const routes: Routes = [
  {
    path: '',
    component: TestimonialDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TestimonialDetailPage]
})
export class TestimonialDetailPageModule {}
