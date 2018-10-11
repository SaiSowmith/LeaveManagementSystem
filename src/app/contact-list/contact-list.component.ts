import { ContactService } from './../contact.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ContactList } from './../models/contact-list';
import { DataTableResource } from 'angular5-data-table';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableModule } from "ng2-data-table";
import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';


@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})


export class ContactListComponent implements OnInit, OnDestroy {

  contactus: any[];
  subscription: Subscription;
  tableResource: DataTableModule;
  items: ContactList[] = [];
  itemCount: number;
  id;
  contactUs = {};
  data: any[];
  appUser: AppUser;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private contactService: ContactService,
    public auth: AuthService) {

    this.subscription = this.contactService.getAll()
      .subscribe(contactus => {
        this.contactus = contactus;
        this.data = contactus;
        console.log(this.contactus)
        this.initializeTable(this.data);

        auth.appUser$.subscribe(appUser => this.appUser = appUser);

      });
    /////////
    this.id = this.route.snapshot.paramMap.get('id');
    // if(this.id) this.employeeService.get(this.id).valueChanges().take(1).subscribe(e =>this.employee=e);
    this.subscription = this.contactService.get(this.id).valueChanges().subscribe(c => this.contactUs = c);
  }

  private initializeTable(data) {
    this.tableResource = new DataTableModule();
  }

  delete() {
    if (!confirm('Are you sure  you want to delete?')) return;
    this.contactService.delete(this.id);
    this.router.navigate(['/contact-list']);
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

  // 22222222222222

  // import { ContactService } from './../contact.service';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
// import {ContactList} from './../models/contact-list';
// import { DataTableResource } from 'angular5-data-table';
// import { Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'contact-list',
//   templateUrl: './contact-list.component.html',
//   styleUrls: ['./contact-list.component.css']
// })
// export class ContactListComponent implements OnInit,OnDestroy {
//   contactus:any[];
//   subscription:Subscription;
//   tableResource:DataTableResource<any>;
//   items:ContactList[] =[];
//   itemCount:number;
//   id;
//   contactUs={};

//   constructor(private router:Router,private route:ActivatedRoute,private contactService:ContactService) {
//  this.subscription = this.contactService.getAll()
//      .subscribe(contactus =>{
//       this.contactus=contactus;

//        console.log(this.contactus)
//       this.initializeTable(contactus);
//       });

// this.id =this.route.snapshot.paramMap.get('id');
   ///////// if(this.id) this.employeeService.get(this.id).valueChanges().take(1).subscribe(e =>this.employee=e);
//    this.subscription =  this.contactService.get(this.id).valueChanges().subscribe(c =>this.contactUs=c);
//   }

//   private initializeTable(contactus:any[]){
//     this.tableResource = new DataTableResource(contactus);
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
// let filteredContactus=(query) ?
// this.contactus.filter(cu=>cu.name.toLowerCase().includes(query.toLowerCase()))  :
// this.contactus;

// this.initializeTable(filteredContactus);
// }
// delete(){
//   if(!confirm('Are you sure  you want to delete?'))return ;

//   this.contactService.delete(this.id);   
//   this.router.navigate(['/contact-list']); 

// }

//    ngOnDestroy(){
//     this.subscription.unsubscribe();
//    }
//   ngOnInit() {
//   }

// }