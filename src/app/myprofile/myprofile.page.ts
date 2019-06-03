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
import { SelectStateComponent } from '../select-state/select-state.component';
import { SelectCityComponent } from '../select-city/select-city.component';
import { CountryCodeComponent } from '../country-code/country-code.component';
import {country_code} from '../country_code';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
    @ViewChild('height1') height1;
   @ViewChild('height2') height2;
  @ViewChild('countryTag') countryTag: IonSelect
  @ViewChild('stateTag') stateTag: IonSelect
  @ViewChild('cityTag') cityTag: IonSelect
  gender;
  filePath;
  first: boolean
  img = 'assets/profile-user.png';
  profile;
  country: any[] = null;
  country_selected;
  state: any[] = null;
  state_selected
  city: any[] = null;
  indexval
  Edit: boolean = false;
  medical_profile
  medical_profile2
  profileuser = {}
  correctDob
  selectedTabIndex = "Personal"
  pcountry_id;
  getAGE;
  realFeet;
  c_code = []
  flag: any;
  dial_code

  ///Medical profiel///
  cm;
  feet;
  inch;
  pIndex:boolean=false
  weightSelecter: boolean = true;
  heightSelecter: boolean = false;
  medical_problems_list: any[];
  General_Medical_profile = [{
      profile: 'Medical profile'
    },
    {
      profile: 'More details',
    }
  ]
  All_Id
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
      let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      let phoneValidation=/^[1-9a-zA-Z][0-9a-zA-Z]*$/
    this.img = this.dataService.userData.profile_image;
    this.profile = formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      email: ['',Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      phonenumber: ['',Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6),Validators.pattern(phoneValidation)])],
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
    this.All_Id={}

  }
  onpersonalIndex(){
    this.pIndex=!this.pIndex;
  }
  async selectCountry() {
    console.log('country');
    this.dataService.coutry_data=this.country
    let alert = await this.popoverController.create({
      component: SelectCountryComponent,
      cssClass:'custom-popover'
    });
    alert.onDidDismiss().then((data) => {
      this.country_selected = data.data[0];
      this.profile.controls.country.setValue(this.country_selected.name);
      this.countryChange(this.country_selected.country_id);
      this.All_Id.country_id=this.country_selected.country_id;
      this.profile.controls.city.setValue(null);
    })
    return await alert.present();
  }

  //STATES POPOVER
  async selectState(){
    let alert = await this.popoverController.create({
      component: SelectStateComponent,
      componentProps: {
        states: this.state
      },
      cssClass:'custom-popover'
    });
    alert.onDidDismiss().then((data) => {
      this.state_selected = data.data;
      this.profile.controls.state.setValue(this.state_selected.data);
      this.stateChange(this.state_selected.state_id);
      this.All_Id.state_id=this.state_selected.state_id
    })
    return await alert.present();
  }

 //CITIES POPOVER
    async selectCity(){
      console.log('state');
      let alert = await this.popoverController.create({
        component: SelectCityComponent,
        componentProps: {
          cities: this.city
        },
        cssClass:'custom-popover'
      });
      alert.onDidDismiss().then((data) => {
        console.log('city',data);
        this.state_selected = data.data;
        this.profile.controls.city.setValue(this.state_selected.data);
          this.All_Id.city_id=this.state_selected.city_id
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
   // this.profile.controls.country.setValue(this.country_selected.name);
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
    setTimeout(() => {
      console.log('loaded')
      this.c_code = country_code;
      console.log("country code",this.c_code);
      this.checkFlag()
      console.log('flaggggggg',this.flag);
      this.img = this.flag;
    }, 1000)
    this.first = true
    this.profileuser = this.dataService.userData;
    console.log('PROFILE DATA', this.profileuser);
    // this.user.country_code = '+91';
    // this.img = environment.apiUrl+'/flags/in.svg';
    if (this.dataService.userData.dob) {
     this.correctDob = this.dataService.userData.dob.split('-')[2] + '-' + this.dataService.userData.dob.split('-')[1] + '-' + this.dataService.userData.dob.split('-')[0];
    console.log('DOBBBBBBBB',this.dataService.userData.dob.split('-')[2] + '-' + this.dataService.userData.dob.split('-')[1] + '-' + this.dataService.userData.dob.split('-')[0]);
    }
    
    this.profile.controls.firstname.setValue(this.dataService.userData.firstname);
    this.profile.controls.lastname.setValue(this.dataService.userData.lastname);
    this.profile.controls.email.setValue(this.dataService.userData.email);
    this.profile.controls.phonenumber.setValue(this.dataService.userData.mobile);
    this.profile.controls.country.setValue(this.dataService.userData.country_name);
    this.dial_code = this.dataService.userData.country_code;
    
    this.All_Id.country_id=this.dataService.userData.country;
    this.profile.controls.gender.setValue(this.dataService.userData.gender);
    this.profile.controls.dob.setValue(this.dataService.userData.dob);
    
    function getAge(dateString) {
      console.log("Datastring",dateString)
      if (dateString==null || dateString=='null' || dateString==undefined || dateString=='undefined') {
        console.log("null");
        return 0;
      }
      else{
        console.log("not null");
        var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
      }
    }

    this.getAGE=getAge(this.dataService.userData.dob);
    this.profile.controls.state.setValue(this.dataService.userData.state);
    // this.profile.controls.address.setValue(this.dataService.userData.address);
    //////medical profile ////////////////
    // this.medical_profile.controls.height.setValue(this.dataService.userData.height);
    this.cm = this.dataService.userData.height;
    //this.chageHeight(this.dataService.userData.height);
    this.medical_profile.controls.height.setValue(Math.round(this.dataService.userData.height));
    this.realFeet = ((this.cm*0.393700) / 12);
    this.feet = Math.floor(this.realFeet);
    this.inch = Math.round((this.realFeet - this.feet) * 12);
    console.log('FEET AND INCHES IS', this.feet, this.inch);
    // console.log('Height in INCHES and FEET', this.inch + ' ' + this.feet);
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
        this.countryChange(this.All_Id.country_id);
        this.profile.controls.country.setValue(null);
       this.All_Id.country_id="";
        if (this.first) {
           this.profile.controls.country.setValue(this.dataService.userData.country_name);
           this.All_Id.country_id=this.dataService.userData.country;
        }
      } else {
        this.alertService.presentAlert('Alert', data.result);
      }
    }, err => {
      this.loadingService.dismiss();
      this.alertService.presentAlert('Alert', 'Something went wrong...')
      console.log(err)
    })
    this.medical_prob_list();

  }

  checkFlag() {
    this.flag = this.c_code.filter((a) => {

     // return this.signup_form.value.country_code == a.dial_code
     return this.dial_code== a.dial_code;
    })[0].img;
  }

//states
  countryChange(id) {
    this.loadingService.present();
    this.apiService.stateList({
      country_id: id
    }).subscribe(data => {
      this.loadingService.dismiss();
      if (data.status_code == 200) {
        this.state = data.result;
        this.profile.controls.state.setValue(null);
        this.All_Id.state_id=""
        if (this.first) {
          this.profile.controls.state.setValue(this.dataService.userData.state_name);
          this.All_Id.state_id=this.dataService.userData.state;
        }
        this.stateChange(this.dataService.userData.state);
      } else {
        this.alertService.presentAlert('Alert', data.result);
      }
    }, err => {
      this.loadingService.dismiss();
      this.alertService.presentAlert('Alert', 'Something went wrong...')
      console.log(err)
    })
  }

//cities
  stateChange(idd) {
    if (this.profile.value.state != null) {
      if (!this.first) {
        this.profile.controls.city.setValue(null);
      }
      this.loadingService.present();
      this.apiService.cityList({
        state_id: idd
      }).subscribe(data => {
        this.loadingService.dismiss();
        if (data.status_code == 200) {
          this.city = data.result;
          this.profile.controls.city.setValue(null);
          this.All_Id.city_id="";
          if (this.first) {
            this.profile.controls.city.setValue(this.dataService.userData.city_name);
             this.All_Id.city_id=this.dataService.userData.city;
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

    // let data = {
    //   user_id: this.dataService.userData.id,
    //   ...this.profile.value
    // }
    
    if (this.profile.valid) {
       let data={
        user_id: this.dataService.userData.id,
        country: this.All_Id.country_id,
        state: this.All_Id.state_id,
        city: this.All_Id.city_id,
        dob: this.profile.value.dob,
        firstname: this.profile.value.firstname,
        gender: this.profile.value.gender,
        lastname: this.profile.value.lastname,
        email: this.profile.value.email,
        mobile: this.profile.value.phonenumber,
        country_code: this.dial_code
      }
      console.log("",data);
      this.loadingService.present();
      this.apiService.personal_profile(data).subscribe(data => {
        this.loadingService.dismiss();
        if (data.status_code == 200) {
          localStorage['userDetail'] = JSON.stringify(data.result);
          this.dataService.userData = data.result;
           this.Edit = !this.Edit;
           this.ngOnInit();
          //this.selectedTabIndex = "Medical";
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


  cancel(){
    if(this.Edit){
      this.Edit = !this.Edit;
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
        saveToPhotoAlbum: false,
        correctOrientation: true 
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
        correctOrientation: true 
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
          this.dataService.userData.profile_image = JSON.parse(data.response)['result']['profile_image'];
          console.log("pr",this.dataService.userData);
          localStorage['profile_img']=JSON.parse(data.response)['result']['profile_image']
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

  //////////////////medical profile /////////
  medical_prob_list() {
    this.apiService.medical_problems_list().subscribe(data => {
      if (data.status_code = 200) {
        this.medical_problems_list = data.result;
       var list =[]
        var a=this.dataService.userData.medical_problem.map(arg=>{
         console.log("arg",arg);
         list.push(parseInt(arg));
        })
        this.medical_profile.controls.medical_problem.setValue(list);
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
    console.log("h",heightSelecter);
    this.medical_profile.controls.height.touched = true;
    if (heightSelecter) {
      console.log("if");
      this.medical_profile.controls.height.setValue(this.cm);
    } else if (this.feet >= 0 && this.inch >= 0) {
      console.log("else");
      this.medical_profile.controls.height.setValue(Math.round((this.feet * 30.48) + (this.inch * 2.54)));
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
          //this.ngOnInit();
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
            this.Edit = !this.Edit;
            this.ngOnInit();
            //this.navController.navigateForward('medical-profile3')
            //this.navController.navigateRoot('tabs/home')
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
//   pdateList(ev, index) {
// console.log(ev.target.value.length);
// console.log(ev.key);
// if(ev.target.value.length == '1'){
// console.log('trueeeeeeeeeeeeeeeeeee!!!!!!!!!!!!1');

// this.setFocus(index);
// }
// else{
// console.log('stop!');
// }
// }

setFocus(index){
switch(index){
case 0:
this.height1.setFocus();
break;
case 1:
this.height2.setFocus();
break;
}
}

updateList(ev, index) {
  console.log(ev.target.value.length);
  console.log(ev.key);
  if(ev.target.value.length == '1'){
    console.log('trueeeeeeeeeeeeeeeeeee!!!!!!!!!!!!1');

     this.setFocus(index);
  }
  else{
    console.log('stop!');
  }
}

async SelectCountryCode() {
  console.log('codes');
  let alert = await this.popoverController.create({
      component: CountryCodeComponent,
      componentProps: {
          codes: this.c_code
      },
      cssClass:'custom-popover'
  });
  alert.onDidDismiss().then((data) => {
      console.log("codeeee after",data);
      this.state_selected = data;
      this.img = this.state_selected.data.code_image;
      this.dial_code = this.state_selected.data.dial_code;
      console.log('dial',this.dial_code);
      // this.user.country_code=this.state_selected.data.dial_code;
     // this.signup_form.controls.country_code.setValue(this.state_selected.data.dial_code);
  })
  return await alert.present();
}
}

