import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from './data.service'
import { MenuController } from '@ionic/angular';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private menu: MenuController,private router: Router,public dataService:DataService ) {}

    canActivate() {
        if (localStorage.getItem('isLoggedIn')) {
    	    let data = localStorage['userData'];
        	this.dataService.userData=JSON.parse(localStorage['userDetail']);
            if (localStorage['profile_img']==undefined||localStorage['profile_img']=='undefined') {
               this.dataService.userData.profile_image='assets/profile-user.png';
            }
            else{
               this.dataService.userData.profile_image=localStorage['profile_img'] 
            }
            
     
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
    canActivateChild(){
        if (localStorage.getItem('isLoggedIn')) {
            let data = localStorage['userData'];
            this.dataService.userData=JSON.parse(localStorage['userDetail']);
            if (localStorage['profile_img']==undefined||localStorage['profile_img']=='undefined') {
               this.dataService.userData.profile_image='assets/profile-user.png';
            }
            else{
               this.dataService.userData.profile_image=localStorage['profile_img'] 
            }
           
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
