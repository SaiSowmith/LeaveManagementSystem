import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs/Observable';
import { LeaveEdit } from './models/leave-edit';
import { ContactList } from './models/contact-list';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      verified:user.emailVerified,
      isAnonymous:user.isAnonymous,
      uid:user.uid
    });
  }

  // get(uid:string):AngularFireObject<AppUser>{
  //   return this.db.object('/users/'+uid);
  // }
  //   get(uid: string): Observable<any> {
  //     return this.db.object('/users/' + uid).valueChanges();
  //  }

  // get(uid: string): Observable<any> {
  //   return this.db.object('/users/' + uid).valueChanges();
  // }
  // get(uid: string): Observable<any> {
  //   return this.db.object('/users/' + uid).valueChanges();
  // }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }

  get1(uid: string): AngularFireObject<ContactList> {
    return this.db.object('/contacts/' + uid);
  }
  
  getAll() {
    return this.db.list('/users').valueChanges();
  }
}
