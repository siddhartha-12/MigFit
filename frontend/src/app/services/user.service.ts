import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'}) 
export class UserService {

    private token: string;
    constructor(private http: HttpClient, private router: Router) {}

    HttpOptions = {
        headers : new HttpHeaders({'content-type': 'application/json'})
    };

    getToken(){
        return this.token;
    }

    createUser(user: User){
        this.http.post("http://localhost:3030/user/signup", user).subscribe(response => {
            console.log(response);
        });
    }

    login(user: User) {
        this.http.post<{token: string}>("http://localhost:3030/user/login", user)
          .subscribe(response => {
              const token = response.token;
              this.token = token;
              this.router.navigate(['/fitness/home']);
          })
    }
}