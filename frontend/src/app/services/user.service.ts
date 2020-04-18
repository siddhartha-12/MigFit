import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root'}) 
export class UserService {

    private token: string;
    private isAuthenticated = false;
    private userId: string;
    private username: string;
    private userStatusListener = new Subject<boolean>();

    @Input() private user: User = {
        _id: '',
        email: '',
        username: '',
        password: '',
    };

    constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    }

    HttpOptions = {
        headers : new HttpHeaders({'content-type': 'application/json'})
    };

    getToken(){
        return this.token;
    }

    getUserId() {
        return this.userId;
    }

    getUsername() {
        return this.username;
    }

    getUser() {
        return this.user;
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
            this.router.navigate(['']);
        }, error => {
            console.log(error);
            this.router.navigate(['/signup']);
            this.userStatusListener.next(false);
        });
        
    }

    login(user: User) {
        this.http
        .post<{token: string, expiressIn: number, userId: string, username: string}>(
            "http://localhost:3030/user/login", 
            user
        )
          .subscribe(response => {
              const token = response.token;
              this.token = token;
              if (token) {
                  this.isAuthenticated = true;
                  this.userStatusListener.next(true);
                  this.userId = response.userId;
                  const expiresInDuration = response.expiressIn;
                  this.userStatusListener.next(true);
                  const now = new Date();
                  const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                //   this.setAuthTimer(expiresInDuration);
              }
              this.router.navigate(['/fitness/home']);
          }, error => {
              this.router.navigate(['']);
              this.userStatusListener.next(false);
          });
    }

    getUserProfile() {
        return this.http.get<{user: User}>("http://localhost:3030/user/userProfile/" + this.userId).subscribe(response => {
            this.user.password = response.user.password;
            this.user.email = response.user.email;
            this.user.username = response.user.username;
            // this.user = response.user;
        }, error => {
            this.router.navigate(['']);
            this.userStatusListener.next(false);
        });
    }

    updateProfile(username: string, email: string, newPassword: string, originPassword: string) {
        let userMap = new Map([
            ["id", this.userId],
            ["username", username],
            ['email', email],
            ["newPassword", newPassword],
            ['originPassword', originPassword]
        ]);
        let user : FormData;
        user = new FormData();
        console.log(user);
        user.append("id", this.userId);
        user.append("username", username);
        user.append('email', email);
        user.append("newPassword", newPassword);
        user.append('originPassword', originPassword);
        console.log(user);

        console.log(userMap);
        this.http
         .put("http://localhost:3030/user/userProfile/" + this.userId, userMap)
         .subscribe(response => {
             this.snackBar.open("Update successfully!", "OK", {duration: 2000,});
         }, error => {
            this.router.navigate(['']);
            this.userStatusListener.next(false);
         });

    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.userStatusListener.next(false);
        this.router.navigate(['/fitness/home']);
        this.userId = null;
        this.user = null;
    }

    showProfile() {
        if(this.isAuthenticated) {
            this.router.navigate(['/fitness/profile']);
        }
        else {
            this.router.navigate[''];
        }
    }

    showUpload() {
        if (this.isAuthenticated) {
            this.router.navigate(['/fitness/upload']);
        }
        else {
            this.router.navigate[''];
        }
    }
}