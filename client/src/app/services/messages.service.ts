import { Injectable, EventEmitter } from '@angular/core';
import { IError } from '../interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  errorOccured$: EventEmitter<IError>;
  constructor() {
    this.errorOccured$ = new EventEmitter();
  }

  emmitError(error: IError) {
    this.errorOccured$.emit(error);
  }

  handleError<T>(error: IError, result?: T) {
    return (err: IError): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      this.emmitError(err);
      return of(result as T);
    };
  }
}
