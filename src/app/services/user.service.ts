import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/models/user.model';
import { first } from 'rxjs';
import { environment } from 'enviroment/enviroment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API = environment.baseUrl + 'api/auth/register';

  constructor(private httpClient: HttpClient) {}

  save(record: Partial<User>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<User>) {
    return this.httpClient.post<User>(this.API, record).pipe(first());
  }

  private update(record: Partial<User>) {
    return this.httpClient
      .put<User>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }
}
