

import {
	Component,
	OnInit
} from '@angular/core';
import {
	FileTransfer,
	FileUploadOptions,
	FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import {
	File
} from '@ionic-native/file/ngx';
import {
	ApiService,
	LoadingService,
	AlertService,
	DataService
} from '../shared/index'
import {
	InAppBrowser,
	InAppBrowserOptions
} from '@ionic-native/in-app-browser/ngx';
import {
	NavController,
	ToastController,
	Platform
} from '@ionic/angular';
import {
	SocialSharing
} from '@ionic-native/social-sharing/ngx';
@Component({
	selector: 'app-downloads-files',
	templateUrl: './downloads-files.page.html',
	styleUrls: ['./downloads-files.page.scss'],
})
export class DownloadsFilesPage {
	perc
	percIndex
	sent_file
	recieved_file
	value = "2"
	buttonColor
	preview
	preview1
	download1
	download
	downloadbuttonColor
	buttonColor1
	percIndex1
    perc1
	//items = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5']
	constructor(private socialSharing: SocialSharing, private transfer: FileTransfer,
		private file: File, private iab: InAppBrowser, public navController: NavController, public loadingService: LoadingService,
		public dataService: DataService,
		public alertService: AlertService, public apiService: ApiService, public toastController: ToastController, public platform: Platform) {}

	ionViewDidEnter() {
		// this.dataService.userData.id
		var a = {
			room_id: this.dataService.userData.id + "" + 1
		}
		this.loadingService.present();
		this.apiService.getFiles(a).subscribe(data => {
			this.loadingService.dismiss();
			if (data.status_code == 200) {
				var b = data.data;
				var c = b.filter(arg => arg.sender_id == this.dataService.userData.id);
				if (c.length > 0) {
					this.sent_file = c;
					console.log("C", c);
				}
				var d = b.filter(arg => arg.sender_id != this.dataService.userData.id);
				if (d.length > 0) {
					this.recieved_file = d;
					console.log("D", d);
				}

				console.log("data", this.sent_file);
			} else {
				//this.alertService.presentAlert('Alert', data.result);
				console.log(data)
			}
		}, err => {
			this.loadingService.dismiss();
			this.alertService.presentAlert('Alert', 'Something went wrong...')
			console.log(err)
		})
	}
	onView(val, index) {
		console.log("view");
		this.preview = index;
		this.buttonColor = '#c72228';
		setTimeout(() => {
			this.buttonColor = ""
		}, 5000)
		const browser = this.iab.create(val, '_system');
	}
	onView1(val, index) {
		console.log("view");
		this.preview1 = index;
		this.buttonColor1 = '#c72228';
		setTimeout(() => {
			this.buttonColor1 = ""
		}, 5000)
		const browser = this.iab.create(val, '_system');
	}
	onDownload1(index, file, filename) {
		// https://devdactic.com/html/5-simple-hacks-LBT.pdf
		this.download1 = index;
		this.downloadbuttonColor = '#c72228';
		setTimeout(() => {
			this.downloadbuttonColor = ""
		}, 5000)
		let downloadUrl = encodeURI(file);
		let path = '';
		let dir_name = 'DietInsight'; // directory to download - you can also create new directory
		let file_name = filename; //any file name you like
		let file_saved: any
		if (this.platform.is('android')) {
			file_saved = this.file.externalRootDirectory
		} else {
			file_saved = this.file.documentsDirectory
		}
		const fileTransfer: FileTransferObject = this.transfer.create();
		let result = this.file.createDir(file_saved, dir_name, true);
		result.then((resp) => {
			path = resp.toURL();
			console.log(path);
			this.percIndex1 = index
			fileTransfer.onProgress((progressEvent) => {
				console.log(progressEvent);
				var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
				console.log('perc', perc);

				this.perc1 = perc;
			});
			fileTransfer.download(downloadUrl, path + file_name).then((entry) => {
				console.log('download complete: ' + entry.toURL());
				if (this.platform.is('ios')) {
					this.socialSharing.share("Share"+file_name, "Share"+file_name, entry.toURL(), "").then(() => {
						console.log("shareSheetShare: Success");
					}).catch(() => {
						console.error("shareSheetShare: failed");
					});
				} else {
					this.presentToastWithOptions(entry.toURL());
				}
			}, (error) => {
				console.log(error)
			});
		}, (err) => {
			console.log('error on creating path : ' + err);
		});
	}
	onDownload(index, file, filename) {
		// https://devdactic.com/html/5-simple-hacks-LBT.pdf
		this.download = index;
		this.downloadbuttonColor = '#c72228';
		setTimeout(() => {
			this.downloadbuttonColor = ""
		}, 5000)
		let downloadUrl = file;
		let path = '';
		let dir_name = 'DietInsight'; // directory to download - you can also create new directory
		let file_name = filename; //any file name you like
		let file_saved: any
		if (this.platform.is('android')) {
			file_saved = this.file.externalRootDirectory
		} else {
			file_saved = this.file.documentsDirectory
		}
		const fileTransfer: FileTransferObject = this.transfer.create();
		let result = this.file.createDir(file_saved, dir_name, true);
		result.then((resp) => {
			path = resp.toURL();
			console.log(path);
			this.percIndex = index
			fileTransfer.onProgress((progressEvent) => {
				console.log(progressEvent);
				var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
				console.log('perc', perc);

				this.perc = perc;
			});
			fileTransfer.download(downloadUrl, path + file_name).then((entry) => {
				console.log('download complete: ' + entry.toURL());
				if (this.platform.is('ios')) {
					this.socialSharing.share("Share"+file_name, "Share"+file_name, entry.toURL(), "").then(() => {
						console.log("shareSheetShare: Success");
					}).catch(() => {
						console.error("shareSheetShare: failed");
					});
				} else {
					this.presentToastWithOptions(entry.toURL());
				}

			}, (error) => {
				console.log(error)
			});
		}, (err) => {
			console.log('error on creating path : ' + err);
		});
	}

	async presentToastWithOptions(url) {
		const toast = await this.toastController.create({
			message: 'File Download Successfully! ' + url,
			duration: 2000,
			position: "top"
		});
		toast.present();
	}

	info() {
		this.navController.navigateForward('help');
	}
	getImg(val) {
		//console.log('image data ', val);
		var a = val.split('.');
		if (a[a.length - 1] == 'png' || a[a.length - 1] == 'jpeg' || a[a.length - 1] == 'jpg' || a[a.length - 1] == 'PNG' || a[a.length - 1] == 'JPEG' || a[a.length - 1] == 'JPG') {
			return true;
		} else {
			return false;
		}
	}
	getdoc(val) {
		var a = val.split('.');
		if (a[a.length - 1] == 'doc' || a[a.length - 1] == 'docx' || a[a.length - 1] == 'DOC' || a[a.length - 1] == 'DOCX') {
			return true;
		} else {
			return false;
		}
	}
	getpdf(val) {
		var a = val.split('.');
		if (a[a.length - 1] == 'pdf' || a[a.length - 1] == 'PDF') {
			return true;
		} else {
			return false;
		}
	}

	SegmentFunc(event) {
		console.log("ev", event);
		this.ionViewDidEnter();
	}

}

