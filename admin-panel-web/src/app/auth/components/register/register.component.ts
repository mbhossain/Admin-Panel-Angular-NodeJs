/* Angular Stuff */
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';

/* Third party */
import { ToastrService } from 'ngx-toastr';

/* Our own stuff */
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { user } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public registerForm!: FormGroup;
  public fieldRequired: string = "This field is required";
  public user = new user();
  public hide:boolean = true;

  constructor(
    private _mdr: MatDialogRef<RegisterComponent>
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
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.registerForm = new FormGroup(
      {
        'username': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.pattern(emailregex)]),
        'password': new FormControl(null, [Validators.required, this.checkPassword]),
      }
    )


  }

  emaiErrors() {
    return this.registerForm.get('email')?.hasError('required') ? 'This field is required' :
      this.registerForm.get('email')?.hasError('pattern') ? 'Not a valid emailaddress' : ''
  }

  checkPassword(control: any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    return this.registerForm.get('password')?.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
      this.registerForm.get('password')?.hasError('requirements') ? 'Password at least six characters, one uppercase letter and one number' : '';
  }

  checkValidation(input: string) {
    const validation = this.registerForm.get(input)?.invalid && (this.registerForm.get(input)?.dirty || this.registerForm.get(input)?.touched)
    return validation;
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    this.user.email = formData.value.email;
    this.user.password = formData.value.password;
    this.user.username = formData.value.username;
    this.auth.registerUSer(this.user).subscribe(
      res => {
        // localStorage.setItem('token', res.token);
        console.log('res:',res)
        this._mdr.close(false);
        this._router.navigate(['login']);
        return this._toastr.success('Registration successfully!', "success");
      },
      err => {
        return this._toastr.error(err.statusText ? err.statusText : 'Unknown error!', "Error");
      }
    );
    formDirective.resetForm();
    this.registerForm.reset();
  }

}
