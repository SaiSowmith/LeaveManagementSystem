
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Leave2Service } from './leave2.service'
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { ContactService } from './contact.service';
import { LeaveService } from './leave.service'
import { RegisterService } from './register.service';
import { EmployeeService } from './employee.service';
import { DepartmentService } from './department.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';

import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { LeaveComponent } from './leave/leave.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContactComponent } from './contact/contact.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { AfterLoginHomeComponent } from './after-login-home/after-login-home.component';
import { HolidaysListComponent } from './holidays-list/holidays-list.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { EmployeesFormComponent } from './employees-form/employees-form.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesEditComponent } from './employees-edit/employees-edit.component';
import { SignUpListComponent } from './sign-up-list/sign-up-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { LeaveStatusListComponent } from './leave-status-list/leave-status-list.component';
import { Leave2Component } from './leave2/leave2.component';
import { SignInListComponent } from './sign-in-list/sign-in-list.component';

import { Ng2PaginationModule } from 'ng2-pagination';
import { DataTableModule } from 'ng2-data-table';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LeaveEditComponent } from './leave-edit/leave-edit.component';
import { LeaveEditService } from './leave-edit.service';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'after-login', component: AfterLoginComponent, canActivate: [AuthGuardService] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuardService] },

  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },

  { path: 'after-login-home', component: AfterLoginHomeComponent },
  { path: 'bs-navbar', component: BsNavbarComponent, canActivate: [AuthGuardService] },

  // {path:'employees-form',component:EmployeesFormComponent,canActivate:[AuthGuardService]},
  // {path:'employees-list',component:EmployeesListComponent,canActivate:[AuthGuardService]},

  // {path:'employees-form',component:EmployeesFormComponent,canActivate:[AuthGuardService]},
  // {path:'employees/:id',component:EmployeesFormComponent,canActivate:[AuthGuardService]},
  // {path:'employees',component:EmployeesFormComponent,canActivate:[AuthGuardService]},

  { path: 'sign-up-list', component: SignUpListComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
  { path: 'sign-in-list', component: SignInListComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },

  { path: 'employees-list', component: EmployeesListComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
  { path: 'employees-edit', component: EmployeesEditComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
  { path: 'employees/:id', component: EmployeesFormComponent, canActivate: [AuthGuardService,AdminAuthGuardService] },
  { path: 'employees-form', component: EmployeesFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },

  { path: 'leave-list', component: LeaveListComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
  { path: 'leaves/:id', component: LeaveComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },

  { path: 'leave-status-list', component: LeaveStatusListComponent, canActivate: [AuthGuardService] },

  { path: 'holidays-list', component: HolidaysListComponent, canActivate: [AuthGuardService] },

  { path: 'contact-list', component: ContactListComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },

  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuardService] },
  { path: 'leave', component: LeaveComponent, canActivate: [AuthGuardService] },

  { path: 'leave-edit', component: LeaveEditComponent, canActivate: [AuthGuardService] },
  { path: 'leave-edit/:id', component: LeaveEditComponent, canActivate: [AuthGuardService] },

  { path: 'leave2', component: Leave2Component, canActivate: [AuthGuardService] },

]

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    LeaveComponent,
    LoginComponent,
    SignUpComponent,
    ContactComponent,
    AfterLoginComponent,
    AfterLoginHomeComponent,
    HolidaysListComponent,
    EmployeesComponent,
    EmployeesFormComponent,
    EmployeesListComponent,
    DashboardComponent,
    EmployeesEditComponent,
    SignUpListComponent,
    MyProfileComponent,
    ContactListComponent,
    LeaveListComponent,
    LeaveStatusListComponent,
    Leave2Component,
    LeaveEditComponent,
    SignInListComponent,

  ],

  imports: [Ng2SearchPipeModule, Ng2PaginationModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    DataTableModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],

  providers: [LeaveEditService, Leave2Service, AdminAuthGuardService, UserService, ContactService, LeaveService, RegisterService, AuthService,
    AuthGuardService,
    DepartmentService,
    EmployeeService
  ],

  bootstrap: [AppComponent],
  
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
