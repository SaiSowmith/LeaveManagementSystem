import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { Employee } from './models/employee';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import 'rxjs/add/operator/switchMap';
import { LeaveEdit } from './models/leave-edit';
import { ContactList } from './models/contact-list';

@Injectable({
  providedIn: 'root'
})


export class AuthService implements OnInit{

  user$: Observable<firebase.User>;
  // user1$ :Observable<firebase.User>

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute, 
    private router: Router) {

    this.user$ = afAuth.authState;
    
  }
  signInRegular(email, password) {
    console.log(email, password)
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });;
    
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });;;
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }


  // signUpRegular(email, password) {
  //   console.log(email,password) 
  //   const credential = firebase.auth.EmailAuthProvider.credential( email, password );

  //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  // }

  signUp(email: string, password: string) {
    console.log(email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    }
      // const credential =firebase.auth.EmailAuthProvider.credential(email,password);
      //   return this.afAuth.auth.createUserWithEmailAndPassword(email,password).catch(
      // return this.afAuth.auth.createUserWithEmailAndPassword(email,password).catch(
      //error => console.log(error)
    );
  }
  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => this.userService.get(user.uid).valueChanges())
  }

  get contactList$(): Observable<ContactList> {
    return this.user$.
      switchMap(user => this.userService.get1(user.uid).valueChanges())
  } 



  // 2222222222222

  ngOnInit(){
    firebase.auth().onAuthStateChanged(function(user) {
  
      if (user) {
        var displayName = user.displayName;
        console.log(displayName);
        var email = user.email;
        var emailVerified = user.emailVerified;
        var isAnonymous = user.isAnonymous; 
        var uid = user.uid;
        var providerData = user.providerData;
        
      } 
    });
  }

  currentUser(){
    return firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
      console.log("USER",user);
      } else {
        console.log("No USER");
      }
    });
    
  }

  profile(){
    var user = firebase.auth().currentUser;
    console.log(user);

var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  console.log(name);
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  
}

  }
}