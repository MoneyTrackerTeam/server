import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { ITransaction, IMonth } from '../../interfaces/';
import { Router } from '@angular/router';
import { MonthsService } from '../../services/months.service';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  allTransaction: ITransaction[] = [];
  shownTransactions: ITransaction[] = [];
  months: IMonth[] = [];
  selectedMonth: IMonth;
  isMonthSelected = false;
  constructor(private transactionsService: TransactionsService, private router: Router,
    private monthService: MonthsService) { }

  ngOnInit() {
    this.getTransaction();
    this.getMonths();
  }
  getTransaction(): void {
    this.transactionsService.getTransactions()
      .subscribe(transactions => {
        this.allTransaction = transactions;
        this.shownTransactions = this.allTransaction;
      });
  }
  getMonths(): void {
    this.monthService.getAllMonths()
      .subscribe(months => this.months = months);
  }
  addTransaction(): void {
    this.router.navigate(['/create-transaction']);
  }
  onSelectMonth(month?: IMonth): void {
    if (month) {
      this.shownTransactions = this.transactionsService.transformDateArray(month.transactions);
      this.selectedMonth = month;
      this.isMonthSelected = true;
    } else {
      this.shownTransactions = this.allTransaction;
      this.isMonthSelected = false;
      this.selectedMonth = null;
    }
  }
}
