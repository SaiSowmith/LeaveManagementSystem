import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { LeaveIsApproved } from './models/leave-isapproved';


@Injectable({
  providedIn: 'root'
})

export class LeaveService {

  constructor(
    private db: AngularFireDatabase) {
  }

  create(leaves) {
    console.log(leaves.key);
    var path: String = "/leaves/" + leaves.key
    console.log(path);
    // return this.db.object('/lkhljh').update(employee);
    return this.db.object(`/leaves/${leaves.key}`).set(leaves);
  }

  getAll() {
    return this.db.list('/leaves').valueChanges();
  }

  get(leavesId) {
    return this.db.object('/leaves/' + leavesId);
  }

  update(leavesId, leaves) {
    return this.db.object('/leaves/' + leavesId).update(leaves);
  }

  delete(leavesId) {
    return this.db.object('/leaves/' + leavesId).remove();
  }

  save(user: firebase.User) {
    this.db.object('/leaves/' + user.uid).update({
      name: user.displayName,
      email: user.email
      // verified:user.emailVerified,
      // isAnonymous:user.isAnonymous,
      // uid:user.uid
    });
  }

  _get(uid: string): AngularFireObject<LeaveIsApproved> {
    return this.db.object('/leaves/' + uid);
  }

}

