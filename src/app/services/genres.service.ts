import {Injectable} from '@angular/core';
import {environment} from "../../enviroment/enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private readonly API = environment.baseUrl;
  constructor(private http: HttpClient ) { }

  findById(id:string):Observable<any>{
    const url = this.API + `api/genre/${id}` ;
    return this.http.get(url);
  }
  findAll(): Observable<any>{
    const url = this.API + "api/genre";
    return this.http.get(url);
  }
}
