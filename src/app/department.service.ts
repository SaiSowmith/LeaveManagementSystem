import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})


export class DepartmentService {

  constructor(
    private db: AngularFireDatabase) { }

  getDepartments() {
    return this.db.list('/departments');
  }
  
}
