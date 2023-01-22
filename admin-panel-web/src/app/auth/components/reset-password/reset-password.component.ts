/* Angular Stuff */
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

/* Third party */
import { ToastrService } from 'ngx-toastr';

/* Our own stuff */
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Reset_Password } from '../../models/reset-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  public resetPasswordForm!: FormGroup;
  public fieldRequired: string = "This field is required";
  public resetPassword = new Reset_Password();
  public hide: boolean = true;

  constructor(
    private _mdr: MatDialogRef<ResetPasswordComponent>
    , @Inject(MAT_DIALOG_DATA) data: any
    , private auth: AuthenticationService
    , private _toastr: ToastrService
    , private _router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  CloseDialog() {
    this._mdr.close(false);
  }

  createForm() {
    this.resetPasswordForm = new FormGroup(
      {
        'reset_key': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required, this.checkPassword]),
      }
    )


  }

  checkPassword(control: any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    return this.resetPasswordForm.get('password')?.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
      this.resetPasswordForm.get('password')?.hasError('requirements') ? 'Password at least six characters, one uppercase letter and one number' : '';
  }

  checkValidation(input: string) {
    const validation = this.resetPasswordForm.get(input)?.invalid && (this.resetPasswordForm.get(input)?.dirty || this.resetPasswordForm.get(input)?.touched)
    return validation;
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    this.resetPassword.reset_key = formData.value.reset_key;
    this.resetPassword.password = formData.value.password;

    let passwordObj = {
      password: this.resetPassword.password
    };

    this.auth.resetPassword(this.resetPassword.reset_key, passwordObj).subscribe(
      res => {
        this._mdr.close(false);
        this._router.navigate(['login']);
        return this._toastr.success(res.statusText, "success");
      },
      err => {
        return this._toastr.error(err.statusText ? err.statusText : 'Unknown error!', "Error");
      }
    );
    formDirective.resetForm();
    this.resetPasswordForm.reset();
  }

}
