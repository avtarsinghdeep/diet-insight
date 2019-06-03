import { Component } from '@angular/core';
import { NavController,
          IonContent,
          ActionSheetController,
          Platform,
          PopoverController,
          IonSelect, AlertController} from '@ionic/angular'
import * as moment from 'moment';
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
import {
  InAppBrowser,
  InAppBrowserOptions
} from '@ionic-native/in-app-browser/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { environment } from '../../environments/environment';
// import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  dashboard
  dietchart
  water_intake
  weight_tracker
  appointment
  appointment_length
  has_package
  valueActive: number = 0
  length: number = 0
  CustomArray = []
  plt
  filePath;
  dashboardOn: boolean = true
  firstTime: boolean = true
  average
  onBreak;
  average1
  constructor(public apiService: ApiService,
    public loadingService: LoadingService,
    public dataService: DataService,
    public navController: NavController,public alertController:AlertController, public alertService: AlertService, private iab: InAppBrowser, public platform: Platform, public actionSheetCtrl: ActionSheetController, private transfer: FileTransfer,
    private file: File,
    private camera: Camera) {
    console.log(this.dataService.userData);
    localStorage['profile_img'] = this.dataService.userData.profile_image;
    console.log(this.dataService.userData.profile_image);
    localStorage['user_name'] = this.dataService.userData.firstname;
    // this.socket.emit('set-nickname', this.dataService.userData.firstname);
  }
  ngOnInit() {
    // console.log('hasPACKAGE', this.has_package);
    // console.log("ionViewDidEnter");
    // console.log('tabs Home ', this.dataService.tabPage);
    setTimeout(() => {
          // if (this.dataService.tabPage == "home") {
            this.ngOnInit();
            if(this.has_package){
            // console.log("val",this.dataService.dashboard_nav);
            if (this.dataService.dashboard_nav) {
              
              this.ionViewDidEnter();
            }
            this.dataService.dashboard_nav=false
          
            }
          // }
        }, 5000)
      

    // if(window.localStorage.getItem('login_type').match('form')){
    //   console.log('LOGIN TYPE', window.localStorage.getItem('login_type'));
    //   setTimeout(() => {
    //     if (this.dataService.tabPage == "home") {
    //       this.ngOnInit();
    //     }
    //     this.ionViewDidEnter();
    //   }, 10000)
    // }
    // else{
    //   console.log('LOGIN TYPE', window.localStorage.getItem('login_type'));
    // }
  }
  profile() {
    this.navController.navigateForward('myprofile');
  }
  ionViewDidLeave() {
    this.dashboardOn = false
    console.log("leave dashboard", this.dashboardOn)
  }
  onRefresh() {
    //this.firstTime=true;
     this.loadingService.present();
     this.loadingService.dismiss();
    this.ionViewDidEnter();
  }
 ionViewDidEnter() {
    console.log('ionViewDidEnter Data is:',this.dataService.userData);
    //console.log("firstTime", this.firstTime)
    if (this.firstTime) {
      this.loadingService.present();
    }

    this.apiService.dashboard({
      user_id: this.dataService.userData.id
    }).subscribe(data => {
      if (this.firstTime) {
        this.loadingService.dismiss();
      }
       this.firstTime = false


      if (data.status_code == 200) {

        this.has_package = data.result.has_package;
         localStorage['has_package'] = this.has_package;
        console.log("has_package", this.has_package);

        //////////// has package false means user don't have any package////
        //////////has expires true means user package expired///////////////
        if (this.has_package) {
          if (!data.result.has_expire) {
                localStorage['buypack_service_id'] = data.result.service_id;
          this.dashboard = data.result;
          this.dataService.dietician_id=data.result.dietician_id;
          this.dataService.roles_id=data.result.roles;
          this.dietchart = data.result.dietchart.meal;
          this.dataService.dietician_name = data.result.dietician_name;
          console.log('ON BREAK', data.result.on_break );
          this.onBreak = data.result.on_break;
          this.water_intake = data.result.water_intake;
          this.weight_tracker = data.result.weight_tracker;
          this.average1=this.weight_tracker.average.toFixed(3);
          this.dataService.upgrade_status=data.result.upgrade_status
          if(this.average1.split(".")[1] == 0){
          this.average=parseFloat(this.weight_tracker.average);
        }
        else
        {
        this.average=parseFloat(this.weight_tracker.average).toFixed(3);
        }
         // this.average = this.weight_tracker.average.toFixed(3);

          localStorage['userDetail'] = JSON.stringify(data.result.user_data);
          this.dataService.userData = data.result.user_data;
          localStorage['profile_img'] = this.dataService.userData.profile_image;

          if (data.result.appointment.length == 0) {
            this.appointment_length = 0
          }
          this.appointment = data.result.appointment
         // console.log('APOOOOOOO', data.result.appointment);
          this.appointment_length = data.result.appointment.length
          //console.log(this.dietchart);
          if (data.result.dietchart.meal) {
            for (var i = 0; i < this.dietchart.length; i++) {
             // console.log(this.dietchart[i]);
              var value = this.dietchart[i];
              if (value.time) {
                if (new Date(moment(value.time, 'hh:mm A').add(30, 'minutes').format()) > new Date() && new Date(moment().add(60, 'minutes').format()) > new Date(moment(value.time, 'hh:mm A').format())) {
                  //console.log("plus", this.valueActive++);
                  this.CustomArray.push(this.dietchart[i]);
                  this.length = this.CustomArray.length;
                } else {
                 // console.log("minus", this.valueActive--);
                }
              } else {
                if (new Date(moment(value.mealTimeFrom, 'hh:mm A').add(30, 'minutes').format()) > new Date() && new Date(moment().add(60, 'minutes').format()) > new Date(moment(value.mealTimeFrom, 'hh:mm A').format())) {
                  console.log("plus", this.valueActive++);
                  this.CustomArray.push(this.dietchart[i]);
                  this.length = this.CustomArray.length;
                } else {
                 // console.log("minus", this.valueActive--);
                }
              }
             // console.log('length', this.length);
            }
          } else {
            this.length = 0
          }
          }
          else{
            console.log("package expire");
            this.alertService.presentAlert('Alert', "Your package has been expired");
            localStorage['has_package']='false';
            this.navController.navigateRoot('services');
          }
      

        } else {
          this.navController.navigateRoot('services');
        }
        // setTimeout(() => {
        //    if (this.dashboardOn) {
        //   this.firstTime = false
        //   this.ngOnInit();
        //    }
        // }, 20000);

      }else if(data.status_code == 401){
        localStorage.clear()
        this.dataService.userData='';
        this.dataService.pageType='';
        this.dataService.tabPage='';
        this.loadingService.dismiss();``
        this.navController.navigateRoot('login');
        this.alertService.presentAlert('Alert', 'Your Account has been Deleted due to some reason. Please contact concern company!');
      } else {
        this.alertService.presentAlert('Alert', data.result);
        console.log(data)
      }
    }, err => {


      if (this.firstTime) {
        this.loadingService.dismiss();
      }
       this.firstTime = false

      // this.alertService.presentAlert('Alert', 'Something went wrong...')
      console.log(err)
    })
  }

  info() {
    this.navController.navigateForward('help');
  }
  onAddMeal(val) {
    this.dataService.mealtypePage = val
    this.navController.navigateForward('addmeal');
  }
  check(value) {
    if (value.time) {
      if (value.time != null || value.time != '' || value.time != undefined) {
        if (new Date(moment(value.time, 'hh:mm A').add(30, 'minutes').format()) > new Date() && new Date(moment().add(60, 'minutes').format()) > new Date(moment(value.time, 'hh:mm A').format())) {
          return false;
        } else {
          return true;
        }
      } else {
        if (new Date(moment(value.time, 'hh:mm A').add(30, 'minutes').format()) < new Date()) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      if (value.mealTimeFrom != null || value.mealTimeFrom != '' || value.mealTimeFrom != undefined) {
        if (new Date(moment(value.mealTimeFrom, 'hh:mm A').add(30, 'minutes').format()) > new Date() && new Date(moment().add(60, 'minutes').format()) > new Date(moment(value.mealTimeFrom, 'hh:mm A').format())) {
          return false;
        } else {
          return true;
        }
      } else {
        if (new Date(moment(value.mealTimeFrom, 'hh:mm A').add(30, 'minutes').format()) < new Date()) {
          return true;
        } else {
          return false;
        }
      }
    }

  }
  open() {
    alert(this.CustomArray)
  }
  async editProfile() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.selectImage(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          this.selectImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  selectImage(sourceType) {
    var options: CameraOptions;
    if (this.platform.is('ios')) {
      options = {
        quality: 50,
        destinationType: this.camera.DestinationType.NATIVE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: sourceType,
        targetHeight: 500,
        targetWidth: 500,
        saveToPhotoAlbum: false
      }
    } else if (this.platform.is('android')) {
      options = {
        quality: 50,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: sourceType,
        targetHeight: 500,
        targetWidth: 500,
        saveToPhotoAlbum: false,
        correctOrientation: true 
      }
    } else {
      options = {
        quality: 50,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: sourceType,
        targetHeight: 500,
        targetWidth: 500,
        saveToPhotoAlbum: false,
        correctOrientation: true ,
        
      }
    }
    this.camera.getPicture(options).then((imageData) => {
      // alert(imageData)
      this.filePath = imageData;
      this.upload_pic();
    }, (err) => {
      //this.alertService.presentAlert('Alert', "Something went wrong...");
      // alert(err);
    });
  }
  upload_pic() {
    var fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'image',
      headers: {},
      chunkedMode: false,
      mimeType: "image/jpg",
    }
    fileTransfer.upload(this.filePath, `${environment.apiUrl}/update_profile_image/${this.dataService.userData.id}`, options)
      .then((data) => {
        if (data.responseCode == 200 && JSON.parse(data.response)['status_code'] == 200) {
          this.dataService.userData.profile_image = JSON.parse(data.response)['result']['profile_image'];
          console.log("pr", this.dataService.userData);
          localStorage['profile_img'] = JSON.parse(data.response)['result']['profile_image']
          console.log(localStorage['profile_img']);
        } else if (JSON.parse(data.response)['status_code'] == 200) {
          this.alertService.presentAlert('Alert', JSON.parse(data.response)['result']);
        } else {
          this.alertService.presentAlert('Alert', 'Something went wrong...')
        }
      }, (err) => {
        this.alertService.presentAlert('Alert', 'Something went wrong...')
        // alert(JSON.stringify(err))
        console.log(err);
      })
  }
}

