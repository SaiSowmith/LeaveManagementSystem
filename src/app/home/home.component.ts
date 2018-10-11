import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AppUser} from './../models/app-user'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  appUser:AppUser;

  constructor(
    public auth:AuthService) { 

    auth.appUser$.subscribe(appUser =>this.appUser=appUser);
    
  }

  logout(){
    if(!confirm('Are you sure  you want to logout?'))return ;
    this.auth.logout();
  }

}