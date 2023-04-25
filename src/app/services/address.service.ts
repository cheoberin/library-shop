import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'enviroment/enviroment';
import {first, Observable} from 'rxjs';

import {Address} from '../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly API = environment.baseUrl ;

  constructor(private httpClient: HttpClient) {}

  save(record: Partial<Address>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Address>) {
    console.log(record)
    return this.httpClient.post<Address>(this.API + "address", record).pipe(first());
  }

  private update(record: Partial<Address>) {
    return this.httpClient
      .put<Address>(`${this.API}address/${record._id}`, record)
      .pipe(first());
  }

  findByUserId(id:string):Observable<any>{
    return this.httpClient.get(this.API+`address/?userId=${id}`)
  }


}
