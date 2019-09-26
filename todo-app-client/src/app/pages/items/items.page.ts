import { ItemsClientService } from './../../services/items-client.service';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/item';
import { Router } from '@angular/router';



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
    }, 1000);
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
}

