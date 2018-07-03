import { Injectable, EventEmitter } from '@angular/core';
import { IError } from '../interfaces';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  errorOccured$: EventEmitter<IError>;
  constructor(private http: HttpClient) {
    this.errorOccured$ = new EventEmitter();
  }

  private emmitError(error: IError) {
    this.errorOccured$.emit(error);
  }

  handleError<T>(error: IError, result?: T) {
    return (err: any): Observable<T> => {
      this.logToDB(error, err);
      this.emmitError(error);
      return of(result as T);
    };
  }
  showAlert(alert: IError) {
    this.emmitError(alert);
  }
  private logToDB(error: IError, err) {
    const logUrl = 'http://localhost:3000/logs';
    const payload = {
      ...error,
      error: err
    };
    this.http.post(logUrl, payload).subscribe(() => {

    });
  }
}

// test
