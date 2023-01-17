/* Angular Stuff */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Third party */
import { ToastrModule } from 'ngx-toastr';

/* Our own stuff */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './auth/components/login/login.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './auth/components/not-found/not-found.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AuthenticationGuard } from './auth/services/authentication.guard';
import { TokenInterceptorService } from './auth/services/token-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule
    , BrowserAnimationsModule
    , ToastrModule.forRoot({
      timeOut: 3500
      , positionClass: 'toast-bottom-right'
      , preventDuplicates: true
    })
    , AppRoutingModule
    , FormsModule
    , ReactiveFormsModule
    , MaterialModule
    , HttpClientModule
  ],
  providers: [
    AuthenticationGuard
    , {
      provide: HTTP_INTERCEPTORS
      , useClass: TokenInterceptorService
      , multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
