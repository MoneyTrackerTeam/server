import { Component } from '@angular/core';
import { MessagesService } from './services/messages.service';
import { IError } from './interfaces';
import { Router } from '@angular/router';
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
  constructor(private msgs: MessagesService, private router: Router) {
    msgs.errorOccured$.subscribe(error => this.errorOccured(error));
  }

  errorOccured(error: IError) {
    this.isError = true;
    this.error = error;
    setTimeout(() => {
      this.isError = false;
    }, 2000);
  }
  loggedIn(): boolean {
    if (localStorage.getItem('access_token')) {
      return true;
    } else {
      return false;
    }
  }
  onLogout() {
    localStorage.removeItem('access_token');
  }
}
