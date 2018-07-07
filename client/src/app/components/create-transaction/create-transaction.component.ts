import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TransactionsService } from '../../services/transactions.service';
import { ITransaction, ICategory } from '../../interfaces';
import { MessagesService } from '../../services/messages.service';
import { CategoryService } from '../../services/category.service';

const now = new Date();
@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {
  date: NgbDateStruct;
  title: string;
  amount: string;
  time: NgbTimeStruct;
  categoryId: number;
  categories: ICategory[];
  constructor(private router: Router,
    private transactionService: TransactionsService,
    private msgs: MessagesService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryId = 0;
    this.getCategories();
  }
  onSubmit() {
    if (this.hasErrors()) {
      return;
    }
    const date = `${this.date.year}-${this.date.month}-${this.date.day} ${this.time.hour}:${this.time.minute}`;
    const transaction: ITransaction = {
      title: this.title,
      amount: +this.amount,
      date: (new Date(date)).getTime(),
      categoryId: this.categoryId
    };
    this.transactionService.createTransaction(transaction).subscribe(createdT => {
      this.msgs.handleError({
        severity: 'success',
        text: `New transaction ${transaction.title} was created`,
        module: 'create-transaction'
      });
      this.router.navigate(['/transactions']);
    });
  }
  onCancel() {
    this.router.navigate(['/']);
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  onCategoryCreated(cat: ICategory) {
    if (cat.id === -1) {

    } else {
      this.categories.push(cat);
      this.categoryId = cat.id;
    }

  }

  hasErrors() {
    let isFailed = false;
    if (!this.title) {
      this.msgs.showAlert({ severity: 'warning', module: 'form', text: ' Title is required' });
      isFailed = true;
    }
    if (!this.amount) {
      this.msgs.showAlert({ severity: 'warning', module: 'form', text: 'Amount is required' });
      isFailed = true;
    }
    if (!this.date) {
      this.msgs.showAlert({ severity: 'warning', module: 'form', text: 'Date is required' });
      isFailed = true;
    }
    if (!this.time) {
      this.msgs.showAlert({ severity: 'warning', module: 'form', text: 'Select time' });
      isFailed = true;
    }
    if (this.categoryId < 1) {
      this.msgs.showAlert({ severity: 'warning', module: 'form', text: 'Pick a category' });
      isFailed = true;
    }
    return isFailed;
  }
}
