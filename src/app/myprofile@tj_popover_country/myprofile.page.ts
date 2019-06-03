import { Component, OnInit ,ViewChild} from '@angular/core';
import { NavController,
          IonContent,
          ActionSheetController,
          Platform,
          PopoverController,
          IonSelect} from '@ionic/angular'
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Validators, FormBuilder,FormGroup} from '@angular/forms';
import { environment } from '../../environments/environment';
import { SelectCountryComponent} from '../select-country/select-country.component'
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  @ViewChild('countryTag') countryTag: IonSelect
  @ViewChild('stateTag') stateTag: IonSelect
  @ViewChild('cityTag') cityTag: IonSelect
  gender;
  filePath;
  first: boolean = true
  img = 'assets/profile-user.png';
  profile;
  country: any[] = null;
  country_selected;
  state: any[] = null;
  city: any[] = null;
  indexval
  Edit: boolean = false;
  medical_profile
  medical_profile2
  profileuser = {}
  selectedTabIndex = "Personal"
  ///Medical profiel///
  cm;
  feet;
  inch;
  weightSelecter: boolean = true;
  heightSelecter: boolean = true;
  medical_problems_list: any[];
  General_Medical_profile = [{
      profile: 'Medical profile'
    },
    {
      profile: 'Complete Profile',
    }
  ]
  constructor(public apiService: ApiService,
    private transfer: FileTransfer,
    private file: File,
    private camera: Camera,
    private platform: Platform,
    public formBuilder: FormBuilder,
    public loadingService: LoadingService,
    public actionSheetController: ActionSheetController,
    public dataService: DataService,
    public navController: NavController,
    public popoverController: PopoverController,
    public alertService: AlertService) {
    console.log(this.img);
    console.log(this.dataService.userData);
    this.img = this.dataService.userData.profile_image;
    console.log(this.img);
    this.profile = formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required])],
      // address: ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
    });
    this.medical_profile = formBuilder.group({
      height: ['', Validators.compose([Validators.required])],
      weight: ['', Validators.compose([Validators.required])],
      blood_group: ['', Validators.compose([Validators.required])],
      food_allergy: ['', Validators.compose([Validators.required])],
      medical_problem: ['', Validators.compose([Validators.required])],
    });
    this.medical_profile2 = formBuilder.group({
      food_preference: ['', Validators.compose([Validators.required])],
      // times_you_eat: ['', Validators.compose([Validators.required])],
      smoking_relation: ['', Validators.compose([Validators.required])],
      alcohol_relation: ['', Validators.compose([Validators.required])],
      tobaco_relation: ['', Validators.compose([Validators.required])],
      aerated_drink_relation: ['', Validators.compose([Validators.required])],
      nature_of_work: ['', Validators.compose([Validators.required])],
      stress_level: ['', Validators.compose([Validators.required])],
    });
  }
  async selectCountry() {
    console.log('country');
    let alert = await this.popoverController.create({
      component: SelectCountryComponent,
      componentProps: {
        countries: this.country
      },
      cssClass:'custom-popover'
    });
    alert.onDidDismiss().then((data) => {
      this.country_selected = data.data[0];
      this.profile.controls.country.setValue(this.country_selected.name);
      console.log(this.country_selected, 'countrydata')
    })
    return await alert.present();
  }
  segmentChanged(event, name) {
    console.log(name);
  }

  onAdd(index) {
    this.indexval = index
  }
  onSub(index) {
    this.indexval = 'aa' + index
  }
  onEdit(val) {
    console.log("edit call");
    this.Edit = !this.Edit;
    console.log(this.country[this.dataService.userData.country].name)
    this.profile.controls.country.setValue(this.country[this.dataService.userData.country].name);
    if (val == 1) {
      this.selectedTabIndex = "Personal"
    } else {
      this.selectedTabIndex = "Medical"
    }
    //this.navController.navigateForward('')
  }
  chack() {
    if (this.profile.valid) {
      return false;
    } else {
      return true;
    }
  }
  chack1() {
    if (this.profile.valid && this.medical_profile.valid) {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.profileuser = this.dataService.userData;
    console.log(this.profileuser);
    this.profile.controls.firstname.setValue(this.dataService.userData.firstname);
    this.profile.controls.lastname.setValue(this.dataService.userData.lastname);

    this.profile.controls.gender.setValue(this.dataService.userData.gender);
    this.profile.controls.dob.setValue(this.dataService.userData.dob);
    // this.profile.controls.address.setValue(this.dataService.userData.address);
    //////medical profile ////////////////
    this.medical_profile.controls.height.setValue(this.dataService.userData.height);
    this.cm = this.dataService.userData.height;
    this.chageHeight(this.dataService.userData.height);
    this.medical_profile.controls.weight.setValue(this.dataService.userData.weight);
    this.medical_profile.controls.blood_group.setValue(this.dataService.userData.blood_group);
    this.medical_profile.controls.food_allergy.setValue(this.dataService.userData.food_allergy);

    ////////// complete medical problem//////////////


    this.medical_profile2.controls.food_preference.setValue(this.dataService.userData.food_preference);
    // this.medical_profile2.controls.times_you_eat.setValue(this.dataService.userData.times_you_eat);
    this.medical_profile2.controls.smoking_relation.setValue(this.dataService.userData.smoking_relation);
    this.medical_profile2.controls.alcohol_relation.setValue(this.dataService.userData.alcohol_relation);
    this.medical_profile2.controls.tobaco_relation.setValue(this.dataService.userData.tobaco_relation);
    this.medical_profile2.controls.aerated_drink_relation.setValue(this.dataService.userData.aerated_drink_relation);
    this.medical_profile2.controls.nature_of_work.setValue(this.dataService.userData.nature_of_work);
    this.medical_profile2.controls.stress_level.setValue(this.dataService.userData.stress_level);

    this.loadingService.present();
    this.apiService.countries().subscribe((data) => {
      this.loadingService.dismiss();
      if (data.status_code == 200) {
        this.country = data.result;
        this.countryChange();
      } else {
        console.log(data)
        this.alertService.presentAlert('Alert', data.result);
      }
    }, err => {
      this.loadingService.dismiss();
      this.alertService.presentAlert('Alert', 'Something went wrong...')
      console.log(err)
    })
    console.log(this.profile);
    this.medical_prob_list();

  }


  countryChange() {
    this.loadingService.present();
    this.apiService.stateList({
      country_id: this.profile.value.country
    }).subscribe(data => {
      this.loadingService.dismiss();
      if (data.status_code == 200) {
        this.state = data.result;
        this.profile.controls.state.setValue(null);
        if (this.first) {
          this.profile.controls.state.setValue(this.dataService.userData.state);
        }
        this.stateChange();
      } else {
        this.alertService.presentAlert('Alert', data.result);
        console.log(data)
      }
    }, err => {
      this.loadingService.dismiss();
      this.alertService.presentAlert('Alert', 'Something went wrong...')
      console.log(err)
    })
  }
  stateChange() {
    if (this.profile.value.state != null) {
      if (!this.first) {
        this.profile.controls.city.setValue(null);
      }
      this.loadingService.present();
      this.apiService.cityList({
        state_id: this.profile.value.state
      }).subscribe(data => {
        this.loadingService.dismiss();
        if (data.status_code == 200) {
          this.city = data.result;
          this.profile.controls.city.setValue(null);
          if (this.first) {
            this.profile.controls.city.setValue(this.dataService.userData.city);
          }
          this.first = false;

        } else {
          this.alertService.presentAlert('Alert', data.result);
          console.log(data)
        }
      }, err => {
        this.loadingService.dismiss();
        this.alertService.presentAlert('Alert', 'Something went wrong...')
        console.log(err)
      })
    }
  }
  submit() {
    let data = {
      user_id: this.dataService.userData.id,
      ...this.profile.value
    }
    console.log(data);
    if (this.profile.valid) {
      let data = {
        user_id: this.dataService.userData.id,
        ...this.profile.value
      }
      this.loadingService.present();
      this.apiService.personal_profile(data).subscribe(data => {
        this.loadingService.dismiss();
        if (data.status_code == 200) {
          localStorage['userDetail'] = JSON.stringify(data.result);
          this.dataService.userData = data.result;
          // this.Edit = !this.Edit;
          // this.ngOnInit();
          this.selectedTabIndex = "Medical";
        } else {
          this.alertService.presentAlert('Alert', data.result);
        }
      }, err => {
        this.loadingService.dismiss();
        this.alertService.presentAlert('Alert', 'Something went wrong...')
        console.log(err);
      })
    } else {
      this.alertService.presentAlert('Alert', 'Please fill all fields.')
    }
  }
  skip() {
    this.navController.navigateForward('medical-profile1')
  }
  async editProfile() {
    const actionSheet = await this.actionSheetController.create({
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
        saveToPhotoAlbum: false
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
        saveToPhotoAlbum: false
      }
    }
    this.camera.getPicture(options).then((imageData) => {
      // alert(imageData)
      this.filePath = imageData;
      this.upload_pic();
    }, (err) => {
      this.alertService.presentAlert('Alert', "Something went wrong...");
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
          // console.log(JSON.parse(data.response)['result']['profile_image']);
          this.dataService.userData.profile_image = JSON.parse(data.response)['result']['profile_image'];
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

  //////////////////medical profile /////////
  medical_prob_list() {
    this.apiService.medical_problems_list().subscribe(data => {
      if (data.status_code = 200) {
        this.medical_problems_list = data.result;
        console.log("medical_problems", this.dataService.userData.medical_problem)
        console.log("medical_problems_list", this.medical_problems_list)
        this.medical_profile.controls.medical_problem.setValue(this.dataService.userData.medical_problem);
      } else {
        this.medical_problems_list = [{
          id: 0,
          problem_name: "Data not Found"
        }]
      }
    }, err => {
      console.log(err)
    })

  }
  chageHeight(heightSelecter) {
    this.medical_profile.controls.height.touched = true;
    if (heightSelecter) {
      console.log(this.cm);
      this.medical_profile.controls.height.setValue(this.cm);
    } else if (this.feet >= 0 && this.inch >= 0) {
      this.medical_profile.controls.height.setValue(Math.round((this.feet * 30.48) + (this.inch * 2.54)));
      console.log(this.medical_profile.value.height);
    }
  }
  medicalsubmit() {
    if (this.medical_profile.valid) {
      this.loadingService.present();
      let data = {
        user_id: this.dataService.userData.id,
        ...this.medical_profile.value
      }
      this.apiService.medical_profile(data).subscribe(data => {
        this.loadingService.dismiss();
        if (data.status_code == 200) {
          localStorage['userDetail'] = JSON.stringify(data.result);
          this.selectedTabIndex = "Complete"
          // this.navController.navigateForward('medical-profile2')
        } else {
          this.alertService.presentAlert('Alert', data.result);
        }
      }, err => {
        this.loadingService.dismiss();
        this.alertService.presentAlert('Alert', 'Something went wrong...')
        console.log(err);
      })
    } else {
      this.alertService.presentAlert('Alert', 'Please fill all fields.')
    }
  }

  //////////////////complete profile /////////////
  completesubmit() {
    if (this.profile.valid && this.medical_profile.valid) {
      if (this.medical_profile2.valid) {
        this.loadingService.present();
        let data = {
          user_id: this.dataService.userData.id,
          ...this.medical_profile2.value
        }
        this.apiService.medical_profile(data).subscribe(data => {
          this.loadingService.dismiss();
          if (data.status_code == 200) {
            localStorage['userDetail'] = JSON.stringify(data.result);
            localStorage['detailDone'] = "true";
            //this.navController.navigateForward('medical-profile3')
            this.navController.navigateRoot('tabs/home')
          } else {
            this.alertService.presentAlert('Alert', data.result);
          }
        }, err => {
          this.loadingService.dismiss();
          this.alertService.presentAlert('Alert', 'Something went wrong...')
          console.log(err);
        })
      } else {
        this.alertService.presentAlert('Alert', 'Please fill all fields.')
      }
    } else {
      this.alertService.presentAlert('Alert', 'Please fill all fields in personal & medical profile.')
    }
  }
  JFunc(data) {
    return JSON.parse(data);
  }
  onBack(val) {
    if (val == 1) {
      this.navController.back();
    } else if (val == 2) {
      this.selectedTabIndex = "Personal";
    } else if (val == 3) {
      this.selectedTabIndex = "Medical";
    }
  }
  info() {
    this.navController.navigateForward('help');
  }
}

