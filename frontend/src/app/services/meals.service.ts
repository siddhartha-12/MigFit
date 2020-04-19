import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Food } from 'src/app/models/food';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root'}) 
export class MealsService {

    private token: string;
    private isAuthenticated = false;
    private userId: string;
    private username: string;
    private description : string;
    private calories : number;
    private userStatusListener = new Subject<boolean>();

    @Input() private meal: Food = {
        _id:'',
        name: '',
        description: '',
        calories: null
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

    getDescription() {
        return this.description;
    }

    getUserStatusListener() {
        return this.userStatusListener.asObservable();
    }

    getIsAuthenticated() {
        return this.isAuthenticated;
    }

  
}