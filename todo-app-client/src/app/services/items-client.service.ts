import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsClientService {

  constructor(private http: HttpClient) { }

  API_URL = 'http://10.10.0.23:3000/items';

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.API_URL);
  }

  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.API_URL}/${id}`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.API_URL}/add`, item);
  }

  deleteItem(id: string): Observable<Item> {
    return this.http.delete<Item>(`${this.API_URL}/${id}`);
  }

  updateItem(id: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.API_URL}/update?itemId=${id}`, item);
  }

}
