import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../models/product.model";

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent {
@Input() product!: Product;

@Output() addToCart = new EventEmitter();

    onAddToCart():void {
        this.addToCart.emit(this.product)
    }
}
