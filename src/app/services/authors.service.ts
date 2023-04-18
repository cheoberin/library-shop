import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../enviroment/enviroment";

import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private readonly API = environment.baseUrl;
  constructor(private http: HttpClient ) { }

  findById(id:string):Observable<any>{
    const url = this.API + `author/${id}` ;
    return this.http.get(url);
  }
  findAll(): Observable<any>{
    const url = this.API + "author";
    return this.http.get(url);
  }

}
