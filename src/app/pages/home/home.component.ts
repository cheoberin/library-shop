import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {CartService} from "../../services/cart.service";
import {Product} from "../../models/product.model";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  products : Array<Product> = [{

  id:'sdada34',
  name:'O prince',
  authorName:"antsies",
  bookCover:"https://m.media-amazon.com/images/I/413BUSRmzdL.jpg",
  price:70.9},
    {
      id:'s35905923',
      name:'O pequeno',
      authorName:"ant",
      bookCover:"https://m.media-amazon.com/images/I/413BUSRmzdL.jpg",
      price:80.50},
    {
      id:'92sad3',
      name:'pequ prince',
      authorName:"ies",
      bookCover:"https://m.media-amazon.com/images/I/413BUSRmzdL.jpg",
      price:69.49},
    {
      id:'sdadafd335905923',
      name:'O pequeno prince',
      authorName:"antonies",
      bookCover:"https://m.media-amazon.com/images/I/413BUSRmzdL.jpg",
      price:65.69},
    {
      id:'sdada05923',
      name:'prince',
      authorName:"antonieta",
      bookCover:"https://m.media-amazon.com/images/I/413BUSRmzdL.jpg",
      price:100},
  ]

  constructor(private cartService: CartService) {
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
