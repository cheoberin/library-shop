import { Injectable } from '@angular/core';
import {environment} from "../../enviroment/enviroment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API = environment.baseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
  placeOrder(order:Order){
    return this.httpClient.post(this.API+"order",order);
  }

  getOrderByUserId(id:string){
    return this.httpClient.get(this.API + `order/?userId=${id}`);
  }
}
