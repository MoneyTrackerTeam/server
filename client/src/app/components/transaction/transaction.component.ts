import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from '../../services/transactions.service';
import { ITransaction } from '../../interfaces';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactionId: number;
  transaction: ITransaction;
  constructor(private activeRoute: ActivatedRoute,
    private transactionService: TransactionsService,
    private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => this.transactionId = +params['id']);
    this.getTransaction();
  }

  getTransaction() {
    this.transactionService.getOneTransaction(this.transactionId).subscribe((trans) => {
      this.transaction = trans;
    });
  }
  backClicked() {
    this.router.navigate(['transactions']);
  }

}
