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
        catchError(this.msgs.handleError({ severity: 'danger', text: 'Error fetching transactions', module: 'get-transactions' }, [])),
        map(this.transformDateArray)
      );
  }

  getOneTransaction(id: number): Observable<ITransaction> {
    return this.http.get<ITransaction | any>(`${this.transUrl}/${id}`).pipe(
      catchError(this.msgs.handleError({ severity: 'danger', text: 'Error fetching transaction', module: 'get-transaction' }, {})),
      map(this.transformDate)
    );
  }

  createTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.post<ITransaction | any>(this.transUrl, transaction).pipe(
      catchError(this.msgs.handleError({ severity: 'danger', text: 'Error creating transaction', module: 'create-transaction' }, {}))
    );
  }

  transformDateArray(v: ITransaction[]): ITransaction[] {
    v.map((t) => {
      return t.readableDate = new Date(+t.date);
    });
    return v;
  }
  transformDate(v: ITransaction): ITransaction {
    v.readableDate = new Date(+v.date);
    return v;
  }
}
