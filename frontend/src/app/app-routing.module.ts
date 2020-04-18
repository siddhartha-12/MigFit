
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './services/auth.guard';
import { BmiComponent } from './bmi/bmi.component';
import { UploadViewAllComponent } from './upload-view-all/upload-view-all.component';
import { UploadSrcComponent } from './uploads/upload-src/upload-src.component';



const routes: Routes = [
  //if you want to add route guard within the page, add canActivate:[AuthGuard]
  //e.g. {path: 'profile/edit', component: ProfileComponent, canActivate:[AuthGuard]}
  { path: '', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'fitness/home', component: LandingComponent },
  { path: 'bmi', component: BmiComponent},
  { path: 'fitness/upload', component: UploadViewAllComponent },
  { path: 'edit/:uploadId', component: UploadSrcComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
