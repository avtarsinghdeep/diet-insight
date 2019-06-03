import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../shared'

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [{ path: '',loadChildren: '../home/home.module#HomePageModule'}]
      },
      { path: 'mydietplan', loadChildren: '../mydietplan/mydietplan.module#MydietplanPageModule' },
      { path: 'messages', loadChildren: '../messages/messages.module#MessagesPageModule' },
      { path: 'appointments', loadChildren: '../appointments/appointments.module#AppointmentsPageModule'},
      { path: 'notification', loadChildren: '../notification/notification.module#NotificationPageModule'},
      //  { path: 'myprofile', loadChildren: '../myprofile/myprofile.module#MyprofilePageModule'},
      { path: '',redirectTo: '/tabs/home',pathMatch: 'full'}
       
    ]
    ,canActivateChild:[AuthGuard]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
