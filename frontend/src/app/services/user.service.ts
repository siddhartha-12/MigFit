import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root'}) 
export class UserService {

    constructor(private http: HttpClient) {}

    HttpOptions = {
        headers : new HttpHeaders({'content-type': 'application/json'})
    };

    createUser(user: User){
        this.http.post("http://localhost:3030/signup", user).subscribe(response => {
            console.log(response);
        });
    }

    login(user: User) {
        this.http.post("url", user)
          .subscribe(response => {
              console.log(response);
          })
    }
}