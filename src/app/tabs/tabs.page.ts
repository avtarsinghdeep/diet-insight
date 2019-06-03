import { Component } from '@angular/core';
import { DataService } from '../shared/index'
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
	constructor(public dataService:DataService){

	}
	TabsWillChange(event){
     console.log('event',event);
     this.dataService.tabPage=event.tab;
     console.log(event.tab);
	}
}
