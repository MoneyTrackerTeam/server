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

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.emmitError({ severity: 'error', text: `Error ${operation}. Please try again` });

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
