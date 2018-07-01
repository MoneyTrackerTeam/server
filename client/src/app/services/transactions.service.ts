import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction, User } from '../interfaces/';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transUrl = 'http://localhost:3000/transactions';
  constructor(private http: HttpClient) { }
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transUrl)
      .pipe(
        catchError(this.handleError('getTransactions', [])),
        tap(transactions => this.log('fetched transactions'))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(msg: string) {
    console.log(msg);
  }
}
