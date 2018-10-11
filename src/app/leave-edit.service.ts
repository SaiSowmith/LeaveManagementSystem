import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { LeaveIsApproved } from './models/leave-isapproved';


@Injectable({
  providedIn: 'root'
})

export class LeaveEditService {

  constructor(
    private db: AngularFireDatabase) {
  }

  create(leavesEdit) {
    console.log(leavesEdit.key);
    var path: String = "/leavesStatus/" + leavesEdit.key
    console.log(path);
    // return this.db.object('/lkhljh').update(employee);
    return this.db.object(`/leavesStatus/${leavesEdit.key}`).set(leavesEdit);
  }

  getAll() {
    return this.db.list('/leavesStatus').valueChanges();
  }

  get(leavesEditId) {
    return this.db.object('/leavesStatus/' + leavesEditId);
  }

  update(leavesEditId, leavesEdit) {
    return this.db.object('/leavesStatus/' + leavesEditId).update(leavesEdit);
  }

  delete(leavesEditId) {
    return this.db.object('/leavesStatus/' + leavesEditId).remove();
  }

  // save(user:firebase.User){
  //   this.db.object('/leaves/'+user.uid).update({
  //     name:user.displayName,
  //     email:user.email
  //     // verified:user.emailVerified,
  //     // isAnonymous:user.isAnonymous,
  //     // uid:user.uid
  //   });
  // }

  // _get(uid:string):AngularFireObject<LeaveIsApproved>{
  //   return this.db.object('/leaves/'+uid);
  //   }
}

