import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './../contact.service';
import { DepartmentService } from './../department.service';
import { OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';
import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';


@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})


export class ContactComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  submitted = false;
  contacts = {};
  id;
  subscription: Subscription;
  appUser: AppUser;

  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService) {

    // var ref = new Firebase("https://lms-project-23360.firebaseio.com/");
    // var authData = ref.getAuth();
    // if (authData) {
    //   console.log("Authenticated user with uid:", authData.uid);
    // }

    auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.id = this.route.snapshot.paramMap.get('id');
    // if(this.id) this.employeeService.get(this.id).valueChanges().take(1).subscribe(e =>this.employee=e);
    this.subscription = this.contactService.get(this.id).valueChanges().subscribe(c => this.contacts = c);
  }

  save(contacts) {
    if (this.id) {
      this.contactService.update(this.id, contacts);
    }
    else {
      // todo generate a time stamp
      // var timestamp = "" + Date.now();
      // console.log(timestamp);
      // contacts.key = timestamp
      console.log(contacts)

      this.contactService.create(contacts);
    }
    if (!confirm('Are you sure  you want to submit?')) return;

    this.router.navigate(['/after-login']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)')
  }

  logout() {
    if (!confirm('Are you sure  you want to logout?')) return;
    this.auth.logout();
  }

  get f() { return this.registerForm.controls; }

  ngOnInit() {
    // this.registerForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   subject: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}