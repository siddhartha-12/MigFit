import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private userListenerSubs: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userListenerSubs = this.userService
      .getUserStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.userService.logout(); 
  }

  ngOnDestroy(): void {
    this.userListenerSubs.unsubscribe();
  }
}
