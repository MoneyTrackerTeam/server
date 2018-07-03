import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITransaction, IUser } from '../interfaces/';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessagesService } from './messages.service';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transUrl = 'http://localhost:3000/transactions';
  constructor(private http: HttpClient, private msgs: MessagesService) { }
  getTransactions(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(this.transUrl)
      .pipe(
        catchError(this.msgs.handleError({ severity: 'error', text: 'Error fetching transactions' }, []))
      );
  }

  getOneTransaction(id: number): Observable<ITransaction> {
    return this.http.get<ITransaction | any>(`${this.transUrl}/${id}`).pipe(
      catchError(this.msgs.handleError({ severity: 'error', text: 'Error fetching transaction' }, {}))
    );
  }

  createTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.post<ITransaction | any>(this.transUrl, transaction).pipe(
      catchError(this.msgs.handleError({ severity: 'error', text: 'Error creating transaction' }, {}))
    );
  }
}
