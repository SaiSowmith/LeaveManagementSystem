import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from './models/app-user'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  appUser: AppUser;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    router: Router) {

    auth.appUser$.subscribe(appUser => this.appUser = appUser);

    auth.user$.subscribe(user => {
      if (!user) return;
     this.userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });

    // export class AppComponent implements OnInit {
    //   constructor(private auth:AuthService,router:Router){
    //     auth.user$.subscribe(user =>{
    //       if(!user) return;

    //         let returnUrl = localStorage.getItem('returnUrl');
    //         if(!returnUrl) return;
    //           localStorage.removeItem('returnUrl');
    //           router.navigateByUrl(returnUrl);
    //     });
  }


  logout() {
    if (!confirm('Are you sure  you want to logout?')) return;
    this.auth.logout();
  }

  ngOnInit() {
    firebase.initializeApp(
      {
        apiKey: "AIzaSyBvp3vq0zFgXXEE4iA7DgSle1bOiK1HNJI",
        authDomain: "lms-project-23360.firebaseapp.com"
      }
    );
  }

}