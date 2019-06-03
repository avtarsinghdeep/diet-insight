

import {
  ModalController
} from '@ionic/angular'
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  IonContent,
  ActionSheetController,
  Platform,
  PopoverController
} from '@ionic/angular';
import {
  ApiService,
  DataService,
  AlertService
} from '../shared/index';
import {
  Camera,
  CameraOptions
} from '@ionic-native/camera/ngx';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import {
  File
} from '@ionic-native/file/ngx';
import {
  environment
} from '../../environments/environment';
import {
  ServiceService
} from '../service.service'
import {
  Socket
} from 'ng-socket-io';
import {
  Observable
} from 'rxjs/Observable';
import {
  InAppBrowser,
  InAppBrowserOptions
} from '@ionic-native/in-app-browser/ngx';
import {
  MessageImagePopComponent
} from '../message-image-pop/message-image-pop.component';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
@Component({
  selector: 'app-adminchat',
  templateUrl: './adminchat.component.html',
  styleUrls: ['./adminchat.component.scss']
})
export class AdminchatComponent implements OnInit {
  messages: string[] = [];
  nickname = '';
  sender_id
  user: any;
  allMessage: any
  image
  imageblob
  slice: any;
  datata
  reader_result
  filePath
  imageData: any
  message
  chats
  length
  chatOn: boolean = true
  chatUpdate
  last = true;
  file: File;
  room_id
  user_online:boolean=false
    attachment="primary"
  primary="primary"
  roles_id
  id = this.dataService.userData.id
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('fileInput') fileInput;
  constructor(private photoViewer: PhotoViewer,public service: ServiceService, public modalController: ModalController, private iab: InAppBrowser, public actionSheetController: ActionSheetController, public apiService: ApiService, public dataService: DataService, public alertService: AlertService, private transfer: FileTransfer,

    private camera: Camera,
    private platform: Platform, public popoverController: PopoverController, private socket: Socket) {
    console.log('get user data on admin chat', this.dataService.userData);
    this.nickname = this.dataService.userData.firstname;
     console.log('dietician_id',this.dataService.dietician_id);
         var roles = this.dataService.roles_id.filter((v, i, a) => a.indexOf(v) === i);
    this.roles_id=roles
    console.log("roles_id",this.roles_id);
    // var sender_id = this.dataService.userData.user_id;

    var sender_id = this.dataService.userData.id;
  
    this.sender_id = parseInt(sender_id);
    let room_id=this.sender_id+""+1
    this.room_id=parseInt(room_id);
    //this.sendMessage();
    console.log(this.sender_id);
    console.log('room_id',this.room_id)
    this.getMessages()
      .subscribe((message: string) => {
        console.log(message);
        this.messages.push(message);
        setTimeout(() => {
      this.content.scrollToBottom()
    }, 1000)
      });



          this.getUsers().subscribe(data => {
        console.log(data);
        var c:any=data
        let user = data['user'];
        if (data['event'] === 'left') {
          console.log('User left: ' + user);
        //    if (c.idArray.length>0) {
        //   var online_id=c.idArray.filter(arg=>arg==1);
        //   if (online_id.length>0) {
        //     console.log("online")
        //     this.user_online=true
        //   }
        //   else{
        //      console.log("offline");
        //      this.user_online=false
        //   }
        // }

          
        } else {
          console.log('User joined: ' + user);
        // if (c.idArray.length>0) {
        //   var online_id=c.idArray.filter(arg=>arg==1);
        //   if (online_id.length>0) {
        //     console.log("online")
        //      this.user_online=true
        //   }
        //   else{
        //      console.log("offline");
        //       this.user_online=false
        //   }
        // }
          
        }
      });


          this.getUsersonline().subscribe(data => {
      console.log(data);
      var c: any = data;
      let user = data['user'];
      if (data['event'] == 'offline' || data['event'] == "offline") {
        console.log('User offline: ' + user);
           if (c.idArray.length > 0) {
          var online_id = c.idArray.filter(arg => this.roles_id.includes(arg));
          if (online_id.length > 0) {
            console.log("online")
            this.user_online = true
          } else {
            console.log("offline");
            this.user_online = false
          }
        }
        else{
          this.user_online = false
        }
      } else if (data['event'] == 'online' || data['event'] == "online"){
        console.log('User online: ' + user);

         if (c.idArray.length > 0) {
          var online_id = c.idArray.filter(arg => this.roles_id.includes(arg));
          if (online_id.length > 0) {
            console.log("online")
            this.user_online = true
          } else {
            console.log("offline");
            this.user_online = false
          }
        }
         else{
          this.user_online = false
        }
      }
    });
 

    //this.getAllMessage();
  }
  ngOnInit(){

  }
  ionViewDidEnter() {
           this.user = {
        room_id: this.room_id,
        sender_id: this.sender_id
      }
      var j={
        nickname:this.nickname,
         id:this.sender_id,
        event:"joined"
      }

       var online = {
      id: this.sender_id,
      nickname: this.nickname,
      event: "online"
    }
      console.log("j",j)
      console.log("user",this.user)
  
      // Connected, let's sign-up for to receive messages for this room
      this.socket.emit('set-nickname', j);
      this.socket.emit('room join', this.user);
       this.socket.emit('set-online', online);
    this.getsocketMessage();
  }

  // getAllMessage() {
  //   this.socket.emit('sendToAll', {
  //     room_id: 123,
  //     sender_id: this.sender_id
  //   });

  // }
  sendMessage() {
    console.log(this.message);
    var msg=this.message;
    if (msg==undefined || msg=="undefined" ||msg=='undefined' || msg=='') {
      console.log("if",msg)
    }
    else{
      console.log("else")
      msg=msg.trim();
      console.log(msg);
      if (msg=='' || msg=="" || msg==null || msg=="null") {
       console.log("null");
      }
      else{
        console.log("not null");
         this.primary = "tertiary";
    setTimeout(() => {
      this.primary = "primary"
    }, 2000)
         this.socket.emit('add-message', {
      name: this.nickname,
      room_id: this.room_id,
      message: msg,
      receiver_id: 1,
      sender_id: this.sender_id,
      types: 1
    });
    this.message = '';
      }
     
    }
  }

  // getMessagesAll() {
  //   let observable = new Observable(observer => {
  //     this.socket.on('message1', (data) => {
  //       console.log("message1", data)
  //       observer.next(data);
  //     });
  //   })
  //   return observable;
  // }
  getsocketMessage() {
    var a = {
      room_id: this.room_id,
      sender_id: this.sender_id
    }
    this.apiService.getsocketMessage(a)
      .subscribe(data => {
          console.log("getsocketMessage", data);
          this.messages = data.data;
                setTimeout(() => {
        this.content.scrollToBottom()
      }, 1000)
        },
        err => {
          console.log('Alert', 'Something went wrong...');
        })
  }

  getMessages() {
    return Observable.create((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        console.log("users-changed", data)
        observer.next(data);
      });
    });
    return observable;
  }

    getUsersonline() {
    let observable = new Observable(observer => {
      this.socket.on('users-online', (data) => {
        console.log("users-online", data)
        observer.next(data);
      });
    });
    return observable;
  }


  ionViewWillLeave() {
    console.log("leave");
     var j={
        nickname:this.nickname,
        id:this.sender_id,
        event:"left"
      }

  
      // Connected, let's sign-up for to receive messages for this room
      this.socket.emit('set-nickname', j);

       var online = {
      id: this.sender_id,
      nickname: this.nickname,
      event: "offline"
    }
    this.socket.emit('set-online', online);
    //this.socket.disconnect();
  }

  async onAttachment() {
     this.attachment="tertiary";
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.selectImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        //  {
        //   text: 'Gallery',
        //   icon: 'image',
        //   handler: () => {
        //     this.selectImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        //   }
        // },
        {
          text: 'File',
          icon: 'folder',
          handler: () => {
            this.fileInput.nativeElement.click();
            console.log('File clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
             this.attachment="primary"
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  selectImage(sourceType) {
    var options: CameraOptions;
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
      }
    } else if (this.platform.is('android')) {
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
      }
    } else {
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
      }
    }
    console.log(options);
    console.log(this.platform.is('android'));
    this.camera.getPicture(options).then((imageData) => {
      console.log("imageData", imageData)
      this.uploadPhoto(imageData);
      this.image = ( < any > window).Ionic.WebView.convertFileSrc(imageData);
      console.log(this.image);
    }, (err) => {
      console.log('err', err);
    });
  }

  private async uploadPhoto(imageFileUri: any) {

    (window as any).resolveLocalFileSystemURL(imageFileUri,
      entry => {
        entry['file'](file => this.readFile(file));
      });
  }

  private readFile(file: any) {
    console.log('imageFile is', file);
    this.slice = file.slice(0, 100000);
    console.log('SLICE IMAGE DATA: ', this.slice);
    console.log("file_name",file.name.split('.').pop());
    var extension=file.name.split('.').pop();
    if (extension=="pdf" || extension=="doc" || extension=="docx" || extension=="png" || extension=="jpeg" || extension=="jpg"  || extension=="PDF" || extension=="DOC" || extension=="DOCX" || extension=="PNG" || extension=="JPEG" || extension=="JPG") {
      const reader = new FileReader();
    var files = {},
      struct = {
        name: null,
        type: null,
        size: 0,
        data: [],
        slice: 0,
      };

    if (!files[file.name]) {
      files[file.name] = Object.assign({}, struct, file);
      files[file.name].data = [];
    }
    //convert the ArrayBuffer to Buffer
    // file = new Buffer(new Uint8Array(file));
    // console.log('inn uploading data images' + JSON.stringify(data.data));
    //save the data
    files[file.name].data.push(file);
    files[file.name].slice++;
    if (files[file.name].slice * 100000 >= files[file.name].size) {
      reader.readAsArrayBuffer(file);
      console.log('innn SLICE !!!!!', this.slice);


      reader.onload = (evt) => {
        this.reader_result = reader.result;
        console.log('READER RESULT IS', evt);
        // alert(this.reader_result);
        this.socket.emit('slice upload', {
          data: file,
          name: file.name,
          type: file.type,
          size: file.size,
          room_id: this.room_id,
          receiver_id: 1,
          types: 2,
          sender_id: this.sender_id,
          // data: this.reader_result
        });
          setTimeout(() => {
     this.attachment="primary"
    }, 5000)
        // this.postData(this.datata);
        console.log('inn file name', file.name + ' ' + file.type);
      }

    } else {
      console.log('request slice upload');
    }
    }
    else{
      this.alertService.presentAlert('Alert', 'Format not accepted!')
       this.attachment="primary"
    }
   
  }


  processWebImage(ev) {
    console.log('pdf event is:', ev);
    this.file = ev.target.files[0];
    console.log('inn PDF file name ', this.file);
    this.readFile(this.file);
  }


  onDismiss() {
    this.modalController.dismiss();
  }


  ionViewDidLeave() {
    this.chatOn = false
    console.log("leave admin", this.chatOn)
  }
  //   show() {
  //     this.chatUpdate = this.chats;
  //   }

  //   ngOnInit() {
  //     var user_id = {
  //       user_id: this.dataService.userData.id
  //     }
  //     this.apiService.chatlist(user_id).subscribe(data => {
  //       if (data.status_code == 200) {
  //         if (this.length == data.result.length) {
  //           console.log('equal');
  //           this.chats = data.result.reverse();
  //           setTimeout(() => {
  //             if (this.chatOn) {
  //               this.ngOnInit();
  //             }
  //           }, 10000);
  //         } else {
  //           console.log(' not equal');
  //           this.chats = data.result.reverse();
  //           this.show();
  //           setTimeout(() => {
  //             if (this.chatOn) {
  //               this.content.scrollToBottom(100)
  //               this.ngOnInit();
  //             }
  //           }, 5000);
  //         }
  //         this.length = data.result.length
  //         console.log(data.result.length);

  //       } else {

  //       }
  //     }, err => {
  //       this.alertService.presentAlert('Alert', 'Something went wrong...')
  //     })
  //   }


  //   upload_pic() {
  //     var fileTransfer: FileTransferObject = this.transfer.create();
  //     let options: FileUploadOptions = {
  //       fileKey: 'message',
  //       headers: {},
  //       chunkedMode: false,
  //       params: {
  //         sender_id: this.dataService.userData.id,
  //         receiver_id: 1
  //       }
  //     }
  //     fileTransfer.upload(this.filePath, `${environment.apiUrl}/send_attachment`, options)
  //       .then((data) => {
  //         if (data.responseCode == 200 && JSON.parse(data.response)['status_code'] == 200) {
  //           console.log("success");
  //         } else if (JSON.parse(data.response)['status_code'] == 200) {
  //           this.alertService.presentAlert('Alert', JSON.parse(data.response)['result']);
  //         } else {
  //           this.alertService.presentAlert('Alert', 'Something went wrong...')
  //         }
  //       }, (err) => {
  //         this.alertService.presentAlert('Alert1', 'Something went wrong...')

  //         console.log(err);
  //       })
  //   }


  //   processWebImage(event) {
  //     let reader = new FileReader();
  //     reader.onload = (readerEvent) => {
  //       this.imageData = (readerEvent.target as any).result;
  //       console.log(this.imageData);
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //     if (event.target.files.length > 0) {
  //       console.log("f", event.target.files[0]);
  //       let input: any = new FormData();
  //       input.append('sender_id', this.dataService.userData.id);
  //       input.append('receiver_id', 1);
  //       input.append('message', event.target.files[0]);
  //       this.apiService.filesend(input)
  //         .subscribe((data) => {
  //           console.log(data);
  //         }, (err) => {
  //           this.alertService.presentAlert('Alert1', 'Something went wrong...')
  //           console.log(err);
  //         })
  //     }
  //   }
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
  openFile(val) {
    console.log(val);
    const browser = this.iab.create(val, '_system');
    //  window.open(val);
  }
  //   onDismiss() {
  //     this.modalController.dismiss();
  //   }
  //   onSend(message) {
  //     if (message == undefined || message == 'undefined' || message == '' || message.trim() == '' || message.trim() == undefined) {
  //       console.log("m", message)
  //     } else {
  //       var a = {
  //         message: message,
  //         sender_id: this.dataService.userData.id,
  //         receiver_id: 1
  //       }
  //       this.apiService.adminchat(a).subscribe(data => {
  //         if (data.status_code == 200) {
  //           this.ngOnInit();
  //           this.message = "";
  //         } else {}
  //       }, err => {
  //         this.alertService.presentAlert('Alert', 'Something went wrong...')
  //       })
  //     }
  //   }
  async openImage(ev: any) {
    this.photoViewer.show(ev);
    // const popover = await this.popoverController.create({
    //   component: MessageImagePopComponent,
    //   componentProps: {
    //     event: ev
    //   },
    //   translucent: true,
    //   cssClass: 'custom-popover'
    // });
    // return await popover.present();
  }
  SpltFunc(val) {
    var a = val.split(environment.socketApi+'/images/');
    //var a = val.split('http://192.168.31.107:3001/images/');
    return a[1];
  }

  ionFocus() {
    console.log("ionFocus call");
                      setTimeout(() => {
        this.content.scrollToBottom()
      }, 1000)
  }

    valueReplace(str){
    var str1 = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
    return str1;
  }

}

