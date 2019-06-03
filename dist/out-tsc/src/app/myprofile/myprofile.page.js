var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, Platform, PopoverController, IonSelect } from '@ionic/angular';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';
import { SelectCountryComponent } from '../select-country/select-country.component';
import { SelectStateComponent } from '../select-state/select-state.component';
import { SelectCityComponent } from '../select-city/select-city.component';
import { CountryCodeComponent } from '../country-code/country-code.component';
import { country_code } from '../country_code';
var MyprofilePage = /** @class */ (function () {
    function MyprofilePage(apiService, transfer, file, camera, platform, formBuilder, loadingService, actionSheetController, dataService, navController, popoverController, alertService) {
        this.apiService = apiService;
        this.transfer = transfer;
        this.file = file;
        this.camera = camera;
        this.platform = platform;
        this.formBuilder = formBuilder;
        this.loadingService = loadingService;
        this.actionSheetController = actionSheetController;
        this.dataService = dataService;
        this.navController = navController;
        this.popoverController = popoverController;
        this.alertService = alertService;
        this.img = 'assets/profile-user.png';
        this.country = null;
        this.state = null;
        this.city = null;
        this.Edit = false;
        this.profileuser = {};
        this.selectedTabIndex = "Personal";
        this.c_code = [];
        this.pIndex = false;
        this.weightSelecter = true;
        this.heightSelecter = false;
        this.General_Medical_profile = [{
                profile: 'Medical profile'
            },
            {
                profile: 'More details',
            }
        ];
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var phoneValidation = /^[1-9a-zA-Z][0-9a-zA-Z]*$/;
        this.img = this.dataService.userData.profile_image;
        this.profile = formBuilder.group({
            firstname: ['', Validators.compose([Validators.required])],
            lastname: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            phonenumber: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6), Validators.pattern(phoneValidation)])],
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
        this.All_Id = {};
    }
    MyprofilePage.prototype.onpersonalIndex = function () {
        this.pIndex = !this.pIndex;
    };
    MyprofilePage.prototype.selectCountry = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('country');
                        this.dataService.coutry_data = this.country;
                        return [4 /*yield*/, this.popoverController.create({
                                component: SelectCountryComponent,
                                cssClass: 'custom-popover'
                            })];
                    case 1:
                        alert = _a.sent();
                        alert.onDidDismiss().then(function (data) {
                            _this.country_selected = data.data[0];
                            _this.profile.controls.country.setValue(_this.country_selected.name);
                            _this.countryChange(_this.country_selected.country_id);
                            _this.All_Id.country_id = _this.country_selected.country_id;
                            _this.profile.controls.city.setValue(null);
                        });
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //STATES POPOVER
    MyprofilePage.prototype.selectState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: SelectStateComponent,
                            componentProps: {
                                states: this.state
                            },
                            cssClass: 'custom-popover'
                        })];
                    case 1:
                        alert = _a.sent();
                        alert.onDidDismiss().then(function (data) {
                            _this.state_selected = data.data;
                            _this.profile.controls.state.setValue(_this.state_selected.data);
                            _this.stateChange(_this.state_selected.state_id);
                            _this.All_Id.state_id = _this.state_selected.state_id;
                        });
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //CITIES POPOVER
    MyprofilePage.prototype.selectCity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('state');
                        return [4 /*yield*/, this.popoverController.create({
                                component: SelectCityComponent,
                                componentProps: {
                                    cities: this.city
                                },
                                cssClass: 'custom-popover'
                            })];
                    case 1:
                        alert = _a.sent();
                        alert.onDidDismiss().then(function (data) {
                            console.log('city', data);
                            _this.state_selected = data.data;
                            _this.profile.controls.city.setValue(_this.state_selected.data);
                            _this.All_Id.city_id = _this.state_selected.city_id;
                        });
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MyprofilePage.prototype.segmentChanged = function (event, name) {
        console.log(name);
    };
    MyprofilePage.prototype.onAdd = function (index) {
        this.indexval = index;
    };
    MyprofilePage.prototype.onSub = function (index) {
        this.indexval = 'aa' + index;
    };
    MyprofilePage.prototype.onEdit = function (val) {
        console.log("edit call");
        this.Edit = !this.Edit;
        // this.profile.controls.country.setValue(this.country_selected.name);
        if (val == 1) {
            this.selectedTabIndex = "Personal";
        }
        else {
            this.selectedTabIndex = "Medical";
        }
        //this.navController.navigateForward('')
    };
    MyprofilePage.prototype.chack = function () {
        if (this.profile.valid) {
            return false;
        }
        else {
            return true;
        }
    };
    MyprofilePage.prototype.chack1 = function () {
        if (this.profile.valid && this.medical_profile.valid) {
            return false;
        }
        else {
            return true;
        }
    };
    MyprofilePage.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            console.log('loaded');
            _this.c_code = country_code;
            console.log("country code", _this.c_code);
            _this.checkFlag();
            console.log('flaggggggg', _this.flag);
            _this.img = _this.flag;
        }, 1000);
        this.first = true;
        this.profileuser = this.dataService.userData;
        console.log('PROFILE DATA', this.profileuser);
        // this.user.country_code = '+91';
        // this.img = environment.apiUrl+'/flags/in.svg';
        if (this.dataService.userData.dob) {
            this.correctDob = this.dataService.userData.dob.split('-')[2] + '-' + this.dataService.userData.dob.split('-')[1] + '-' + this.dataService.userData.dob.split('-')[0];
            console.log('DOBBBBBBBB', this.dataService.userData.dob.split('-')[2] + '-' + this.dataService.userData.dob.split('-')[1] + '-' + this.dataService.userData.dob.split('-')[0]);
        }
        this.profile.controls.firstname.setValue(this.dataService.userData.firstname);
        this.profile.controls.lastname.setValue(this.dataService.userData.lastname);
        this.profile.controls.email.setValue(this.dataService.userData.email);
        this.profile.controls.phonenumber.setValue(this.dataService.userData.mobile);
        this.profile.controls.country.setValue(this.dataService.userData.country_name);
        this.dial_code = this.dataService.userData.country_code;
        this.All_Id.country_id = this.dataService.userData.country;
        this.profile.controls.gender.setValue(this.dataService.userData.gender);
        this.profile.controls.dob.setValue(this.dataService.userData.dob);
        function getAge(dateString) {
            console.log("Datastring", dateString);
            if (dateString == null || dateString == 'null' || dateString == undefined || dateString == 'undefined') {
                console.log("null");
                return 0;
            }
            else {
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
        this.getAGE = getAge(this.dataService.userData.dob);
        this.profile.controls.state.setValue(this.dataService.userData.state);
        // this.profile.controls.address.setValue(this.dataService.userData.address);
        //////medical profile ////////////////
        // this.medical_profile.controls.height.setValue(this.dataService.userData.height);
        this.cm = this.dataService.userData.height;
        //this.chageHeight(this.dataService.userData.height);
        this.medical_profile.controls.height.setValue(Math.round(this.dataService.userData.height));
        this.realFeet = ((this.cm * 0.393700) / 12);
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
        this.apiService.countries().subscribe(function (data) {
            _this.loadingService.dismiss();
            if (data.status_code == 200) {
                _this.country = data.result;
                _this.countryChange(_this.All_Id.country_id);
                _this.profile.controls.country.setValue(null);
                _this.All_Id.country_id = "";
                if (_this.first) {
                    _this.profile.controls.country.setValue(_this.dataService.userData.country_name);
                    _this.All_Id.country_id = _this.dataService.userData.country;
                }
            }
            else {
                _this.alertService.presentAlert('Alert', data.result);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
            console.log(err);
        });
        this.medical_prob_list();
    };
    MyprofilePage.prototype.checkFlag = function () {
        var _this = this;
        this.flag = this.c_code.filter(function (a) {
            // return this.signup_form.value.country_code == a.dial_code
            return _this.dial_code == a.dial_code;
        })[0].img;
    };
    //states
    MyprofilePage.prototype.countryChange = function (id) {
        var _this = this;
        this.loadingService.present();
        this.apiService.stateList({
            country_id: id
        }).subscribe(function (data) {
            _this.loadingService.dismiss();
            if (data.status_code == 200) {
                _this.state = data.result;
                _this.profile.controls.state.setValue(null);
                _this.All_Id.state_id = "";
                if (_this.first) {
                    _this.profile.controls.state.setValue(_this.dataService.userData.state_name);
                    _this.All_Id.state_id = _this.dataService.userData.state;
                }
                _this.stateChange(_this.dataService.userData.state);
            }
            else {
                _this.alertService.presentAlert('Alert', data.result);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
            console.log(err);
        });
    };
    //cities
    MyprofilePage.prototype.stateChange = function (idd) {
        var _this = this;
        if (this.profile.value.state != null) {
            if (!this.first) {
                this.profile.controls.city.setValue(null);
            }
            this.loadingService.present();
            this.apiService.cityList({
                state_id: idd
            }).subscribe(function (data) {
                _this.loadingService.dismiss();
                if (data.status_code == 200) {
                    _this.city = data.result;
                    _this.profile.controls.city.setValue(null);
                    _this.All_Id.city_id = "";
                    if (_this.first) {
                        _this.profile.controls.city.setValue(_this.dataService.userData.city_name);
                        _this.All_Id.city_id = _this.dataService.userData.city;
                    }
                    _this.first = false;
                }
                else {
                    _this.alertService.presentAlert('Alert', data.result);
                    console.log(data);
                }
            }, function (err) {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', 'Something went wrong...');
                console.log(err);
            });
        }
    };
    MyprofilePage.prototype.submit = function () {
        // let data = {
        //   user_id: this.dataService.userData.id,
        //   ...this.profile.value
        // }
        var _this = this;
        if (this.profile.valid) {
            var data = {
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
            };
            console.log("", data);
            this.loadingService.present();
            this.apiService.personal_profile(data).subscribe(function (data) {
                _this.loadingService.dismiss();
                if (data.status_code == 200) {
                    localStorage['userDetail'] = JSON.stringify(data.result);
                    _this.dataService.userData = data.result;
                    _this.Edit = !_this.Edit;
                    _this.ngOnInit();
                    //this.selectedTabIndex = "Medical";
                }
                else {
                    _this.alertService.presentAlert('Alert', data.result);
                }
            }, function (err) {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', 'Something went wrong...');
                console.log(err);
            });
        }
        else {
            this.alertService.presentAlert('Alert', 'Please fill all fields.');
        }
    };
    MyprofilePage.prototype.cancel = function () {
        if (this.Edit) {
            this.Edit = !this.Edit;
        }
    };
    MyprofilePage.prototype.skip = function () {
        this.navController.navigateForward('medical-profile1');
    };
    MyprofilePage.prototype.editProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [{
                                    text: 'Camera',
                                    icon: 'camera',
                                    handler: function () {
                                        _this.selectImage(_this.camera.PictureSourceType.CAMERA);
                                    }
                                }, {
                                    text: 'Gallery',
                                    icon: 'image',
                                    handler: function () {
                                        _this.selectImage(_this.camera.PictureSourceType.PHOTOLIBRARY);
                                    }
                                }, {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyprofilePage.prototype.selectImage = function (sourceType) {
        var _this = this;
        var options;
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
            };
        }
        else if (this.platform.is('android')) {
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
            };
        }
        else {
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
            };
        }
        this.camera.getPicture(options).then(function (imageData) {
            // alert(imageData)
            _this.filePath = imageData;
            _this.upload_pic();
        }, function (err) {
            _this.alertService.presentAlert('Alert', "Something went wrong...");
            // alert(err);
        });
    };
    MyprofilePage.prototype.upload_pic = function () {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var options = {
            fileKey: 'image',
            headers: {},
            chunkedMode: false,
            mimeType: "image/jpg",
        };
        fileTransfer.upload(this.filePath, environment.apiUrl + "/update_profile_image/" + this.dataService.userData.id, options)
            .then(function (data) {
            if (data.responseCode == 200 && JSON.parse(data.response)['status_code'] == 200) {
                _this.dataService.userData.profile_image = JSON.parse(data.response)['result']['profile_image'];
                console.log("pr", _this.dataService.userData);
                localStorage['profile_img'] = JSON.parse(data.response)['result']['profile_image'];
                console.log(localStorage['profile_img']);
            }
            else if (JSON.parse(data.response)['status_code'] == 200) {
                _this.alertService.presentAlert('Alert', JSON.parse(data.response)['result']);
            }
            else {
                _this.alertService.presentAlert('Alert', 'Something went wrong...');
            }
        }, function (err) {
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
            // alert(JSON.stringify(err))
            console.log(err);
        });
    };
    //////////////////medical profile /////////
    MyprofilePage.prototype.medical_prob_list = function () {
        var _this = this;
        this.apiService.medical_problems_list().subscribe(function (data) {
            if (data.status_code = 200) {
                _this.medical_problems_list = data.result;
                var list = [];
                var a = _this.dataService.userData.medical_problem.map(function (arg) {
                    console.log("arg", arg);
                    list.push(parseInt(arg));
                });
                _this.medical_profile.controls.medical_problem.setValue(list);
            }
            else {
                _this.medical_problems_list = [{
                        id: 0,
                        problem_name: "Data not Found"
                    }];
            }
        }, function (err) {
            console.log(err);
        });
    };
    MyprofilePage.prototype.chageHeight = function (heightSelecter) {
        console.log("h", heightSelecter);
        this.medical_profile.controls.height.touched = true;
        if (heightSelecter) {
            console.log("if");
            this.medical_profile.controls.height.setValue(this.cm);
        }
        else if (this.feet >= 0 && this.inch >= 0) {
            console.log("else");
            this.medical_profile.controls.height.setValue(Math.round((this.feet * 30.48) + (this.inch * 2.54)));
        }
    };
    MyprofilePage.prototype.medicalsubmit = function () {
        var _this = this;
        if (this.medical_profile.valid) {
            this.loadingService.present();
            var data = __assign({ user_id: this.dataService.userData.id }, this.medical_profile.value);
            this.apiService.medical_profile(data).subscribe(function (data) {
                _this.loadingService.dismiss();
                if (data.status_code == 200) {
                    localStorage['userDetail'] = JSON.stringify(data.result);
                    _this.selectedTabIndex = "Complete";
                    //this.ngOnInit();
                    // this.navController.navigateForward('medical-profile2')
                }
                else {
                    _this.alertService.presentAlert('Alert', data.result);
                }
            }, function (err) {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', 'Something went wrong...');
                console.log(err);
            });
        }
        else {
            this.alertService.presentAlert('Alert', 'Please fill all fields.');
        }
    };
    //////////////////complete profile /////////////
    MyprofilePage.prototype.completesubmit = function () {
        var _this = this;
        if (this.profile.valid && this.medical_profile.valid) {
            if (this.medical_profile2.valid) {
                this.loadingService.present();
                var data = __assign({ user_id: this.dataService.userData.id }, this.medical_profile2.value);
                this.apiService.medical_profile(data).subscribe(function (data) {
                    _this.loadingService.dismiss();
                    if (data.status_code == 200) {
                        localStorage['userDetail'] = JSON.stringify(data.result);
                        localStorage['detailDone'] = "true";
                        _this.Edit = !_this.Edit;
                        _this.ngOnInit();
                        //this.navController.navigateForward('medical-profile3')
                        //this.navController.navigateRoot('tabs/home')
                    }
                    else {
                        _this.alertService.presentAlert('Alert', data.result);
                    }
                }, function (err) {
                    _this.loadingService.dismiss();
                    _this.alertService.presentAlert('Alert', 'Something went wrong...');
                    console.log(err);
                });
            }
            else {
                this.alertService.presentAlert('Alert', 'Please fill all fields.');
            }
        }
        else {
            this.alertService.presentAlert('Alert', 'Please fill all fields in personal & medical profile.');
        }
    };
    MyprofilePage.prototype.JFunc = function (data) {
        return JSON.parse(data);
    };
    MyprofilePage.prototype.onBack = function (val) {
        if (val == 1) {
            this.navController.back();
        }
        else if (val == 2) {
            this.selectedTabIndex = "Personal";
        }
        else if (val == 3) {
            this.selectedTabIndex = "Medical";
        }
    };
    MyprofilePage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
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
    MyprofilePage.prototype.setFocus = function (index) {
        switch (index) {
            case 0:
                this.height1.setFocus();
                break;
            case 1:
                this.height2.setFocus();
                break;
        }
    };
    MyprofilePage.prototype.updateList = function (ev, index) {
        console.log(ev.target.value.length);
        console.log(ev.key);
        if (ev.target.value.length == '1') {
            console.log('trueeeeeeeeeeeeeeeeeee!!!!!!!!!!!!1');
            this.setFocus(index);
        }
        else {
            console.log('stop!');
        }
    };
    MyprofilePage.prototype.SelectCountryCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('codes');
                        return [4 /*yield*/, this.popoverController.create({
                                component: CountryCodeComponent,
                                componentProps: {
                                    codes: this.c_code
                                },
                                cssClass: 'custom-popover'
                            })];
                    case 1:
                        alert = _a.sent();
                        alert.onDidDismiss().then(function (data) {
                            console.log("codeeee after", data);
                            _this.state_selected = data;
                            _this.img = _this.state_selected.data.code_image;
                            _this.dial_code = _this.state_selected.data.dial_code;
                            console.log('dial', _this.dial_code);
                            // this.user.country_code=this.state_selected.data.dial_code;
                            // this.signup_form.controls.country_code.setValue(this.state_selected.data.dial_code);
                        });
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        ViewChild('height1'),
        __metadata("design:type", Object)
    ], MyprofilePage.prototype, "height1", void 0);
    __decorate([
        ViewChild('height2'),
        __metadata("design:type", Object)
    ], MyprofilePage.prototype, "height2", void 0);
    __decorate([
        ViewChild('countryTag'),
        __metadata("design:type", IonSelect)
    ], MyprofilePage.prototype, "countryTag", void 0);
    __decorate([
        ViewChild('stateTag'),
        __metadata("design:type", IonSelect)
    ], MyprofilePage.prototype, "stateTag", void 0);
    __decorate([
        ViewChild('cityTag'),
        __metadata("design:type", IonSelect)
    ], MyprofilePage.prototype, "cityTag", void 0);
    MyprofilePage = __decorate([
        Component({
            selector: 'app-myprofile',
            templateUrl: './myprofile.page.html',
            styleUrls: ['./myprofile.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            FileTransfer,
            File,
            Camera,
            Platform,
            FormBuilder,
            LoadingService,
            ActionSheetController,
            DataService,
            NavController,
            PopoverController,
            AlertService])
    ], MyprofilePage);
    return MyprofilePage;
}());
export { MyprofilePage };
//# sourceMappingURL=myprofile.page.js.map