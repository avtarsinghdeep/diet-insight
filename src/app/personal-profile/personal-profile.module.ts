import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PersonalProfilePage } from './personal-profile.page';
import { SharedModule} from '../shared.module'

const routes: Routes = [
  {
    path: '',
    component: PersonalProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,SharedModule,
    IonicModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PersonalProfilePage]
})
export class PersonalProfilePageModule {}
