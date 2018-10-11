import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../models/login-user'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  // user= {email:'',
  //        password:''} as User;
  user = {
    email: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router) { }


  signInWithEmail() {
    this.auth.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        // console.log(res);
        this.router.navigate(['/after-login/']);
      })
      .catch((err) => console.log('error: ' + err));
      this.auth.currentUser();
      this.auth.profile();
      this.auth.ngOnInit();
  }

  login() {
    this.auth.login();
    this.router.navigate(['/after-login']);
  }

}