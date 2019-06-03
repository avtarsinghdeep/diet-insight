import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment'
const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type':  'application/json',
    // 'Content-Type':  'application/x-www-form-urlencoded',
    // 'Accept':'application/json, text/plain, */*',
    // // 'Authorization': 'my-auth-token'
    // 'Access-Control-Allow-Headers': 'x-same-domain',
    // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    // 'Access-Control-Allow-Origin': '*',
    // 'Allow': 'POST, GET, OPTIONS, PUT, DELETE'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient) {
  }
  register(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/register',data,httpOptions)
    .pipe(catchError(this.handleError));
  }
  login(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/login',data,httpOptions)
    .pipe(catchError(this.handleError));
  }
  forget_password(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/forget_password',data,httpOptions)
    .pipe(catchError(this.handleError));
  }
  change_password(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/change_password',data,httpOptions)
    .pipe(catchError(this.handleError));
  }
  services_list() : Observable <any>{
    return this.http.get(environment.apiUrl+'/services_list',httpOptions)
    .pipe(catchError(this.handleError));
  }
  recipe_list() : Observable <any>{
    return this.http.get(environment.apiUrl+'/recipes_list',httpOptions)
    .pipe(catchError(this.handleError));
  }
  buy_package(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/buy_package',data,httpOptions)
    .pipe(catchError(this.handleError));
  }

  countries() : Observable <any>{
    return this.http.get(environment.apiUrl+'/countries',httpOptions)
    .pipe(catchError(this.handleError));
  } 
  stateList(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/stateList',data,httpOptions)
    .pipe(catchError(this.handleError));
  }
  cityList(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/cityList',data,httpOptions)
    .pipe(catchError(this.handleError));
  }

  personal_profile(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/personal_profile',data,httpOptions)
    .pipe(catchError(this.handleError));
  }
  medical_problems_list() : Observable <any>{
    return this.http.get(environment.apiUrl+'/medical_problems_list',httpOptions)
    .pipe(catchError(this.handleError));
  }
  medical_profile(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/medical_profile',data,httpOptions)
    .pipe(catchError(this.handleError));
  }
  userPackage(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/my_package',data,httpOptions)
    .pipe(catchError(this.handleError));
  }
  chatlist(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/message_list',data,httpOptions)
    .pipe(catchError(this.handleError));
  }
  adminchat(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/send_message',data,httpOptions)
    .pipe(catchError(this.handleError));
  }
  appointment_list(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/appointment_list',data,httpOptions)
    .pipe(catchError(this.handleError));
  }
  save_payment_method(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/save_payment_method',data,httpOptions)
    .pipe(catchError(this.handleError));
  }
  testimonial_list() : Observable <any>{
    return this.http.get(environment.apiUrl+'/testimonials',httpOptions)
    .pipe(catchError(this.handleError));
  }
    filesend(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/send_attachment',data)
    .pipe(catchError(this.handleError));
  }
  packageupdate(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/package_update',data)
    .pipe(catchError(this.handleError));
  }
  upgradePackage(data) : Observable <any>{
    return this.http.post(environment.apiUrl+'/upgrade_package',data)
    .pipe(catchError(this.handleError));
  }
  appointment_reschedule_request(data) : Observable <any>{
   return this.http.post(environment.apiUrl+'/appointment_reschedule_request',data,httpOptions)
   .pipe(catchError(this.handleError));
 }
 fooditems() : Observable <any>{
   return this.http.get(environment.apiUrl+'/food_items',httpOptions)
   .pipe(catchError(this.handleError));
 }
 add_user_meal(data) : Observable <any>{
   return this.http.post(environment.apiUrl+'/add_user_meal',data,httpOptions)
   .pipe(catchError(this.handleError));
 }
 user_daily_meals(data) : Observable <any>{
   return this.http.post(environment.apiUrl+'/user_daily_meals',data,httpOptions)
   .pipe(catchError(this.handleError));
 }
 add_user_weight(data) : Observable <any>{
   return this.http.post(environment.apiUrl+'/add_user_weight',data,httpOptions)
   .pipe(catchError(this.handleError));
 }
 user_weight_history(data) : Observable <any>{
   return this.http.post(environment.apiUrl+'/user_weight_history',data,httpOptions)
   .pipe(catchError(this.handleError));
 }
 add_water_intake(data) : Observable <any>{
   return this.http.post(environment.apiUrl+'/add_water_intake',data,httpOptions)
   .pipe(catchError(this.handleError));
 }
 water_intake_history(data) : Observable <any>{
   return this.http.post(environment.apiUrl+'/water_intake_history',data,httpOptions)
   .pipe(catchError(this.handleError));
 }
   time_slots() : Observable <any>{
     return this.http.get(environment.apiUrl+'/time_slots',httpOptions)
     .pipe(catchError(this.handleError));
   }
 dashboard(data) : Observable <any>{
   return this.http.post(environment.apiUrl+'/dashboard',data,httpOptions)
   .pipe(catchError(this.handleError));
 }
   faq_list() : Observable <any>{
  return this.http.get(environment.apiUrl+'/faqs',httpOptions)
  .pipe(catchError(this.handleError));
  }
  dietplan_list(data) : Observable <any>{
  return this.http.post(environment.apiUrl+'/dietcharts',data,httpOptions)
  .pipe(catchError(this.handleError));
  }
  notification_list(data) : Observable <any>{
  return this.http.post(environment.apiUrl+'/user_notification_list',data,httpOptions)
  .pipe(catchError(this.handleError));
  }
  onBreak(data) : Observable <any>{
  return this.http.post(environment.apiUrl+'/add_user_break',data,httpOptions)
  .pipe(catchError(this.handleError));
  }
  getPaytmTransactionId(data):Observable<any>{
  return this.http.post(environment.apiUrl+'/getPaytmTransactionId',data,httpOptions);
  }
  sendRegisterOtp(data):Observable<any>{
  return this.http.post(environment.apiUrl+'/sendRegisterOtp',data,httpOptions);
  }
  notification_clearlist(data) : Observable <any>{
  return this.http.post(environment.apiUrl+'/user_notification_list_clear',data,httpOptions)
  .pipe(catchError(this.handleError));
  }

  getsocketMessage(data):Observable<any>{
  return this.http.post(environment.socketApi+'/api/getsocketMessage',data,httpOptions);
  }
   getFiles(data):Observable<any>{
  return this.http.post(environment.socketApi+'/api/getFiles',data,httpOptions);
  }
    notification_settings(data):Observable<any>{
    return this.http.post(environment.apiUrl+'/notificationSettings',data,httpOptions);
    }

  // getpayResponse(data) : Observable <any>{
  // return this.http.get(data)
  // .pipe(catchError(this.handleError));
  // }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError('An error occurred:' + error.error.message);
    }else if(!window.navigator.onLine) {
      return throwError('Internet is required');
      console.error(`Backend returned code ${error.status}, `+`body was: ${error.error}`);
    }
    return throwError('Something went wrong...');
  };


}


