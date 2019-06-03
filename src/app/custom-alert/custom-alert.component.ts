import { Component, OnInit } from '@angular/core';
import {NavParams,PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss']
})


export class CustomAlertComponent implements OnInit {
	title
	msg
	type
	constructor(public navparams: NavParams, public popoverController: PopoverController) {
		this.title = this.navparams.get('title')
		this.msg = this.navparams.get('msg');
		this.type = this.navparams.get('type');

	}

	ngOnInit() {}
	onCancel() {
		var data = {
			status: false,
		}
		this.popoverController.dismiss(data);
	}
	onSubmit() {
		var data = {
			status: true,
			type: this.type
		}
		this.popoverController.dismiss(data);
	}

}

