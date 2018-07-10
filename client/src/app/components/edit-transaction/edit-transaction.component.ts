import { Component, OnInit } from '@angular/core';
import { ITransaction, ICategory } from '../../interfaces';
import { TransactionsService } from '../../services/transactions.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { NgbTimeStruct, NgbDateStruct } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {
  transaction: ITransaction = {
    title: '',
    amount: 0,
    date: 0,
    category: {
      id: 0
    }
  };
  transactionId: number;
  categories: ICategory[];
  date: NgbDateStruct;
  time: NgbTimeStruct;
  constructor(private transactionService: TransactionsService, private activeRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => this.transactionId = +params['id']);
    this.getTransaction();
    this.getCategories();
  }

  getTransaction() {
    this.transactionService.getOneTransaction(this.transactionId).subscribe(t => {
      const [day, month, year] = t.readableDate.split('/');
      const [hours, minutes] = t.readableTime.split(':');
      this.date = { day: +day, month: +month, year: +year };
      this.time = { hour: +hours, minute: +minutes, second: 0 };
      this.transaction = t;
    });
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(c => this.categories = c);
  }
  onSubmit() {
    const date = `${this.date.year}-${this.date.month}-${this.date.day} ${this.time.hour}:${this.time.minute}`;
    this.transaction.date = (new Date).getTime();
    this.transactionService.updateTransaction(this.transaction).subscribe((t) => {
      console.log('updated');
    });
  }
}
