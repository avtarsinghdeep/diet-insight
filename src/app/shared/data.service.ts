import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data:any={};
  pageType:any={};
  userData:any={};
  appointment_id:any
  appointment_type:any
   meal_name:any
   meal_time:any
   mealType={}
   mealtypePage:any
   dietician_name:any
   signupDATA:any
   otpValue:any
   tabPage:any;
   coutry_data:any;
   dashboard_nav:boolean
   platform:any;
   appointment_date:any
   upgrade_status:any
   dietician_id:any
   roles_id:any;
   reschedule:boolean
  constructor() {
  }
}
