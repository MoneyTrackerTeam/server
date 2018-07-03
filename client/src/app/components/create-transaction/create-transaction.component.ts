import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TransactionsService } from '../../services/transactions.service';
import { ITransaction } from '../../interfaces';
import { MessagesService } from '../../services/messages.service';

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
  constructor(private router: Router, private transactionService: TransactionsService, private msgs: MessagesService) { }

  ngOnInit() {
  }
  onSubmit() {
    const date = `${this.date.year}-${this.date.month}-${this.date.day} ${this.time.hour}:${this.time.minute}`;
    const transaction: ITransaction = {
      title: this.title,
      amount: +this.amount,
      date: (new Date(date)).getTime(),
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
}
