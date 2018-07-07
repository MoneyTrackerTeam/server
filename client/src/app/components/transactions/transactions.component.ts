import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { ITransaction, IMonth, ICategory } from '../../interfaces/';
import { Router } from '@angular/router';
import { MonthsService } from '../../services/months.service';
import { MessagesService } from '../../services/messages.service';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  monthDdTitle = 'Show all';
  categoryDdtitle = 'All Categories';
  allTransaction: ITransaction[] = [];
  categoryId: number;
  categories: ICategory[];
  private _shownTransactions: ITransaction[] = [];
  months: IMonth[] = [];
  set shownTransactions(v: ITransaction[]) {
    v.sort((a, b) => {
      return b.date - a.date;
    });
    this._shownTransactions = v;
  }
  get shownTransactions() {
    return this._shownTransactions;
  }
  constructor(private transactionsService: TransactionsService, private router: Router,
    private monthService: MonthsService,
    private msgs: MessagesService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.getTransaction();
    this.getMonths();
    this.getCategories();
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
  getCategories(): void {
    this.categoryService.getCategories().subscribe((cat) => {
      this.categories = cat;
    });
  }
  addTransaction(): void {
    this.router.navigate(['/create-transaction']);
  }
  onSelectMonth(month?: IMonth): void {
    if (month) {
      this.shownTransactions = this.transactionsService.transformDateArray(month.transactions);
      this.monthDdTitle = month.title;
    } else {
      this.shownTransactions = this.allTransaction;
      this.monthDdTitle = 'Show All';
    }
  }
  onSelectCategory(cat?: ICategory) {
    if (cat) {
      this.shownTransactions = this.allTransaction.filter((t) => {
        return t.category.id === cat.id;
      });
      this.categoryDdtitle = cat.name;
    } else {
      this.shownTransactions = this.allTransaction;
      this.categoryDdtitle = 'All Categories';
    }
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
    } else if (e.type === 'click' && e.target.id === 'edit-transaction') {
      this.router.navigate(['/edit-transaction', t.id]);
    } else {
      this.router.navigate(['/transactions', t.id]);
    }
  }
}
