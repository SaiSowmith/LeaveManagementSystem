import { AuthService } from './../auth.service';
import { EmployeeService } from './../employee.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Employee } from './../models/employee';
import { DataTableModule } from "ng2-data-table";
import { AppUser } from '../models/app-user';
import * as firebase from 'firebase';

@Component({
  selector: 'my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})

export class MyProfileComponent implements OnInit, OnDestroy {

  employees: any[];
  subscription: Subscription;
  tableResource: DataTableModule;
  items: Employee[] = [];
  itemCount: number;
  data: any[];
  appUser: AppUser;
  key: any[];

  constructor(
    private employeeService: EmployeeService,
    public auth: AuthService) {

    this.subscription = this.employeeService.getAll()
      .subscribe(employees => {
        this.employees = employees;
        this.data = employees;
        console.log("EMP" + this.employees)
        this.initializeTable(this.data);
      });
    auth.appUser$.subscribe(appUser => this.appUser = appUser);

  }

  private initializeTable(data) {
    this.tableResource = new DataTableModule();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {

  }

  logout() {
    if (!confirm('Are you sure  you want to logout?')) return;
    this.auth.logout();
  }

}

