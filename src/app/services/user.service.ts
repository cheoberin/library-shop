import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ISingInRequest, IUser} from 'app/models/user.model';
import {first, Observable, switchMap} from 'rxjs';
import {environment} from 'enviroment/enviroment';
import {Router} from '@angular/router';
import {CurrentUserService} from "./current-user.service";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly API = environment.baseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient,
              private router:Router,
              private currentUserService:CurrentUserService,
              private jwtService:JwtService) {}

  save(record: Partial<IUser>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<IUser>) {
    return this.httpClient.post<any>(this.API + "auth/register", record).pipe(first());
  }

  private update(record: Partial<IUser>) {
    return this.httpClient
        .put<IUser>(`${this.API}/${record._id}`, record)
        .pipe(first());
  }

  signIn(singInRequest : ISingInRequest){
    return this.httpClient.post<any>(`${this.API}auth/login`, singInRequest)
        .pipe(
            switchMap((loginRes) => {
              localStorage.setItem('access_token', loginRes.token); // Salva o token no localStorage
              return this.httpClient.get(`${this.API}user/getUser/${singInRequest.email}`);
            })
        )
        .subscribe((userRes) => {
          this.currentUserService.setCurrentUser(userRes);
        });
  }



  getCurrentUser(email:string){
    return this.httpClient.get(`${this.API}user/getUser/${email}`).subscribe((userRes) => {
      this.currentUserService.setCurrentUser(userRes);
    });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }

  get isCustomer():boolean{
    let rawToken = localStorage.getItem('access_token');
    if(rawToken) {
      let decodedToken = this.jwtService.DecodeToken(rawToken);
      return decodedToken.roles.includes('CUSTOMER')
    }
    return false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    let removeUser = localStorage.removeItem('current_user');
    if ((removeToken == null || undefined) && (removeUser == null|| undefined)) {
      this.router.navigate(['']);
    }
  }
  // User profile
  getUserProfile(id: string): Observable<any> {
    let api = `${this.API}user/${id}`;
    return this.httpClient.get<any>(api);
  }


}
