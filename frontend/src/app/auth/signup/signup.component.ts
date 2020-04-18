import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  private userStatueSub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userStatueSub = this.userService.getUserStatusListener().subscribe();
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    let username:string = form.value.username;
    let email:string = form.value.email;
    let password:string = form.value.password;
    this.userService.createUser({username, email, password} as User);
  }

  ngOnDestroy():void {
    this.userStatueSub.unsubscribe();
  }

}
