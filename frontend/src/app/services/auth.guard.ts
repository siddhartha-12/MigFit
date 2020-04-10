import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from './user.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private userService: UserService){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: import("@angular/router").RouterStateSnapshot
        ): boolean | import("@angular/router").UrlTree 
           | import("rxjs").Observable<boolean 
           | import("@angular/router").UrlTree> 
           | Promise<boolean | import("@angular/router").UrlTree> {
            //    const isAuth = this.userService
               return true;
    }
    
}