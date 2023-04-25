import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../models/product.model";
import {DialogService} from "primeng/dynamicdialog";
import {ProductsDetailsComponent} from "../products-details/products-details.component";

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html', providers:[DialogService]
})
export class ProductBoxComponent {
@Input() product!: Product;

@Output() addToCart = new EventEmitter();


constructor(public  dialogService: DialogService) {}

    onAddToCart():void {
        this.addToCart.emit(this.product)
    }

    openDialogCreate() {
        this.dialogService.open(ProductsDetailsComponent , {
            data:{
                id: this.product.id
            },
            width: '70%',
            height: 'auto',
            resizable : true,
            draggable : true,
            maximizable: true
        });
    }


}
