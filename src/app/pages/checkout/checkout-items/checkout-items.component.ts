import {Component, Input} from '@angular/core';
import {CartItem} from "../../../models/cart.model";

@Component({
  selector: 'app-checkout-items',
  templateUrl: './checkout-items.component.html',
  styles: [
  ]
})
export class CheckoutItemsComponent {
  @Input() item!: CartItem;
}
