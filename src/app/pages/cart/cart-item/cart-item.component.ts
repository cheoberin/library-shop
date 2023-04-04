import {Component, Input} from '@angular/core';
import {Cart, CartItem} from "../../../models/cart.model";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styles: [
  ]
})
export class CartItemComponent {
    @Input() item!: CartItem;


    constructor(private cartService:CartService) {}

    onAddQuantity(item : CartItem): void{
        this.cartService.addToCart(item);
    }
    onRemoveQuantity(item : CartItem):void{
            this.cartService.removeQuantity(item)
    }

    onRemove() {
        this.cartService.removeFromCart(this.item)
    }
}
