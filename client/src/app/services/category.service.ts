import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessagesService } from './messages.service';
import { ICategory } from '../interfaces';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private catUrl = 'http://localhost:3000/categories';
  constructor(private http: HttpClient, private msgs: MessagesService) { }

  getCategories() {
    return this.http.get<ICategory[]>(this.catUrl).pipe(
      catchError(this.msgs.handleError({ severity: 'danger', module: 'category', text: 'Error fetching categories' }, []))
    );
  }

  createCategory(name: string) {
    return this.http.post<ICategory>(this.catUrl, { name }).pipe(
      catchError(this.msgs.handleError({
        severity: 'danger', module: 'category',
        text: 'Error creating category'
      }, { id: -1 }))
    );
  }
}
