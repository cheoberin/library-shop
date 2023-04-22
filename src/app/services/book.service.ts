import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../enviroment/enviroment";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API = environment.baseUrl;

  private booksSubject = new BehaviorSubject<Product[]>([]);
  public books$ = this.booksSubject.asObservable();

  private pagesSubject = new BehaviorSubject<any>([]);
  public pages$ = this.pagesSubject.asObservable();

  constructor(private http:HttpClient) { }


  findAll(params: Record<string, string>): void {
    this.http.get<any>(this.API + "api/book", { params }).subscribe(
        books => {
            this.booksSubject.next(books.content)
            this.pagesSubject.next(books);
        },
        error => console.error(error)
    );
  }

  getBooksList() {
    return this.books$;
  }

}
