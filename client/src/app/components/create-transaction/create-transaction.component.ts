import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.amount);
    console.log(this.title);
    console.log(this.date);
    console.log(this.time);
  }
  onCancel() {
    this.router.navigate(['/']);
  }
}
