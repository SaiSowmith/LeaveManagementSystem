import { RegisterService } from '../register.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SignUp } from './../models/signup';
import { DataTableResource } from 'angular5-data-table';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableModule } from "ng2-data-table";
import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'sign-up-list',
  templateUrl: './sign-up-list.component.html',
  styleUrls: ['./sign-up-list.component.css']
})

export class SignUpListComponent implements OnInit, OnDestroy {

  signup: any[];
  subscription: Subscription;
  tableResource: DataTableModule;
  items: SignUp[] = [];
  itemCount: number;
  data: any[];
  appUser: AppUser;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registerService: RegisterService,
    public auth: AuthService) {
      
    this.subscription = this.registerService.getAll()
      .subscribe(signup => {
        this.signup = signup;
        this.data = signup;
        console.log(this.signup)
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





// 22222222222222222

// import { RegisterService } from '../register.service';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
// import {SignUp} from './../models/signup';
// import { DataTableResource } from 'angular5-data-table';
// import { Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'sign-up-list',
//   templateUrl: './sign-up-list.component.html',
//   styleUrls: ['./sign-up-list.component.css']
// })
// export class SignUpListComponent implements OnInit ,OnDestroy{
//   signup:any[];
//   subscription:Subscription;
//   tableResource:DataTableResource<any>;
//   items:SignUp[] =[];
//   itemCount:number;

//   constructor(private router:Router,private route:ActivatedRoute,private registerService:RegisterService) {
//  this.subscription = this.registerService.getAll()
//      .subscribe(signup =>{
//       this.signup=signup;

//        console.log(this.signup)
//       this.initializeTable(signup);
//       });

//   }

//   private initializeTable(signup:any[]){
//     this.tableResource = new DataTableResource(signup);
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
// let filteredSignup=(query) ?
// this.signup.filter(s=>s.first.toLowerCase().includes(query.toLowerCase()))  :
// this.signup;

// this.initializeTable(filteredSignup);
// }


//    ngOnDestroy(){
//     this.subscription.unsubscribe();
//    }
//   ngOnInit() {
//   }

// }