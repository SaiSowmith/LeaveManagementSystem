import { EmployeeService } from './../employee.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Employee } from './../models/employee';
import { DataTableResource } from 'angular5-data-table';
import { DataTableModule } from "ng2-data-table";
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';


@Component({
  selector: 'employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: ['./employees-edit.component.css']
})


export class EmployeesEditComponent implements OnInit, OnDestroy {

  employees: any[];
  subscription: Subscription;
  tableResource: DataTableModule;
  items: Employee[] = [];
  itemCount: number;
  data: any[];
  appUser: AppUser;

  constructor(
    private db: AngularFireDatabase,
    private employeeService: EmployeeService, 
    private router: Router, 
    public auth: AuthService) {

    this.subscription = this.employeeService.getAll()
      .subscribe(employees => {
        this.employees = employees;
        this.data = employees;
        console.log(this.employees)
        this.initializeTable(this.data);
      });

    auth.appUser$.subscribe(appUser => this.appUser = appUser);

  }

  private initializeTable(data) {
    this.tableResource = new DataTableModule();
  }

  update(employeeId, employee) {
    return this.db.object('/employees/' + employeeId).update(employee);
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

  //  2222222222222222

// import { EmployeeService } from './../employee.service';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
// import {Employee} from './../models/employee';
// import { DataTableResource } from 'angular5-data-table';

// @Component({
//   selector: 'employees-edit',
//   templateUrl: './employees-edit.component.html',
//   styleUrls: ['./employees-edit.component.css']
// })
// export class EmployeesEditComponent implements OnInit,OnDestroy {
//   employees:any[];
//   subscription:Subscription;
//   tableResource:DataTableResource<any>;
//   items:Employee[] =[];
//   itemCount:number;


//   constructor(private employeeService:EmployeeService) {
//     this.subscription = this.employeeService.getAll()
//         .subscribe(employees =>{
//          this.employees=employees;

//           console.log(this.employees)
//          this.initializeTable(employees);
//          });

//      }

//      private initializeTable(employees:any[]){
//        this.tableResource = new DataTableResource(employees);
//          this.tableResource.query({offset:0})
//            .then(items =>this.items=items);
//          this.tableResource.count()
//            .then(count => this.itemCount=count);
//      }

//    reloadItems(params){
//      if(!this.tableResource) return; 
//      this.tableResource.query(params)
//            .then(items =>this.items=items);
//    }

//       filter(query:string){
//    let filteredEmployees=(query) ?
//    this.employees.filter(e=>e.name.toLowerCase().includes(query.toLowerCase()))  :
//    this.employees;

//    this.initializeTable(filteredEmployees);
//    }


//       ngOnDestroy(){
//        this.subscription.unsubscribe();
//       }
//      ngOnInit() {
//      }

//    }