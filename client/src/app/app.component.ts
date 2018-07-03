import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }
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
