import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  //if you want to add route guard within the page, add canActivate:[AuthGuard]
  //e.g. {path: 'profile/edit', component: ProfileComponent, canActivate:[AuthGuard]}
  { path: '', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'fitness/home', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
