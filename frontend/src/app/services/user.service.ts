import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root'}) 
export class UserService {

    private token: string;
    private isAuthenticated = false;
    private userStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) {}

    HttpOptions = {
        headers : new HttpHeaders({'content-type': 'application/json'})
    };

    getToken(){
        return this.token;
    }

    getUserStatusListener() {
        return this.userStatusListener.asObservable();
    }

    getIsAuthenticated() {
        return this.isAuthenticated;
    }

    createUser(user: User){
        this.http.post("http://localhost:3030/user/signup", user).subscribe(response => {
            console.log(response);
        });
        this.router.navigate(['']);
    }

    login(user: User) {
        this.http
        .post<{token: string, expiressIn: number}>(
            "http://localhost:3030/user/login", 
            user
        )
          .subscribe(response => {
              const token = response.token;
              this.token = token;
              if (token) {
                  this.isAuthenticated = true;
                  this.userStatusListener.next(true);
                  const expiresInDuration = response.expiressIn;
                //   this.setAuthTimer(expiresInDuration);
              }
              this.router.navigate(['/fitness/home']);
          })
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.userStatusListener.next(false);
        this.router.navigate(['/fitness/home']);
    }
}