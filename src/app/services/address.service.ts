import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment/enviroment';
import { first } from 'rxjs';

import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly API = environment.baseUrl + '/api/address';

  constructor(private httpClient: HttpClient) {}

  save(record: Partial<Address>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Address>) {
    return this.httpClient.post<Address>(this.API, record).pipe(first());
  }

  private update(record: Partial<Address>) {
    return this.httpClient
      .put<Address>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }


}
