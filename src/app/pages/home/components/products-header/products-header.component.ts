import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html'
})
export class ProductsHeaderComponent implements OnInit {
  items!: MenuItem[];
  ngOnInit(): void {
    this.items = [
      {
        label: '<span class="text-gray-500 block px-4 py-2 text-sm">Most Popular</span>',
        escape: false
      },
      {
        label: '<span  class="text-gray-500 block px-4 py-2 text-sm"  >Best Rating</span>',
        escape: false
      },
      {
        label: '<span  class="text-gray-500 block px-4 py-2 text-sm" >Newest</span>',
        escape: false
      },
      {
        label: '<span class="text-gray-500 block px-4 py-2 text-sm" >Price: Low to High</span>',
        escape: false
      },
      {
        label: '<span  class="text-gray-500 block px-4 py-2 text-sm"  >Price: High to Low</span>',
        escape: false
      }
    ];

  }
}
