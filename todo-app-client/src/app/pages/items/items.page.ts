import { ItemsClientService } from './../../services/items-client.service';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/item';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  items: Item[];
  item: Item;
  photos: any;

  constructor(
    private itemsClientService: ItemsClientService,
    private router: Router,
    private camera: Camera,
    private file: File
  ) {
    this.items = [];

    this.item = {
      title: '',
      description: ''
    };

    this.photos = [];
  }

  ionViewWillEnter() {
    this.getItems();
  }

  ngOnInit() {
  }

  getItems() {
    this.itemsClientService.getItems()
      .subscribe(x => {
        this.items = x;
      });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getItems();
      event.target.complete();
    }, 2000);
  }

  addItem() {
    this.validation();
    this.itemsClientService.addItem(this.item)
      .subscribe(res => {
        console.log(res);
        this.getItems();
      },
        err => console.log(err)
      );
  }

  navigateToItemDetails(itemId: string) {
    this.router.navigate(['/', 'items', itemId]);
  }

  private validation() {
    if (!this.item.title) {
      return;
    }
    if (!this.item.description) {
      return;
    }
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
      console.log(this.photos);

    });
  }


}

