import { Component } from '@angular/core';
import { MessagesService } from './services/messages.service';
import { IError } from './interfaces';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isError = false;
  error: IError = {
    severity: 'info',
    text: ''
  };
  constructor(private msgs: MessagesService) {
    msgs.errorOccured$.subscribe(error => this.errorOccured(error));
  }

  errorOccured(error: IError) {
    this.isError = true;
    this.error = error;
    setTimeout(() => {
      this.isError = false;
    }, 2000);
  }
}
