import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './services/auth.guard';
import { BmiComponent } from './bmi/bmi.component';
import { UploadViewAllComponent } from './upload-view-all/upload-view-all.component';
import { UploadSrcComponent } from './uploads/upload-src/upload-src.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component'
import { MealsComponent } from './meals/meals.component';
import { AddFoodComponent } from './meals/add-food/add-food.component';
import { EditFoodComponent } from './meals/edit-food/edit-food.component';
import { ResultPaneComponent } from './meals/result-pane/result-pane.component';
import {Landingpage2Component} from './landingpage2/landingpage2.component';
import {ViewDetailsComponent} from './view-details/view-details.component';
import { Header2Component } from './header2/header2.component'
import { VideoLibraryComponent } from './video-library/video-library.component';
import { MealCreateComponent } from './meal-create/meal-create.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { MealItemComponent } from './meal-item/meal-item.component';
import { MealListComponent } from './meal-list/meal-list.component';

import { VideoDetailComponent } from './video-detail/video-detail.component';


const routes: Routes = [
  //if you want to add route guard within the page, add canActivate:[AuthGuard]
  //e.g. {path: 'profile/edit', component: ProfileComponent, canActivate:[AuthGuard]}
  { path: '', component:HomeComponent },
  { path: 'signin', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'fitness/home', component: LandingComponent },
  { path: 'home', component: Landingpage2Component },
  { path: 'header2', component: Header2Component },
  { path: 'bmi', component: BmiComponent},
  { path: 'fitness/upload', component: UploadViewAllComponent },
  { path: 'edit/:uploadId', component: UploadSrcComponent },
  { path: 'fitness/profile', component: ProfileComponent },
  { path: 'fitness/video_library', component: VideoLibraryComponent},
  { path: 'fitness/video_detail/:id', component: VideoDetailComponent},
  { path: 'meal', component: MealsComponent },
  { path: 'meal/add', component: AddFoodComponent },
  { path: 'edit/:id', component: EditFoodComponent},
  { path: 'list', component: ResultPaneComponent },  
  { path: 'viewDetails', component:ViewDetailsComponent},
  { path: 'create', component: MealCreateComponent },
  { path: 'edit/:id', component: MealEditComponent},
  { path: 'item/:id', component: MealItemComponent},
  { path: 'list', component: MealListComponent } 
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }