import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsClientService } from 'src/app/services/items-client.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Item } from 'src/app/item';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  item: Item;
  data: string;
  sliderConfig: {};

  photos: any;

  constructor(
    private route: ActivatedRoute,
    private itemsClientService: ItemsClientService,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private file: File,
  ) {
    this.item = {
      title: '',
      description: ''
    };

    this.photos = [];

    this.sliderConfig = {
      slidesPerView: 1.6,
      spaceBetween: 10,
      centeredSlides: true,
    };
  }


  ngOnInit() {
    const params = this.route.snapshot.params;
    if (params.id) {
      this.itemsClientService.getItem(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.item = res;
          },
          err => console.log(err)
        );
    }
  }
  deleteItem(id: string): void {
    this.alertCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.itemsClientService.deleteItem(id)
              .subscribe(
                res => {
                  console.log(res);
                  this.router.navigateByUrl('/');
                },
                err => console.log(err)
              );
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  updateItem() {
    this.validation();
    this.itemsClientService.updateItem(this.item._id, this.item)
      .subscribe(
        async res => {
          const toast = await this.toastCtrl.create({
            position: 'top',
            message: 'Item saved',
            duration: 3000
          });
          console.log(res);
          toast.present();
          this.router.navigate(['/items']);
        },
        err => console.log(err)
      );
  }

  takePhotos() {
    const options: CameraOptions = {
      quality: 100,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
    }

    this.camera.getPicture().then((imageData) => {
      const filename = imageData.substring(imageData.lastIndexOf('/') + 1);
      const path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
      this.file.readAsDataURL(path, filename).then((base64data) => {
        this.photos.push(base64data);
      });
    });
  }

  private validation() {
    if (!this.item.title) {
      return;
    }
    if (!this.item.description) {
      return;
    }
  }
}
