import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LeaveService } from './../leave.service';
import { OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';
import { AppUser } from './../models/app-user'
import { AuthService } from './../auth.service';
declare var $: any;
import { formatDate } from '@angular/common';

@Component({
  selector: 'leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})


export class LeaveComponent implements OnInit, OnDestroy, AfterViewInit {

  public today;
  public mindate;
  public y;
  leaves: any = {};
  id;
  subscription: Subscription;
  appUser: AppUser;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private leaveService: LeaveService,
    public auth: AuthService) {

    this.id = this.route.snapshot.paramMap.get('id');
    // if(this.id) this.employeeService.get(this.id).valueChanges().take(1).subscribe(e =>this.employee=e);
    this.subscription = this.leaveService.get(this.id).valueChanges().subscribe(l => this.leaves = l);

    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    //   console.log(formatDate(this.mindate, 'yyyy-MM-dd', 'en'));
    //  this.y=formatDate(this.mindate, 'yyyy-MM-dd', 'en');
    this.today = new Date().toJSON().split('T')[0];
    console.log(this.today);
  }


  save(leaves) {
    console.log("LEAVES", leaves)
    if (this.id) {
      this.leaveService.update(this.id, leaves);
      if (!confirm('Do you want to give Permission for Leave?')) return;
    }
    else {
      //todo generate a time stamp
      var timestamp = "" + Date.now();
      console.log(timestamp);
      console.log(leaves)
      leaves.key = timestamp
      if (!confirm('Do you really want to apply for a leave?')) return;
      this.leaveService.create(leaves).then((val) => {
        console.log(val);
      })
      alert('Leave has been applied successfully!!!');
    }
    alert('Changes have been made successfully!!!');
    this.router.navigate(['/home']);
  }

  logout() {
    if (!confirm('Are you sure  you want to logout?')) return;
    this.auth.logout();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit() {
    this.date();
  }

  date() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("leaveto")[0].setAttribute('min', today);
    document.getElementsByName("leavefrom")[0].setAttribute('min', today);

    // var dtToday = new Date();
    // let month: any = dtToday.getMonth() + 1;
    // let day:any = dtToday.getDate();
    // var year = dtToday.getFullYear();
    // if(month < 10)
    //     month = '0' + month.toString();
    // if(day < 10)
    //     day = '0' + day.toString();

    // var maxDate = year + '-' + month + '-' + day;
    // alert(maxDate)
    // $('#calendar').attr('min', maxDate);
  }

}