import { Component, OnInit } from '@angular/core';
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
@Component({
  selector: 'app-package-upgrade',
  templateUrl: './package-upgrade.component.html',
  styleUrls: ['./package-upgrade.component.scss']
})
export class PackageUpgradeComponent implements OnInit {
	currentDate
  constructor(public apiService: ApiService,
 public loadingService: LoadingService,
public dataService: DataService,
 public alertService: AlertService) {
  var d = new Date();
 }

  ngOnInit() {
  }
  onSubmit(){
  	var a={}
  	this.loadingService.present();
    this.apiService.packageupdate(a).subscribe(data => {
      this.loadingService.dismiss();
      if (data.status_code == 200) {
       
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
