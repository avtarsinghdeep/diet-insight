import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PackagesPage } from './packages.page';
 import { SharedModule } from '../shared.module'
const routes: Routes = [
  {
    path: '',
    component: PackagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PackagesPage]
})
export class PackagesPageModule {}
