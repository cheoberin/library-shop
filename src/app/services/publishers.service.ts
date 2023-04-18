import {Injectable} from '@angular/core';
import {environment} from "../../enviroment/enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  private readonly API = environment.baseUrl;
  constructor(private http: HttpClient ) { }

  findById(id:string):Observable<any>{
    const url = this.API + `publisher/${id}` ;
    return this.http.get(url);
  }
  findAll(): Observable<any>{
    const url = this.API + "publisher";
    return this.http.get(url);
  }
}
