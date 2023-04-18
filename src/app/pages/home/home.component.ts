import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Product} from "../../models/product.model";
import {BookService} from "../../services/book.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy{
  private readonly destroyed = new Subject<void>();
  products : Array<Product> = []

  params:Record<string, string> = {};

  constructor(private cartService: CartService, private bookService:BookService) {
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

  ngOnInit(): void {
    this.bookService.books$.pipe(takeUntil(this.destroyed)).subscribe(
        books => this.products = books,
        error => console.error(error)
    );
    this.getBooks();

  }

  getBooks():void{
    this.bookService.findAll(this.params);
    this.bookService.pages$.subscribe((resp)=>{
      this.totalRecords = resp.totalElements;
      this.rows = resp.size;

    })
  }
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onParamsChange(params: Record<string, string>) {
    if (Object.keys(params).length === 0) {
      this.params = params;
    } else {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          this.params[key] = params[key];
        }
      }
    }
    this.getBooks();
  }


  rows!: number;
  totalRecords!:number;

  onPageChange(event:any) {

    const params: Record<string, string> = {}
    params['size'] = event.rows.toString();
    params['page'] = event.page.toString();

    this.onParamsChange(params);
  }


}
