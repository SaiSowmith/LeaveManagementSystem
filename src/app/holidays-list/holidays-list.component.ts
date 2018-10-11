import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';


@Component({
  selector: 'holidays-list',
  templateUrl: './holidays-list.component.html',
  styleUrls: ['./holidays-list.component.css']
})


export class HolidaysListComponent implements OnInit {

  appUser: AppUser;

  constructor(
    public auth: AuthService) {

    auth.appUser$.subscribe(appUser => this.appUser = appUser);

  }


  logout() {
    if (!confirm('Are you sure  you want to logout?')) return;
    this.auth.logout();
  }

  ngOnInit() {
  }
  
}

