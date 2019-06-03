import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyprofilePage } from './myprofile.page';
import { SharedModule} from '../shared.module'
const routes: Routes = [
  {
    path: '',
    component: MyprofilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,SharedModule,
    IonicModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyprofilePage]
})
export class MyprofilePageModule {}
