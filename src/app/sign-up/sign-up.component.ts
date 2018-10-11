import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
import { User } from './../models/login-user'
import { RegisterService } from './../register.service';
import { DepartmentService } from './../department.service';
import { OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit, OnDestroy {

  registers = {};
  id;
  subscription: Subscription;
  user = {
    email: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private registerService: RegisterService) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.registerService.get(this.id).valueChanges().subscribe(r => this.registers = r);

  }

  onSubmit() {
    // console.log(this.user.email, this.user.password)
    this.auth.signUp(this.user.email, this.user.password);
  }

  save(registers) {
    if (this.id) {
      this.registerService.update(this.id, registers);
    }
    else {
      //todo generate a time stamp
      var timestamp = "" + Date.now();
      console.log(timestamp);
      console.log(registers)
      registers.key = timestamp
      this.registerService.create(registers).then((val) => {
        console.log(val);
      })
    }
    this.router.navigate(['/login']);
  }


  ngOnInit() {
    firebase.initializeApp(
      {
        apiKey: "AIzaSyBvp3vq0zFgXXEE4iA7DgSle1bOiK1HNJI",
        authDomain: "lms-project-23360.firebaseapp.com"
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

////222222222222222222222222222222222222222222222222222222222222222222222///////

// import { AuthService } from './../auth.service';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import * as firebase from 'firebase/app';
// import {NgForm} from '@angular/forms';

// import { User } from './../models/login-user'
// @Component({
//   selector: 'sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css']
// })


// export class SignUpComponent implements OnInit {
//   user = {
//     email: '',
//     password: ''
//  };

//   constructor(private auth : AuthService,private router:Router) { }


//   onSubmit() {
//     this.auth.signUp(this.user.email, this.user.password,);
//  }

//  ngOnInit() {
//   firebase.initializeApp(
//     {
//       apiKey: "AIzaSyBvp3vq0zFgXXEE4iA7DgSle1bOiK1HNJI",
//       authDomain: "lms-project-23360.firebaseapp.com"
//     }
//   );
// }
// }