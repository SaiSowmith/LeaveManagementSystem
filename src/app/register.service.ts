import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})


export class RegisterService {

  constructor(
    private db: AngularFireDatabase) {
  }

  create(registers) {
    console.log(registers.key);
    var path: String = "/registers/" + registers.key
    console.log(path);
    // return this.db.object('/lkhljh').update(employee);
    return this.db.object(`/registers/${registers.key}`).set(registers);
  }

  getAll() {
    return this.db.list('/registers').valueChanges();
  }

  get(registersId) {
    return this.db.object('/registers/' + registersId);
  }

  update(registersId, registers) {
    return this.db.object('/registers/' + registersId).update(registers);
  }
  
  delete(registersId) {
    return this.db.object('/registers/' + registersId).remove();
  }

}

