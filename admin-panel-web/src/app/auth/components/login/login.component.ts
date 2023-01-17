/* Angular Stuff */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/* Third party */
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

/* Our own stuff */
import { user } from 'src/app/auth/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { RegisterComponent } from '../register/register.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public registerDialogRef!: MatDialogRef<RegisterComponent>;
  public forgetPasswordDialogRef!: MatDialogRef<ForgotPasswordComponent>;
  public name: string = 'Register';

  public errorMsg = '';
  public user = new user();
  public showprogressbar: boolean = false;
  public showPasswordOnPress: boolean = true;

  constructor(
    private _router: Router
    , private _auth: AuthenticationService
    , private _toastr: ToastrService
    , private _matDialog: MatDialog
  ) { }

  openModal() {
    this.registerDialogRef = this._matDialog.open(RegisterComponent, {
      data: { name: this.name },
      disableClose: true,
      // height: '100%',
      // width: '100%'
    });

    this.registerDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
        this.name = "";
      }
    });
  }

  forgotPassWord() {
    this.forgetPasswordDialogRef = this._matDialog.open(ForgotPasswordComponent, {
      data: { name: this.name },
      disableClose: true
    });

    this.forgetPasswordDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
        this.name = "";
      }
    });
  }

  ngOnInit() { }

  onSubmit() {
    this.showprogressbar = true;

    const isMailOrUsername = !!this.user.username?.includes('@');

    if (isMailOrUsername) {
      this.user.email = this.user.username;
      delete this.user.username;
    }

    this._auth.loginUser(this.user)
      .subscribe(res => {
        localStorage.setItem('token', res.token);
        this._router.navigate(['main']);
      },
        err => {
          return this._toastr.error(err.statusText ? err.statusText : 'Please Enter Valid Username or Password!', "Error");
        }
      )
  }

}
