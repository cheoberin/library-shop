import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartItem} from "../../../models/cart.model";
import {Address} from "../../../models/address.model";

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styles: [
  ]
})
export class CheckoutAddressComponent {
  @Input() address!:Address;
  @Output() addressSelected = new EventEmitter<string>();

  onAddressSelected(id: string) {
    this.addressSelected.emit(id);
  }
}
