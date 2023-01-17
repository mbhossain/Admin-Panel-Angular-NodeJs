/* Angular Stuff */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/* Our own stuff */
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private _authService: AuthenticationService
    , private _router: Router
  ) { }

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true
    } else {
      this._router.navigate(['/login']);
      return false
    }
  }

}
