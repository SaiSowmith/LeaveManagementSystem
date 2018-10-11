import { LeavesList } from './../models/leaves-list';
import { LeaveService } from './../leave.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableModule } from "ng2-data-table";
import { AuthService } from './../auth.service';
import { AppUser } from './../models/app-user'

@Component({
  selector: 'leave-list',
  templateUrl: './leave-status-list.component.html',
  styleUrls: ['./leave-status-list.component.css']
})

export class LeaveStatusListComponent implements OnInit, OnDestroy {

  appUser: AppUser;
  leaveL: any[];
  subscription: Subscription;
  tableResource: DataTableModule;
  items: LeavesList[] = [];
  itemCount: number;
  data: any[];
  p: number = 1;

  constructor(
    public auth: AuthService,
    private leaveService: LeaveService) {

    auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.subscription = this.leaveService.getAll()
      .subscribe(leaveL => {
        this.leaveL = leaveL;
        this.data = leaveL;
        console.log(this.leaveL)
        this.initializeTable(this.data);
      });

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





// 222222222222
// import { Leave2Service} from './../leave2.service'
// import { LeavesListStatus } from './../models/leaves-status-list';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
// import { DataTableResource } from 'angular5-data-table';
// @Component({
//   selector: 'leave-status-list',
//   templateUrl: './leave-status-list.component.html',
//   styleUrls: ['./leave-status-list.component.css']
// })
// export class LeaveStatusListComponent implements OnInit,OnDestroy {
//   leaveL:any[];
//   subscription:Subscription;
//   tableResource:DataTableResource<any>;
//   items:LeavesListStatus[] =[];
//   itemCount:number;

//   constructor(private leaveService:Leave2Service) {
//  this.subscription = this.leaveService.getAll()
//      .subscribe(leaveL =>{
//       this.leaveL=leaveL;
      
//        console.log(this.leaveL)
//       this.initializeTable(leaveL);
//       });

//   }

//   private initializeTable(leaveL:any[]){
//     this.tableResource = new DataTableResource(leaveL);
//       this.tableResource.query({offset:0})
//         .then(items =>this.items=items);
//       this.tableResource.count()
//         .then(count => this.itemCount=count);
//   }

// reloadItems(params){
//   if(!this.tableResource) return; 
//   this.tableResource.query(params)
//         .then(items =>this.items=items);
// }

//    filter(query:string){
// let filteredLeaveList=(query) ?
// this.leaveL.filter(ll=>ll.name.toLowerCase().includes(query.toLowerCase()))  :
// this.leaveL;

// this.initializeTable(filteredLeaveList);
// }


//    ngOnDestroy(){
//     this.subscription.unsubscribe();
//    }
//   ngOnInit() {
//   }

// }

 