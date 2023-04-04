import { Component } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  selectedGenres: any[] = [];

  genres: any[] = [
    { name: 'Romance', key: 'reuiyf' },
    { name: 'Policial', key: 'qei24782' },
    { name: 'Misterio', key: 'eqe2091' },
    { name: 'Research', key: 'iut4o98' }
  ];

  selectedAuthors: any[] = [];
  authors: any[] = [
    {name: 'Isaac Asimov', key: 'iaqwe'},
    {name: 'Agatha Christie', key: 'agqwe'},
    {name: 'Stephen King', key: 'stkfg'},
    {name: 'Virginia Woolf', key: 'vrgth'},
    {name: 'J.R.R. Tolkien', key: 'jrrtn'},
    {name: 'Gillian Flynn', key: 'glfln'},
    {name: 'Gabriel Garcia Marquez', key: 'gbrgm'},
    {name: 'George Orwell', key: 'grgrl'},
    {name: 'Margaret Atwood', key: 'mgrat'},
    {name: 'Neil Gaiman', key: 'nlgmn'}
  ]
  isSectionOpen = false;
  isSection = false;
  constructor() { }
  toggleSection(){
    this.isSection = !this.isSection;
    this.isSectionOpen = !this.isSectionOpen;
  }
}
