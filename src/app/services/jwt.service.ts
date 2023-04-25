import {Injectable} from '@angular/core';
import {DecodedToken} from "../models/jwt";
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }
  DecodeToken(token: string):DecodedToken {
    return jwt_decode(token);
  }
}
