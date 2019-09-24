import { ItemsClientService } from './../../services/items-client.service';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  items: Item[];

  item: Item = {
    title: '',
    description: ''
  };

  constructor(private itemsClientService: ItemsClientService) {
    this.items = [];
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

 addItem() {
   if (!this.item.title) {
     return;
     }
   if (!this.item.description) {return;
      }
   this.itemsClientService.addItem(this.item)
   .subscribe(res => {
     console.log(res);
     this.getItems();
   },
   err => console.log(err)
   );
 }
}

