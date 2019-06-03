import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PopoverController,AlertController } from '@ionic/angular';
@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.page.html',
  styleUrls: ['./bmi.page.scss'],
})
export class BmiPage implements OnInit {
kg:number=null;
	cm:number=null;
  ft:number=null;
  in:number=null;
	bmi='00.0';
  weight_unit='kg';
  height_unit='cm';
  weight;
  height;
  options = {
    cssClass: 'alert-md alert-tappable'
  }
  constructor(public popoverController:PopoverController,public alertController: AlertController) { }

  ngOnInit() {
  }
    check_border(value,bmi:number){
    if(value==1){
      if(bmi<=16.5){return 'bolder';} else{return 'normal';}
    }else if(value==2){
      if(bmi>=16.5&&bmi<=18.5){return 'bolder';} else{return 'normal';}     
    }else if(value==3){
      if(bmi>=18.5&&bmi<=25){return 'bolder';} else{return 'normal';}     
    }else if(value==4){
      if(bmi>=25&&bmi<=30){return 'bolder';} else{return 'normal';}     
    }else if(value==5){
      if(bmi>=30&&bmi<=35){return 'bolder';} else{return 'normal';}     
    }else if(value==6){
      if(bmi>=35&&bmi<=40){return 'bolder';} else{return 'normal';}     
    }else if(value==7){
      if(bmi>=40){return 'bolder';} else{return 'normal';}     
    }
  }
  
    getDay(){
    return moment().format('MMMM Do YYYY')
  }
  check_enable(){
    if(this.height_unit=='cm'){
      if(isNaN(this.kg)||isNaN(this.cm)||this.cm<=1||this.kg<1){
        return true;
      }else{
        return false;
      }
    }else if(this.height_unit=='ft'){
      if(isNaN(this.kg)||isNaN(this.ft)||isNaN(this.in)||this.ft<1||this.in<1||this.kg<1){
        return true;
      }else{
        return false;
      }
    }
  }
  check(){
    if(this.weight_unit=='kg'){
      this.check1(this.kg);
    }else{
      this.check1(this.kg*2.20462);
    }
  }
  check1(value:number){
    if(this.height_unit=='cm'){
      this.check2(value,this.cm);
    }else{
      this.check2(value,this.ft*30.48+this.in*2.54);
    }
  }
  check2(weight,height){
    this.bmi = ((Math.round((weight/(height/100*height/100))*10))/10).toString()
  }
   async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: 'faqs',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Weight Unit',
      inputs: [
        {
          name: 'Kg',
          type: 'radio',
          label: 'Kg',
          value: 'kg',
          checked: true
        },
        {
          name: 'lb',
          type: 'radio',
          label: 'lb',
          value: 'lb'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok',data);
             this.weight_unit=data;
          }
        }
      ]
    });

    await alert.present();
  }

async openSelecterHeight() {
    const alert = await this.alertController.create({
      header: 'Height Unit',
      inputs: [
        {
          name: 'cm',
          type: 'radio',
          label: 'cm',
          value: 'cm',
          checked: true
        },
        {
          name: 'ft',
          type: 'radio',
          label: 'ft',
          value: 'ft'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok');
            this.height_unit=data;
          }
        }
      ]
    });

    await alert.present();
  }
}
