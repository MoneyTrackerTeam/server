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
      this.msgs.emmitError({ severity: 'error', text: 'Incorrect credentials' });
      return;
    }
    this.formValid = true;
    this.loginService.login(this.username, this.password).subscribe(resp => {
      localStorage.setItem('access_token', `Bearer ${resp.accessToken}`);
      this.router.navigate(['/transactions']);
    });
  }

}
