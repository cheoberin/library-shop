import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {CurrentUserService} from "../../services/current-user.service";

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styles: [
  ]
})
export class UserOrdersComponent implements OnInit{
  orders:any;
  constructor(private orderService:OrderService,private currentUser:CurrentUserService) {}
  ngOnInit(): void{
    this.getOrdersInfos();
  }
 getOrdersInfos(){
     this.orderService.getOrderByUserId(this.currentUser.getUserId()).subscribe((resp)=>{
         this.orders =resp;
     });
  }

}
