

import {
  Component,
  OnInit
} from '@angular/core';
import {
  ApiService,
  LoadingService,
  AlertService,
  DataService
} from '../shared/index';
import {
  NavController
} from '@ionic/angular';
@Component({
  selector: 'app-mydietplan',
  templateUrl: './mydietplan.page.html',
  styleUrls: ['./mydietplan.page.scss'],
})


export class MydietplanPage implements OnInit {
  selected: number = null;
  dietchart
  i: number;
  type: number = null;
  time: string;
  name: string;
  status: boolean
  first: boolean = true
  todayDate: any;
  tomorrowDate
  constructor(public apiService: ApiService,
    public loadingService: LoadingService,
    public dataService: DataService,
    public navController: NavController,
    public alertService: AlertService) {}

  ngOnInit() {
    console.log("ngOnInit");
    console.log('tabs diet plan ', this.dataService.tabPage);
    // setTimeout(() => {
    //   if (this.dataService.tabPage == "mydietplan") {
    //     this.ionViewDidEnter();
    //   }
    //   this.ngOnInit();
    // }, 20000)
  }
  ionViewDidEnter() {
    let data = {
      user_id: this.dataService.userData.id
    }
    if (this.first) {
      this.loadingService.present();
    }

    this.apiService.dietplan_list(data).subscribe(data => {
      if (this.first) {
        this.loadingService.dismiss();
      }
      this.first = false

      if (data.status_code == 200) {
        if (this.first) {
          this.loadingService.dismiss()
        }
        var a;
        var MyArrayDummy = []
        var p;

        if (data.result.length == 1) {
          this.status = true
        } else {
          this.status = false
        }
        var date = new Date();
        var dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var mmm = date.getMonth() + 1;
        var mm = mmm < 10 ? '0' + mmm : mmm;
        var yyyy = date.getFullYear();
        console.log(dd + "-" + mm + "-" + yyyy)
        this.todayDate = dd + "-" + mm + "-" + yyyy;
        var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var tomorrowMonth = month < 10 ? '0' + month : month;
        var tomorrowDay = day < 10 ? '0' + day : day;
        var year = currentDate.getFullYear();
        this.tomorrowDate = tomorrowDay + "-" + tomorrowMonth + "-" + year;
        console.log(this.tomorrowDate);
        for (var i = 0; i < data.result.length; i++) {

          p = data.result[i];
          p.status = this.todayDate == data.result[i].date ? true : this.status;
          // p.showDay=this.todayDate==data.result[i].date?'Today':'';
          if (this.todayDate == data.result[i].date) {
            p.showDay = "Today"
          } else if (this.tomorrowDate == data.result[i].date) {
            p.showDay = "Tomorrow"
          } else {
            p.showDay = "";
          }
          MyArrayDummy.push(p);
        }
        this.dietchart = MyArrayDummy;
        console.log("diet_c", this.dietchart);
        var numericArray: number[] = [2, 3, 4, 1, 5, 8, 11];


        var sortedArray: String[] = this.dietchart.sort((n1, n2) => n2.date - n1.date);

        console.log('sorted array', sortedArray);

        console.log(data.result.length);
        for (var i = 0; i < data.result.length; i++) {
          this.type = data.result[i].type;
          // console.log(data.result[i]);

          for (var y = 0; y < data.result[i].meal.length; y++) {
            console.log("meals are:" + JSON.stringify(data.result[i].meal[y]));
            if (this.type == 1) {
              this.name = data.result[i].meal[y].name;
              console.log("type 1 name is :" + this.name);
            } else if (this.type == 2) {
              this.name = data.result[i].meal[y].mealName;
              console.log("type 2 name is :" + this.name);

              for (var z = 0; z < data.result[i].meal[y].foodItems.length; z++) {
                this.name = data.result[i].meal[y].foodItems[z].food1;
                console.log("type 2 FOOD ARRAY :" + this.name);
              }
            }
          }
        }
      } else if (data.status_code == 401) {
        localStorage.clear()
        this.dataService.userData = '';
        this.dataService.pageType = '';
        this.dataService.tabPage = '';
        this.loadingService.dismiss();
        this.navController.navigateRoot('login');
        this.alertService.presentAlert('Alert', 'Your Account has been Deleted due to some reason. Please contact concern company!');
      } else {
        this.dietchart = []
        if (this.first) {
          //this.alertService.presentAlert('Alert', data.result);
        }
      }
    }, err => {
      if (this.first) {
        this.loadingService.dismiss();
      }

      //this.alertService.presentAlert('Alert', 'Something went wrong...')
      console.log(err);
    })
  }

  // notification() {
  //   this.navController.navigateForward('notification');
  // }
  info() {
    this.navController.navigateForward('help');
  }

  selectedItems(index) {
    console.log(index);
    //this.selected = index;
    if (this.dietchart[index].status == true) {
      this.dietchart[index].status = false;
    } else {
      this.dietchart[index].status = true;
    }

    console.log(this.dietchart);
  }
  valueReplace(str) {
    var str1 = str.replace(/(?:\r\n|\r|\n)/g, '<br>');

    return str1;
  }
}

