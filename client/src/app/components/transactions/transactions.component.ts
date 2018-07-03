import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { ITransaction } from '../../interfaces/';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: ITransaction[] = [];
  constructor(private transactionsService: TransactionsService, private router: Router) { }

  ngOnInit() {
    this.getTransaction();
  }
  getTransaction(): void {
    this.transactionsService.getTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }
  addTransaction(): void {
    this.router.navigate(['/create-transaction']);
  }
}
