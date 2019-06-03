import {
    Component,
    OnInit,
    ViewChild, HostListener
} from '@angular/core';
import {
    NavController,
    IonContent,
    ActionSheetController,
    Platform,
    IonSelect,
    PopoverController,MenuController
} from '@ionic/angular'
import {
    ApiService,
    LoadingService,
    AlertService,
    DataService
} from '../shared/index'
import {
    Camera,
    CameraOptions
} from '@ionic-native/camera/ngx';
import {
    FileTransfer,
    FileUploadOptions,
    FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import {
    File
} from '@ionic-native/file/ngx';
import {
    Validators,
    FormBuilder,
    FormGroup
} from '@angular/forms';

import {
    environment
} from '../../environments/environment'
import {
    SelectCountryComponent
} from '../select-country/select-country.component'
import {
    SelectStateComponent
} from '../select-state/select-state.component';
import {
    SelectCityComponent
} from '../select-city/select-city.component';
@Component({
    selector: 'app-personal-profile',
    templateUrl: './personal-profile.page.html',
    styleUrls: ['./personal-profile.page.scss'],
})
export class PersonalProfilePage implements OnInit {
    @ViewChild('countryTag') countryTag: IonSelect
    @ViewChild('stateTag') stateTag: IonSelect
    @ViewChild('cityTag') cityTag: IonSelect
    @ViewChild('height1') height1;
    @ViewChild('height2') height2;

    gender;
    filePath;
    first: boolean = true
    img = 'assets/profile-user.png';
    profile;
    country: any[] = null;
    country_selected;
    state: any[] = null;
    state_selected;
    city: any[] = null;
    selectedTabIndex = "Personal"
    ///Medical profiel///
    cm;
    realFeet;
    feet;
    inch;
    weightSelecter: boolean = true;
    heightSelecter: boolean = false;
    medical_profile
    medical_profile2
    medical_problems_list: any[];
    profileuser = {};
    profile_country_id;
    profile_state_id;
    profile_city_id;
    gender_model
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
        public alertService: AlertService, public popoverController: PopoverController,private menuController:MenuController) {
        console.log(this.img);
        console.log(this.dataService.userData);
        this.img = this.dataService.userData.profile_image;
        console.log(this.img);
        this.profile = formBuilder.group({
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
           if (this.dataService.pageType=="sidemenu") {
          this.menuController.enable(true,'first')
        }
        else{
          this.menuController.enable(false,'first')
        }
          this.platform.backButton.subscribeWithPriority(1, () => {
           console.log("back-button");
          })
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
            this.profile.controls.city.setValue(null);
            this.profile_country_id = this.country_selected.country_id;
            console.log("add profile_country_id", this.profile_country_id);
        })
        return await alert.present();
    }

    //STATES POPOVER
    async selectState() {
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
            console.log("add profile_state_id", this.state_selected.state_id);
            this.profile_state_id = this.state_selected.state_id;
        })
        return await alert.present();
    }

    //CITIES POPOVER
    async selectCity() {
        console.log('state');
        let alert = await this.popoverController.create({
            component: SelectCityComponent,
            componentProps: {
                cities: this.city
            },
            cssClass:'custom-popover'
        });
        alert.onDidDismiss().then((data) => {
            console.log("city",data);
            this.state_selected = data;
            this.profile.controls.city.setValue(this.state_selected.data.city_name);
            console.log("data for cities are", this.state_selected.data.city_id);
            this.profile_city_id = this.state_selected.data.city_id;
        })
        return await alert.present();
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
    ionViewDidEnter() {

        // this.profile.controls.firstname.setValue(this.dataService.userData.firstname);
        //this.profile.controls.lastname.setValue(this.dataService.userData.lastname);
        //this.profile.controls.country.setValue(this.dataService.userData.country_name);
        //this.profile_country_id = this.dataService.userData.country;
        // this.profile.controls.gender.setValue(this.dataService.userData.gender);
        // this.profile.controls.dob.setValue(this.dataService.userData.dob);

        //this.profile.controls.state.setValue(this.dataService.userData.state);
        // this.profile.controls.address.setValue(this.dataService.userData.address);
        //////medical profile ////////////////
        //this.medical_profile.controls.height.setValue(this.dataService.userData.height);
          if (this.dataService.userData.height) {
               this.medical_profile.controls.height.setValue(Math.round(this.dataService.userData.height));
                // this.inch = Math.round(0.3937 * this.dataService.userData.height); 
                // this.feet = Math.round(0.0328 * this.dataService.userData.height); 
                // console.log('Height in INCHES and FEET', this.inch + ' ' + this.feet);
                   this.cm = this.dataService.userData.height;
                   //this.chageHeight(this.dataService.userData.height);

                    this.realFeet = ((this.cm*0.393700) / 12);
                    this.feet = Math.floor(this.realFeet);
                    this.inch = Math.round((this.realFeet - this.feet) * 12);
                    console.log('FEET AND INCHES IS', this.feet, this.inch);
          }
        if (this.dataService.userData.weight) {
            this.medical_profile.controls.weight.setValue(this.dataService.userData.weight);
        }
        if (this.dataService.userData.blood_group) {
            this.medical_profile.controls.blood_group.setValue(this.dataService.userData.blood_group);
        }
        if (this.dataService.userData.food_allergy) {
            this.medical_profile.controls.food_allergy.setValue(this.dataService.userData.food_allergy);
        }


        ////////// complete medical problem//////////////
        if (this.dataService.userData.food_preference) {
            this.medical_profile2.controls.food_preference.setValue(this.dataService.userData.food_preference);
        }
        if (this.dataService.userData.times_you_eat) {
            this.medical_profile2.controls.times_you_eat.setValue(this.dataService.userData.times_you_eat);
        }
        if (this.dataService.userData.smoking_relation) {
            this.medical_profile2.controls.smoking_relation.setValue(this.dataService.userData.smoking_relation);
        }
        if (this.dataService.userData.alcohol_relation) {
            this.medical_profile2.controls.alcohol_relation.setValue(this.dataService.userData.alcohol_relation);
        }
        if (this.dataService.userData.tobaco_relation) {
            this.medical_profile2.controls.tobaco_relation.setValue(this.dataService.userData.tobaco_relation);
        }
        if (this.dataService.userData.aerated_drink_relation) {
            this.medical_profile2.controls.aerated_drink_relation.setValue(this.dataService.userData.aerated_drink_relation);
        }
        if (this.dataService.userData.nature_of_work) {
            this.medical_profile2.controls.nature_of_work.setValue(this.dataService.userData.nature_of_work);
        }
        if (this.dataService.userData.stress_level) {
            this.medical_profile2.controls.stress_level.setValue(this.dataService.userData.stress_level);
        }


        console.log("form", this.profile.value);
    }

    ngOnInit() {
        this.profileuser = this.dataService.userData;
        this.gender_model = this.dataService.userData.gender;
     
        this.loadingService.present();
        this.apiService.countries().subscribe((data) => {
            this.loadingService.dismiss();
            if (data.status_code == 200) {
                this.country = data.result;
                //console.log("inn countries", JSON.stringify(this.country));
                //console.log(this.dataService.userData.country_code);

                this.profile.controls.country.setValue(null);
                if (this.first) {
                    if (this.dataService.userData.country) {
                        this.profile.controls.country.setValue(this.dataService.userData.country_name);
                        this.profile_country_id = this.dataService.userData.country;
                    }
                }
                var country_code = this.dataService.userData.country_code.split('+');
                //console.log(country_code[1]);
                var filter = this.country.filter(arg => arg.phonecode == country_code[1]);
                if (filter.length > 0) {
                    //console.log(filter[0]);
                    this.profile.controls.country.setValue(filter[0].name);
                    this.profile_country_id = filter[0].country_id;
                    //console.log("form",this.profile.controls['country'].value);
                }
                this.countryChange(this.profile_country_id);
            } else {
                //console.log(data)
                this.alertService.presentAlert('Alert', data.result);
            }
        }, err => {
            this.loadingService.dismiss();
            this.alertService.presentAlert('Alert', 'Something went wrong...')
            //console.log(err)
        })

        this.medical_prob_list();
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
                this.profile_state_id = "";
                if (this.first) {
                    this.profile.controls.state.setValue(this.dataService.userData.state_name);
                    this.profile_state_id = this.dataService.userData.state;
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
                    this.profile_city_id = "";
                    if (this.first) {
                        if (this.dataService.userData.city) {
                            this.profile.controls.city.setValue(this.dataService.userData.city_name);
                            this.profile_city_id = this.dataService.userData.city;
                        }
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
        if (this.profile.valid) {
            let data = {
                user_id: this.dataService.userData.id,
                country: this.profile_country_id,
                state: this.profile_state_id,
                city: this.profile_city_id,
                dob: this.profile.controls['dob'].value,
                gender: this.profile.controls['gender'].value
            }
            console.log("Profile values are after submit", JSON.stringify(data));
            this.loadingService.present();
            this.apiService.personal_profile(data).subscribe(data => {
                this.loadingService.dismiss();
                if (data.status_code == 200) {
                    localStorage['userDetail'] = JSON.stringify(data.result);
                    this.selectedTabIndex = "Medical";

                    //this.navController.navigateForward('medical-profile1')
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
        // this.navController.navigateForward('medical-profile1')
        this.navController.navigateRoot('tabs/home')
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
    segmentChanged(event, name) {
        console.log(name);
    }

    //////////////////medical profile /////////
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
        console.log(this.medical_profile.value);
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

    //////////////////medical profile /////////
    medical_prob_list() {
        this.apiService.medical_problems_list().subscribe(data => {
            if (data.status_code = 200) {
                this.medical_problems_list = data.result;
                var list = []
                var a = this.dataService.userData.medical_problem.map(arg => {
                    console.log("arg", arg);
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
    updateList(ev, index) {
            console.log('length is :',ev.target.value.length);
            console.log('key is', ev.key);
            if(ev.target.value.length == '1'){
            console.log('trueeeeeeeeeeeeeeeeeee!!!!!!!!!!!!1');

            this.setFocus(index);
            }
            else{
            console.log('stop!');
            }
    }

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
}