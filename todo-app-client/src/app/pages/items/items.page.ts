import { ItemsClientService } from './../../services/items-client.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  items: Observable<any>;

  item: Item = {
    title: '',
    description: ''
  };

  constructor(private itemsClientService: ItemsClientService) {
   }

  ngOnInit() {
    this.getItems();
    console.log(this.items);
  }


  getItems(): void {
    this.items = this.itemsClientService.getItems()
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
