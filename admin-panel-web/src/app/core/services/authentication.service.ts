/* Angular Stuff */
import { Injectable } from '@angular/core';

/* Third party */

/* Our own stuff */
import { user } from 'src/app/auth/models/user';
import { url } from '../config';
import { BaseDataService } from './base-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private serverPath = url.apiUrl;
  public user = new user;

  constructor(
    private apiService: BaseDataService
  ) { }

  loginUser(user: {}) {
    return this.apiService.save<any>(this.serverPath + 'login', user)
  }

  registerUSer(user: {}) {
    return this.apiService.save<any>(this.serverPath + 'register', user)
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    return localStorage.removeItem('token');
  }


}
