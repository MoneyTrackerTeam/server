import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMonth } from '../interfaces';
import { catchError } from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class MonthsService {
  private monthUrl = 'http://localhost:3000/months';
  constructor(private http: HttpClient, private msgs: MessagesService) { }

  getAllMonths(): Observable<IMonth[]> {
    return this.http.get<IMonth[]>(this.monthUrl).pipe(
      catchError(this.msgs.handleError({
        severity: 'danger',
        module: 'month-service',
        text: 'error fetching service',
      }, []))
    );
  }
}
