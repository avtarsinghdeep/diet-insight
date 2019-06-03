import { Component,NgZone,ViewChild} from '@angular/core';
import { Platform,NavController,MenuController,PopoverController,IonRouterOutlet, AlertController } from '@ionic/angular';
import { SplashScreen} from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService ,AlertService} from './shared/index';
import { Router,NavigationStart } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import {CustomAlertComponent} from './custom-alert/custom-alert.component';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent {
  profile_img = 'assets/profile-user.png';
  user_name
  public appPages = [
     {
      title: 'Dashboard',
      url: '/tabs',
      icon: 'home',
      status: false
    },
    {
      title: 'My Package',
      url: '/packages',
      icon: 'briefcase',
      status: false
    },
    {
      title:'My Files',
      url:'/downloads-files',
      icon:'cloud-download',
      status:false
    },
    {
      title: 'Recipes',
      url: '/recipes',
      icon: 'pizza',
      status: false
    },
    {
      title: 'Services',
      url: '/servicesSide',
      icon: 'cog',
      status: false
    },
    {
      title: 'Testimonials',
      url: '/testimonials',
      icon: 'quote',
      status: false
    },
     {
      title:'Settings',
      url:'/setting',
      icon:'cog',
      status:false
    },
    {
      title: "FAQ's",
      url: '/faqs',
      icon: 'help',
      status: false
    },
    {
      title: 'Contact us',
      url: '/contactus',
      icon: 'contact',
      status: false
    }
   
    
  ];
    @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  constructor(
    private router: Router,
    private menuController: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private navController: NavController,
    private fcm: FCM, public zone: NgZone, public alertService: AlertService, public popoverController: PopoverController,public google:GooglePlus,
public facebook:Facebook, public alertController: AlertController) {
    this.fcm.subscribeToTopic('dietinsight');
    this.initializeApp();
    this.ImageCheck();
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        if (val.url == '/login' || val.url == '/signup' ||
          val.url == '/forgot' || val.url == '/services' ||
          val.url == '/forgot-otp'
        ) {
          this.menuController.enable(false,'first')
        } else {
          this.menuController.enable(true,'first')
        }
      }
    })
        this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } 
     else if (this.router.url === '/tabs/messages' || this.router.url === '/tabs/mydietplan' || this.router.url === '/tabs/appointments' || this.router.url === '/tabs/notification') {
       console.log("yes");
        this.navController.navigateForward('/tabs/home');
       //this.routerOutlet.pop();
     }
      else if (this.router.url === '/tabs/home' || this.router.url=='personal-profile') {
        // this.platform.exitApp(); 
       this.presentAlert();
        // or if that doesn't work, try
        //  navigator['app'].exitApp();
      } else {
        console.log('inn another page WONT EXIT THE APP!');
        //this.routerOutlet.pop();
        this.presentAlert();
      }
    });
  }
    async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Do you want to exit the app?',
      buttons: [{
        text: 'Ok',
        role: 'Ok',
        handler: () => {
          console.log('OK clicked');
          navigator['app'].exitApp();
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await alert.present();
  }
  ngOnInit(){
    setTimeout(()=>{
     //console.log(this.dataService.tabPage);
     this.ngOnInit();
    },5000)
  }

  async presentAlertLogout() {
    const alert = await this.alertController.create({
      message: 'Do you really want to Logout?',
      buttons: [{
        text: 'Yes',
        role: 'Ok',
        handler: () => {
          console.log('Yes clicked');
          localStorage.clear()
          this.dataService.userData='';
          this.dataService.pageType='';
          this.dataService.tabPage='';
          this.dataService.roles_id='';
          this.facebook.logout();
          this.google.logout();
          localStorage.clear();
          this.navController.navigateRoot('login');
        }
      },
      {
        text: 'No',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await alert.present();
  }

  
  logout() {
   this.presentAlertLogout();
  }
  ImageCheck() {
    setTimeout(() => {
      this.ImageCheck();
      
      if (localStorage['profile_img']=='' || localStorage['profile_img']=="" || localStorage['profile_img']=='undefined' || localStorage['profile_img']==undefined) {
         this.profile_img="assets/profile-user.png"
      }
      else{
       this.profile_img = localStorage['profile_img'];
      }
      this.user_name = localStorage['user_name']
      //console.log('profile_img', localStorage['profile_img']);
    }, 10000)
  }
  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
this.dataService.platform = 'android';
} else if (this.platform.is('ios')) {
this.dataService.platform = 'ios';
}
console.log("platform",this.dataService.platform)
      //this.customAlert('title', 'Lorem ipsum is a dummy text.', 'gfdfd')
      this.statusBar.styleLightContent()
      this.splashScreen.hide();
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log("Received in background");
          if (data.identify == 'offer') {
             this.navController.navigateForward('servicesSide');
          } else if (data.identify == 'appointment') {
            this.navController.navigateForward('/tabs/appointments');
          } else if (data.identify == 'weight') {
            this.dataService.mealtypePage = '3'
            this.navController.navigateForward('addmeal');
          } else if (data.identify == 'meal') {
            this.dataService.mealtypePage = '1'
            this.navController.navigateForward('addmeal');
          } else if (data.identify == 'Dietchart' ||data.identify == 'DietChart') {
            this.navController.navigateForward('/tabs/mydietplan');
          } else if (data.identify == 'water_intake') {
             this.dataService.mealtypePage = '2'
            this.navController.navigateForward('addmeal');
          }
           else if (data.identify == 'message') {
            this.navController.navigateForward('/tabs/messages');
          }
        } else {
          console.log("Received in foreground");
          if (data.identify == 'offer') {
            this.customAlert(data.title, data.body, 'offer')
            // this.alertService.presentAlert('Alert', data.result);
          } else if (data.identify == 'appointment') {
            this.customAlert(data.title, data.body, 'appointment')
            //  this.navController.navigateForward('/tabs/appointments');
          } else if (data.identify == 'weight') {
            this.customAlert(data.title, data.body, 'weight')
            //  this.dataService.mealtypePage='3'
            // this.navController.navigateForward('addmeal');
          } else if (data.identify == 'meal') {
            this.customAlert(data.title, data.body, 'meal')
            // this.dataService.mealtypePage='1'
            //this.navController.navigateForward('addmeal');
          } else if (data.identify == 'Dietchart' || data.identify == 'DietChart') {
            this.customAlert(data.title, data.body, 'Dietchart')
            //this.navController.navigateForward('/tabs/mydietplan');
          } else if (data.identify == 'water_intake') {
            this.customAlert(data.title, data.body, 'water_intake')
            // code...
          } else if (data.identify == 'newsletter'){
            this.customAlert(data.title, data.body, 'newsletter')
          }
           else if (data.identify == 'message') {
            //this.navController.navigateForward('/tabs/messages');
            console.log("tabPage",this.dataService.tabPage);
            if (this.dataService.tabPage=="messages" || this.dataService.tabPage=='messages') {
              
            }
            else{
              this.customAlert(data.title, data.body, 'message')
            }
            
          }
        };
      });
    });
  }
  set() {}
  value(index,url) {
    console.log("url",url);
    if (url=="/tabs" || url=='/tabs') {
      this.dataService.dashboard_nav=true
    }
    this.dataService.pageType = 'sidemenu';
    for (var i = 0; i < this.appPages.length; i++) {
      this.appPages[i].status = false;
    }
    this.appPages[index].status = true;
    console.log(this.appPages);
  }
  async customAlert(title: any, msg: any, type: any) {
    const popover = await this.popoverController.create({
      component: CustomAlertComponent,
      componentProps: {
        title: title,
        msg: msg,
        type: type
      },
      translucent: true,
      cssClass:'custom-popover'
    });
    popover.onDidDismiss()
      .then((data: any) => {
        if (data.data.status == true) {
          console.log(data);
          if (data.data.type == 'offer') {
            this.navController.navigateForward('servicesSide');
          } else if (data.data.type == 'appointment') {
            this.navController.navigateForward('/tabs/appointments');
          } else if (data.data.type == 'weight') {
            this.dataService.mealtypePage = '3'
            this.navController.navigateForward('addmeal');
          } else if (data.data.type == 'meal') {
            this.dataService.mealtypePage = '1'
            this.navController.navigateForward('addmeal');
          } else if (data.data.type == 'Dietchart') {
            this.navController.navigateForward('/tabs/mydietplan');
          } else if (data.data.type == 'water_intake') {
            this.dataService.mealtypePage = '2'
            this.navController.navigateForward('addmeal');
          }
          else if (data.data.type == 'message') {
           this.navController.navigateForward('/tabs/messages');
          }

        } else {
          console.log('false');
        }

      });
    return await popover.present();
  }
}

  // public appPages = [
  //   {
  //     title: 'Dashboard',
  //     url: '/tabs',
  //     icon: 'home',
  //     status: false
  //   },
  //   {
  //     title: 'Profile',
  //     url: '/tabs/myprofile',
  //     icon: 'contact',
  //     status: false
  //   },
  //   {
  //     title: 'Chat',
  //     url: '/tabs/messages',
  //     icon: 'chatboxes',
  //     status: false
  //   },
  //   {
  //     title: 'Diet Plan',
  //     url: '/tabs/mydietplan',
  //     icon: 'paper',
  //     status: false
  //   },
  //   {
  //     title: 'Appointment',
  //     url: '/tabs/appointments',
  //     icon: 'calendar',
  //     status: false
  //   },
  //   {
  //     title: 'My Package',
  //     url: '/packages',
  //     icon: 'briefcase',
  //     status: false
  //   },
  //   {
  //     title: 'Recipes',
  //     url: '/recipes',
  //     icon: 'pizza',
  //     status: false
  //   },
  //   {
  //     title: 'Services',
  //     url: '/servicesSide',
  //     icon: 'cog',
  //     status: false
  //   },
  //   {
  //     title: 'Testimonials',
  //     url: '/testimonials',
  //     icon: 'quote',
  //     status: false
  //   },
  //   {
  //     title: "FAQ's",
  //     url: '/faqs',
  //     icon: 'help',
  //     status: false
  //   },
  //   {
  //     title: 'Contact us',
  //     url: '/contactus',
  //     icon: 'contact',
  //     status: false
  //   },
  // ];