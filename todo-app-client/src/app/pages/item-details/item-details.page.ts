import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsClientService } from 'src/app/services/items-client.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Item } from 'src/app/item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private itemsClientService: ItemsClientService,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
      ) { }

  item: Item = {
    title: '',
    description: '' ,
  };

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
    if (!this.item.title) {
      return;
      }
    if (!this.item.description) {return;
       }
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
}
