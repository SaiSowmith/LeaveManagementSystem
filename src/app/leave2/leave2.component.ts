import { Component, OnInit } from '@angular/core';
import { LeaveService } from './../leave.service';
import { DepartmentService } from './../department.service';
import {  OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'leave2',
  templateUrl: './leave2.component.html',
  styleUrls: ['./leave2.component.css']
})
export class Leave2Component implements OnInit,OnDestroy {
  leaves ={};
  id;
  subscription:Subscription;

  constructor(private router:Router,
    private route:ActivatedRoute,
    private leaveService:LeaveService) {
      this.id =this.route.snapshot.paramMap.get('id');
   // if(this.id) this.employeeService.get(this.id).valueChanges().take(1).subscribe(e =>this.employee=e);
   this.subscription =  this.leaveService.get(this.id).valueChanges().subscribe(l =>this.leaves=l);

     }
     save(leaves){
      console.log("LEAVES",leaves)
      if(this.id){
        this.leaveService.update(this.id,leaves);
        if(!confirm('Do you want to apply ?' )) return;
      } 
      else{
        //todo generate a time stamp
        var timestamp = ""+Date.now();
        console.log(timestamp);
        console.log(leaves)
        leaves.key =  timestamp
        if(!confirm('Do you really want to apply for a leave?' )) return;
        this.leaveService.create(leaves).then((val)=>{
          console.log(val);
          
        })
      } 
      alert('Leave has been applied successfully!!!');
      this.router.navigate(['/home']);
    }
  ngOnInit() {
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
   }
}
