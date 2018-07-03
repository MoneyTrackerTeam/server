import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MessagesService } from '../../services/messages.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  formValid = true;
  constructor(private loginService: LoginService,
    private msgs: MessagesService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.msgs.showAlert({ severity: 'danger', text: 'Incorrect credentials', module: 'login' });
      return;
    }
    this.formValid = true;
    this.loginService.login(this.username, this.password).subscribe(resp => {
      if (resp.accessToken) {
        localStorage.setItem('access_token', `Bearer ${resp.accessToken}`);
        this.router.navigate(['/transactions']);
      } else {
        return;
      }
    });
  }

}
