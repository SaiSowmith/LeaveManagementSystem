import { LeaveEdit } from './../models/leave-edit';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../auth.service';
import { AppUser } from './../models/app-user'
import { LeaveService } from './../leave.service';
import { DepartmentService } from './../department.service';
import { OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';
import { LeaveEditService } from '../leave-edit.service';
import * as firebase from 'firebase';

@Component({
  selector: 'leave-edit',
  templateUrl: './leave-edit.component.html',
  styleUrls: ['./leave-edit.component.css']
})

export class LeaveEditComponent {

  appUser: AppUser;
  leaveedit: LeaveEdit;
  leavesEdit: any = {};
  id;
  subscription: Subscription;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private route: ActivatedRoute,
    private leaveService: LeaveEditService) {

    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    // auth.leaveedit$.subscribe(leaveedit => this.leaveedit = leaveedit);

    this.id = this.route.snapshot.paramMap.get('id');
    // if(this.id) this.employeeService.get(this.id).valueChanges().take(1).subscribe(e =>this.employee=e);
    this.subscription = this.leaveService.get(this.id).valueChanges().subscribe(le => this.leavesEdit = le);

  }


  save(leavesEdit) {
    console.log("LEAVES", leavesEdit)
    if (this.id) {
      this.leaveService.update(this.id, leavesEdit);
      if (!confirm('Do you want to give permission for leave?')) return;
    }
    else {
      //todo generate a time stamp
      var timestamp = "" + Date.now();
      console.log(timestamp);
      console.log(leavesEdit)
      leavesEdit.key = timestamp
      if (!confirm('Do you really want to apply for a leave?')) return;
      this.leaveService.create(leavesEdit).then((val) => {
        console.log(val);

      })
    }
    alert('Permission has been given successfully!!!');
    this.router.navigate(['/home']);
  }


  ngOnInit() {
    if(this.id) {
      this.getSelectedLeaveDetails(this.id);
    }
  }

  getSelectedLeaveDetails(id) {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    if (!confirm('Are you sure  you want to logout?')) return;
    this.auth.logout();
  }
  
}
