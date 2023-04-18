import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthorsService} from "../../../../services/authors.service";
import {GenresService} from "../../../../services/genres.service";
import {PublishersService} from "../../../../services/publishers.service";
import {catchError, forkJoin, tap, throwError} from "rxjs";
import {BookService} from "../../../../services/book.service";

interface FilterSections {
  isGenreSectionOpen: boolean;
  isGenreSection: boolean;
  isAuthorSectionOpen: boolean;
  isAuthorSection: boolean;
  isPublisherSectionOpen: boolean;
  isPublisherSection: boolean;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit{
  @Output() paramsChange = new EventEmitter<Record<string, string>>();
  constructor(private authorService:AuthorsService,
              private genreService:GenresService,
              private publisherService:PublishersService,
              private bookService:BookService) {}

  ngOnInit(): void {
    this.getCheckBoxesInfos();
  }

  sections: FilterSections = {
    isGenreSectionOpen: false,
    isGenreSection: false,
    isAuthorSectionOpen: false,
    isAuthorSection: false,
    isPublisherSectionOpen: false,
    isPublisherSection: false
  };


  filteredGenres: any = [];
  selectedGenres: string[] = [];
  genres: any = [];

  filteredAuthors: any = [];
  selectedAuthors: string[] = [];
  authors: any = []


  filteredPublisher: any = [];
  selectedPublishers:string[] = [];
  publishers:any = [];




  toggleGenreSection() {
    this.toggleSection('isGenreSection', 'isGenreSectionOpen');
  }

  toggleAuthorSection() {
    this.toggleSection('isAuthorSection', 'isAuthorSectionOpen');
  }
  togglePublisherSection() {
    this.toggleSection('isPublisherSection', 'isPublisherSectionOpen');
  }

  toggleSection(section: keyof FilterSections, isOpen: keyof FilterSections) {
    this.sections[section] = !this.sections[section];
    this.sections[isOpen] = !this.sections[isOpen];
  }

  getCheckBoxesInfos(){
    forkJoin([
      this.authorService.findAll(),
      this.genreService.findAll(),
      this.publisherService.findAll()
    ]).pipe(tap(([authors,genres,publishers]) =>{
          this.authors = authors;
          this.filteredAuthors = authors;
          this.genres = genres;
          this.filteredGenres = genres;
          this.publishers = publishers;
          this.filteredPublisher=publishers;
        }),
        catchError(err => {
          console.error(err);
          return throwError(err);
        })
    ).subscribe();
  }

  onGenreFilterInput(event: any) {
    const filterValue = event.target.value.toLowerCase();
    if (filterValue.trim()) {
      this.filteredGenres = this.genres.filter((genre: { name: string; }) => genre.name.toLowerCase().includes(filterValue));
    } else {
      this.filteredGenres = this.genres;
    }
  }

  onAuthorFilterInput(event: any) {
    const filterValue = event.target.value.toLowerCase();
    if (filterValue.trim()) {
      this.filteredAuthors = this.authors.filter((author: { name: string; }) => author.name.toLowerCase().includes(filterValue));
    } else {
      this.filteredAuthors = this.authors;
    }
  }

  onPublisherFilterInput(event: any) {
    const filterValue = event.target.value.toLowerCase();
    if (filterValue.trim()) {
      this.filteredPublisher = this.publishers.filter((publishers: { name: string; }) => publishers.name.toLowerCase().includes(filterValue));
    } else {
      this.filteredPublisher = this.publishers;
    }
  }



  updateBooks() {
      const params: Record<string, string> = {};

      if (this.selectedGenres && this.selectedGenres.length > 0) {
        params['genreIds'] = this.selectedGenres.join(',');
      }

      if(this.selectedAuthors && this.selectedAuthors.length > 0 ){
        params['authorIds'] = this.selectedAuthors.join(',');
      }

      if (this.selectedPublishers && this.selectedPublishers.length > 0){
        params['publisherIds'] = this.selectedPublishers.join(',');
      }

      this.paramsChange.emit(params);

     // this.bookService.findAll(params);

  }





}
