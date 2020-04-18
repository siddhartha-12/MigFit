import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule} from "@angular/material/expansion";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { BmiComponent } from './bmi/bmi.component';
import { UploadSrcComponent } from './uploads/upload-src/upload-src.component';
import { UploadSrcListComponent } from './uploads/upload-src-list/upload-src-list.component';
import { UploadViewAllComponent } from './upload-view-all/upload-view-all.component';



//store
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MatSelectModule} from '@angular/material/select';
import { MealsComponent } from './meals/meals.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    LandingComponent,
    BmiComponent,
    UploadSrcComponent,
    UploadSrcListComponent,
    UploadViewAllComponent,
    MealsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatButtonModule,
    // Here is configuration for set up of store module
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    MatSelectModule,
  !environment.production ? StoreDevtoolsModule.instrument({ name: 'Fitness Dev Tools'}) : []
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
