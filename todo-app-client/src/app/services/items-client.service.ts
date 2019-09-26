import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../item';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class ItemsClientService {
  headers: HttpHeaders;
  options: {};
  constructor(
    private http: HttpClient,
  ) {

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    this.options = { headers: this.headers };
  }

  API_URL = 'http://10.10.0.23:3000/items';

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.API_URL, this.options);
  }

  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.API_URL}/${id}`, this.options);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.API_URL}/add`, item, this.options);
  }

  deleteItem(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`, this.options);
  }

  updateItem(id: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.API_URL}/update?itemId=${id}`, item, this.options);
  }

}
