import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DownloadsFilesPage } from './downloads-files.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadsFilesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DownloadsFilesPage]
})
export class DownloadsFilesPageModule {}
