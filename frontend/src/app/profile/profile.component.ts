import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user: User = {
    _id: '',
        email: '',
        username: '',
        password: '',
        gender: '',
        weight: 0,
        height: 0
  };

  isChangePassword = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
   this.userService.getUserProfile();
   this.user = this.userService.getUser();
   console.log(this.user);
  }

  changePassword() {
    this.isChangePassword = true;
  }

  updateProfile(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let username: string = form.value.username;
    let email: string = form.value.email;
    let newPassword: string = form.value.newPassword;
    let originPassword: string = form.value.currentPassword;
    if (newPassword === undefined) {
      console.log("empty new password");
      console.log(originPassword);
      this.userService.updateProfile(username, email, originPassword, originPassword);
    }
    else {
      console.log("have new password");
      console.log(newPassword);
      this.userService.updateProfile(username, email, newPassword, originPassword);
    }
  }
 
}
