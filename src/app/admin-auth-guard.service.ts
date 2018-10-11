import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})

export class AdminAuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private userService: UserService) { }

  // canActivate():Observable<boolean>{
  // return this.auth.user$
  //   .switchMap(user=>{
  //     return this.userService.get(user.uid);
  //   })
  //   .map(AppUser=>AppUser.isAdmin); 
  //   }

  // canActivate(): Observable<boolean> {
  //   return this.auth.user$.switchMap(user => 
  //   this.userService.get(user.uid)).map((appUser :any) => appUser.isAdmin);
  // }
  canActivate(): Observable<boolean> {
    return this.auth.appUser$
      .map(appUser => appUser.isAdmin);
  }

}
