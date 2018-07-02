import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  formValid = true;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.formValid = false;
      return;
    }
    this.formValid = true;
    this.loginService.login(this.username, this.password).subscribe(createdUser => {
      console.log(createdUser);
    });
  }

}
