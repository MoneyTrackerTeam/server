import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { ITransaction, IMonth } from '../../interfaces/';
import { Router } from '@angular/router';
import { MonthsService } from '../../services/months.service';
import { MessagesService } from '../../services/messages.service';
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
    private monthService: MonthsService,
    private msgs: MessagesService) { }

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
  testFunc(e: any) {
  }
  navigateToTr(e: any, t: ITransaction) {
    if (e.type === 'click' && e.target.id === 'delete-transaction') {
      this.transactionsService.deleteTransaction(t.id).subscribe((r) => {
        if (r) {
          this.shownTransactions = this.shownTransactions.filter((tr) => {
            return tr.id !== t.id;
          });
          this.msgs.showAlert({ severity: 'info', text: 'Transaction deleted', module: 'transactions' });
        }
      });
    } else {
      this.router.navigate(['/transactions', t.id]);
    }
  }
}
