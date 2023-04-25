import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/book.service";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {Product} from "../../../../models/product.model";
import {CartService} from "../../../../services/cart.service";

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styles: [
  ]
})
export class ProductsDetailsComponent implements OnInit{

  book:any;

  constructor(private bookService:BookService,private config: DynamicDialogConfig,private cartService:CartService) {
  }
  ngOnInit(): void {
    this.getBookDetails(this.config.data.id);
  }

  getBookDetails(id:string){
    this.bookService.findById(id).subscribe((resp)=>{
      this.book = resp;
      console.log(resp);
    })
  }

  onAddToCart(product:Product):void{
    this.cartService.addToCart({
      bookCover: product.bookCover,
      name:product.name,
      price:product.price,
      quantity:1,
      id:product.id
    })
  }

}
