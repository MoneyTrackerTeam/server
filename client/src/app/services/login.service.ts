import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../interfaces/';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessagesService } from './messages.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:3000/login';
  constructor(private http: HttpClient, private msgs: MessagesService) { }

  login(username: string, password: string): Observable<any> {
    const mockUser: IUser = {
      id: 10000,
      name: '',
      username: '',
      password: ''
    };
    return this.http.post<IUser>(this.loginUrl, { username, password })
      .pipe(
        catchError(this.msgs.handleError({ severity: 'danger', text: 'Error logging in. Please try again', module: 'login' }, {}))
      );
  }
}
