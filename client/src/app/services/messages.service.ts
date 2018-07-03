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

  emmitError(error: IError) {
    console.log(`Emmiting ${error}`);
    this.errorOccured$.emit(error);
  }

  handleError<T>(error: IError, result?: T) {
    return (err: any): Observable<T> => {
      this.logToDB(error, err);
      this.emmitError(error);
      return of(result as T);
    };
  }

  private logToDB(error: IError, err) {
    console.log('asd');
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
