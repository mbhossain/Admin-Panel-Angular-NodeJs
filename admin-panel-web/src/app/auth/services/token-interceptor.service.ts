/* Angular Stuff */
import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

/* Our own stuff */
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: any, next: any) {
    let authService = this.injector.get(AuthenticationService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
