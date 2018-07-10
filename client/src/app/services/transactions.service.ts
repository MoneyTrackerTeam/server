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

  updateTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.put<ITransaction | any>(`${this.transUrl}/${transaction.id}`, transaction).pipe(
      catchError(this.msgs.handleError({ severity: 'danger', text: 'Error creating transaction', module: 'create-transaction' }, {}))
    );
  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.transUrl}/${id}`).pipe(
      catchError(this.msgs.handleError({ severity: 'danger', text: 'Error deleting transaction', module: 'delete-transaction' },
        false))
    );
  }

  transformDateArray(v: ITransaction[]): ITransaction[] {
    v.map((t) => {
      const d = new Date(+t.date);
      t.readableDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      t.readableTime = `${d.getHours()}:${d.getMinutes() <= 0 ? '0' + d.getMinutes().toString() : d.getMinutes()}`;
      return t;
    });
    return v;
  }
  transformDate(v: ITransaction): ITransaction {
    const d = new Date(+v.date);
    v.readableDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    v.readableTime = `${d.getHours()}:${d.getMinutes() <= 0 ? '0' + d.getMinutes().toString() : d.getMinutes()}`;
    return v;
  }
}
