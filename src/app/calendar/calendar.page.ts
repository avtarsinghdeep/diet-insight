import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { DataService,LoadingService} from '../shared/index';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
	@Output() dateEvent = new EventEmitter<string>();
	month:any=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  	days:any=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    selectedMonth;
    daysinmonth;
    selectedYear;
    date:number;
    year;
    leapornot;
    totaldays;
    oddDays
    res_yyyy
    res_mm
    res_dd
    monthfirstday;
    datecolor:string=null;
    box:any=['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','']
  constructor(public dataService: DataService,public loadingService: LoadingService) {
  	let m=new Date();
  	this.selectedYear=m.getFullYear()
  	this.selectedMonth=m.getMonth()
     this.loadingService.dismiss();
   console.log("getMonth",m.getMonth());
   
    console.log("reschedule date",this.dataService.appointment_date);
    var c=this.dataService.appointment_date.split('-');
    this.res_yyyy=c[2];
    this.res_mm=c[1]<10?c[1].replace(/^0+/, ''):c[1];
    this.res_dd=c[0]<10?c[0].replace(/^0+/, ''):c[0];
    console.log(this.res_yyyy+"-"+this.res_mm+"-"+this.res_dd);
    this.selectedYear=parseInt(this.res_yyyy);
     this.selectedMonth=parseInt(this.res_mm)-1;
      this.calculate();
   
    //document.getElementById(this.datecolor).style.border = 'none';
    //this.pickDate(this.res_dd);
  }
  ngAfterViewInit(){
     this.loadingService.present();
    console.log("ngAfterViewInit");
     setTimeout(()=>{
        this.loadingService.dismiss();
       this.pickDate(parseInt(this.res_dd));
     },5000);
  }
  pickDate(value){
    console.log("val",typeof(value));
    if(value!=null){
      console.log("1");
      if(this.datecolor!=null){
         console.log("2");
        document.getElementById(this.datecolor).style.border = 'none';
        // document.getElementById(this.datecolor).style.color = "black";
        this.datecolor=null;
        this.pickDate(value);
      }
      if(this.datecolor==null){
         console.log("3");
        this.datecolor = value + 'datediv';
        console.log("datecolor",typeof(this.datecolor));
        document.getElementById(this.datecolor).style.border = '1px solid #94c03e';
        // document.getElementById(this.datecolor).style.color = "white";
        this.dateEvent.emit(this.selectedYear +'-'+ (this.selectedMonth+1) +'-'+ value)
        console.log(value+'-'+(this.selectedMonth+1)+'-'+this.selectedYear);
      }
    }else{
       console.log("4");
    	if(this.datecolor!=null){
         console.log("5");
	        document.getElementById(this.datecolor).style.border = 'none';
	        // document.getElementById(this.datecolor).style.color = "black";
	        this.datecolor=null;
	        this.pickDate(value);
	      }
    }
  }
  calculate(){
    if((this.selectedYear % 4 == 0 && this.selectedYear % 100 !=0) || this.selectedYear % 400 == 0 )
    {
      this.leapornot='leap'
      this.totaldays=366;
      if(this.selectedMonth+1==1 || this.selectedMonth+1==3 || this.selectedMonth+1==5 || this.selectedMonth+1==7 || this.selectedMonth+1==8 || this.selectedMonth+1==10 || this.selectedMonth+1==12)
      {this.daysinmonth=31;}
      if(this.selectedMonth+1==2)
      {this.daysinmonth=29;}
      if(this.selectedMonth+1==4 || this.selectedMonth+1==6 || this.selectedMonth+1==9 || this.selectedMonth+1==11) 
      {this.daysinmonth=30;}
    }
    else{
      this.leapornot='not leap'
      this.totaldays=365;
      if(this.selectedMonth+1==1 || this.selectedMonth+1==3 || this.selectedMonth+1==5 || this.selectedMonth+1==7 || this.selectedMonth+1==8 || this.selectedMonth+1==10 || this.selectedMonth+1==12)
      {this.daysinmonth=31;}
      if(this.selectedMonth+1==2)
      {this.daysinmonth=28;}
      if(this.selectedMonth+1==4 || this.selectedMonth+1==6 || this.selectedMonth+1==9 || this.selectedMonth+1==11) 
      {this.daysinmonth=30;}
    }
    this.calculatedays();
    let z=1 
    for(let i=0;i<this.box.length;i++){
      if(i>=this.monthfirstday){
        if(z<=this.daysinmonth){
          this.box[i]=z;
          z++;
        }
        else{
          this.box[i]=null;
        }
      }
      else{
        this.box[i]=null;
      }
    }
  }
  getDate(){
  	return 'hello';
  }
  previousMonth(){
  	this.pickDate(null);
    this.dateEvent.emit(null);
    if(this.selectedMonth>0){
      this.selectedMonth=this.selectedMonth-1;  
    }else{
      this.selectedMonth=11;
      this.selectedYear--;
    }
    this.calculate();
  }
  nextMonth(){
  	this.pickDate(null);
    this.dateEvent.emit(null);
  	if(this.selectedMonth<11){
  		this.selectedMonth=this.selectedMonth+1;	
  	}else{
  		this.selectedMonth=0;
  		this.selectedYear++;
  	}
    this.calculate();
  }
  calculatedays(){
    let d=0;
    this.oddDays = this.selectedYear % 400
    // console.log(this.oddDays)
    for(let i=this.oddDays;i>0;i--){
      if((i % 4 == 0 && i % 100 != 0) || i % 400 == 0){
        d=d+2
        // console.log('leap')
      }
      else{
        d=d+1
        // console.log('not leap')
      } 
    }
    if(d>7){
      d = d % 7
    }
    let a = this.odddaysinmonth();
    // console.log((a+d)%7)
    this.monthfirstday=(a+d)%7;
  }
  odddaysinmonth(){
    let d=0
    let m=[31,28,31,30,31,30,31,31,30,31,30,31]
    for(let i=0;i<this.selectedMonth;i){
        d=d+m[i];i++;
    } 
    if((this.selectedYear % 4 == 0 && this.selectedYear % 100 !=0) || this.selectedYear % 400 == 0){
      d=d+1;
    }  
    return d;
  }

}
