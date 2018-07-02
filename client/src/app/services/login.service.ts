import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../interfaces/';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:3000/login';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(this.loginUrl, { username, password });
  }
}
