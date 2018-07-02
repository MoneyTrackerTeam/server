import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { ITransaction } from '../../interfaces/';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: ITransaction[] = [];
  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.getTransaction();
  }
  getTransaction(): void {
    this.transactionsService.getTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }
}
