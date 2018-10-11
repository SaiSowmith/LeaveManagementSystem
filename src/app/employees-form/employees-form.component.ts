import { EmployeeService } from './../employee.service';
import { DepartmentService } from './../department.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';
import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';


@Component({
  selector: 'employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})


export class EmployeesFormComponent implements OnInit, OnDestroy {

  departments$;
  employee = {};
  id;
  subscription: Subscription;
  appUser: AppUser;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService) {

    auth.appUser$.subscribe(appUser => this.appUser = appUser);

    // this.departments$ = departmentService.getDepartments();
    this.id = this.route.snapshot.paramMap.get('id');
    // if(this.id) this.employeeService.get(this.id).valueChanges().take(1).subscribe(e =>this.employee=e);
    this.subscription = this.employeeService.get(this.id).valueChanges().subscribe(e => this.employee = e);

  }


  save(employee) {
    if (this.id) {
      if (!confirm('Do you want to save?')) return;
      this.employeeService.update(this.id, employee);
    }
    else {
      //todo generate a time stamp
      var timestamp = "" + Date.now();
      console.log(timestamp);
      console.log(employee)
      employee.key = timestamp
      if (!confirm('Do you want to create a new employee and save?')) return;
      this.employeeService.create(employee).then((val) => {
        console.log(val);

      })
    }
    this.router.navigate(['/employees-list']);
  }


  delete() {
    if (!confirm('Are you sure  you want to delete?')) return;
    this.employeeService.delete(this.id);
    this.router.navigate(['/employees-list']);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    if (!confirm('Are you sure  you want to logout?')) return;
    this.auth.logout();
  }

}