/* Angular Stuff */
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';

/* Third party */
import { ToastrService } from 'ngx-toastr';

/* Our own stuff */
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Forget_Password } from '../../models/forget-password';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  public forgetPasswordForm!: FormGroup;
  public fieldRequired: string = "This field is required";
  public forgetPassword = new Forget_Password();

  public resetPasswordDialogRef!: MatDialogRef<ResetPasswordComponent>;
  public name: string = 'Password Reset!';

  constructor(
    private _mdr: MatDialogRef<ForgotPasswordComponent>
    , @Inject(MAT_DIALOG_DATA) data: any
    , private auth: AuthenticationService
    , private _toastr: ToastrService
    , private _router: Router
    , private _matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.createForm();
  }

  CloseDialog() {
    this._mdr.close(false);
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.forgetPasswordForm = new FormGroup(
      {
        // 'username': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.pattern(emailregex)])
      }
    )
  }

  emaiErrors() {
    return this.forgetPasswordForm.get('email')?.hasError('required') ? 'This field is required' :
      this.forgetPasswordForm.get('email')?.hasError('pattern') ? 'Not a valid emailaddress' : ''
  }

  checkValidation(input: string) {
    const validation = this.forgetPasswordForm.get(input)?.invalid && (this.forgetPasswordForm.get(input)?.dirty || this.forgetPasswordForm.get(input)?.touched)
    return validation;
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    this.forgetPassword.email = formData.value.email;
    // this.forgetPassword.username = formData.value.username;
    this.auth.resetPasswordSendMail(this.forgetPassword).subscribe(
      res => {
        // localStorage.setItem('token', res.token);
        console.log('res:', res)
        this._mdr.close(false);
        this.openResetPassWordModal();
        return this._toastr.success(res.statusText, "success");
      },
      err => {
        return this._toastr.error(err.statusText ? err.statusText : 'Unknown error!', "Error");
      }
    );
    formDirective.resetForm();
    this.forgetPasswordForm.reset();
  }

  openResetPassWordModal() {
    this.resetPasswordDialogRef = this._matDialog.open(ResetPasswordComponent, {
      data: { name: this.name },
      disableClose: true
    });

    this.resetPasswordDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
        this.name = "";
      }
    });
  }

}
