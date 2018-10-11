import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class Leave2Service {

  constructor(
    private db: AngularFireDatabase) {
  }

  create(leaves) {
    console.log(leaves.key);
    var path: String = "/leavesStatus/" + leaves.key
    console.log(path);
    // return this.db.object('/lkhljh').update(employee);
    return this.db.object(`/leavesStatus/${leaves.key}`).set(leaves);
  }

  getAll() {
    return this.db.list('/leavesStatus').valueChanges();
  }

  get(leavesId) {
    return this.db.object('/leavesStatus/' + leavesId);
  }

  update(leavesId, leaves) {
    return this.db.object('/leavesStatus/' + leavesId).update(leaves);
  }
  
  delete(leavesId) {
    return this.db.object('/leavesStatus/' + leavesId).remove();
  }

}

