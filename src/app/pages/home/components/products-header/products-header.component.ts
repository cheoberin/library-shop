import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html'
})
export class ProductsHeaderComponent implements OnInit {
  @Output() paramsChange = new EventEmitter<Record<string, string>>();
  items!: MenuItem[];
  ngOnInit(): void {
    this.items = [
        {
        label: '<span class="text-gray-500 block px-4 py-2 text-sm">Price: Low to High</span>',
        escape: false,
            command: () => {this.updateSort("price","desc")}

      },
      {
        label: '<span  class="text-gray-500 block px-4 py-2 text-sm">Price: High to Low</span>',
        escape: false,
          command: () => {this.updateSort("price","asc")}
      },
        {
            label: '<span class="text-gray-500 block px-4 py-2 text-sm">Name: Desc</span>',
            escape: false,
            command: () => {this.updateSort("name","desc")}


        },
        {
            label: '<span  class="text-gray-500 block px-4 py-2 text-sm">Name: Asc</span>',
            escape: false,
            command: () => {this.updateSort("name","asc")}
        }
    ];

  }

  updateSort(sort:string,order:string){
      const params: Record<string, string> = {}

      params['SortBy'] = sort;
      params['sortDirection'] = order;

      this.paramsChange.emit(params);

  }

}
