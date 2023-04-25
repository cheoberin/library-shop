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
        label: '<span class="text-gray-500 block px-4 py-2 text-sm">Preço: Mais Baixo para Mais Alto</span>',
        escape: false,
            command: () => {this.updateSort("price","desc")}

      },
      {
        label: '<span  class="text-gray-500 block px-4 py-2 text-sm">Preço:Mais Alto para mais Baixo </span>',
        escape: false,
          command: () => {this.updateSort("price","asc")}
      },
        {
            label: '<span class="text-gray-500 block px-4 py-2 text-sm">Nome: Desc</span>',
            escape: false,
            command: () => {this.updateSort("name","desc")}


        },
        {
            label: '<span  class="text-gray-500 block px-4 py-2 text-sm">Nome: Asc</span>',
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
