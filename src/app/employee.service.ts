import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(
    private db: AngularFireDatabase) {
  }

  create(employee) {
    console.log(employee.key);
    var path: String = "/employees/" + employee.key
    console.log(path);
    // return this.db.object('/lkhljh').update(employee);
    return this.db.object(`/employees/${employee.key}`).set(employee);
  }

  getAll() {
    return this.db.list('/employees').valueChanges();
  }

  get1(key) {
    return this.db.object(`/employees/${key}`).valueChanges();
  }

  get(employeeId) {
    return this.db.object('/employees/' + employeeId);
  }

  update(employeeId, employee) {
    return this.db.object('/employees/' + employeeId).update(employee);
  }
  
  delete(employeeId) {
    return this.db.object('/employees/' + employeeId).remove();
  }

}

