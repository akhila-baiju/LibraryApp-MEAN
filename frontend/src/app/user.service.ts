import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  navigate(arg0: string[]) {
    throw new Error('Method not implemented.');
  }

  constructor(public http:HttpClient) { }

  
  addUser(item: any) {
     //console.log("reached add product in user service"+item.email);
     return this.http.post('http://localhost:3000/insert', { item })
     .subscribe((data: any) => { console.log(data) });
   }
   
}
