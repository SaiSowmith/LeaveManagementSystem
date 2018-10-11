import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class SignupService {

  constructor(
    private db: AngularFireDatabase) {
  }

  create(signup) {
    console.log(signup.key);
    var path: String = "/registers/" + signup.key
    console.log(path);
    // return this.db.object('/lkhljh').update(employee);
    return this.db.object(`/registers/${signup.key}`).set(signup);
  }

  getAll() {
    return this.db.list('/registers').valueChanges();
  }

  get(signupId) {
    return this.db.object('/registers/' + signupId);
  }

  update(signupId, signup) {
    return this.db.object('/registers/' + signupId).update(signup);
  }
  
  delete(signupId) {
    return this.db.object('/registers/' + signupId).remove();
  }

}

