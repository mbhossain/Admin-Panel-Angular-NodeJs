/* Angular Stuff */
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  public name: string = '';

  constructor(
    private _mdr: MatDialogRef<ForgotPasswordComponent>
    , @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.name = data.name;
  }

  CloseDialog() {
    this._mdr.close(false)
  }

}
