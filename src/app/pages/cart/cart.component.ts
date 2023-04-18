import {Component, OnInit} from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit{
  cart: Cart = { items:[]};
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
      this.cartService.cart.subscribe((_cart:Cart)=>{
          this.cart = _cart;
      })
  }
  getTotal(items :Array<CartItem>):number{
      return this.cartService.getTotal(items);
  }
  onClearCart():void{
      this.cartService.clearCart();
  }


}

