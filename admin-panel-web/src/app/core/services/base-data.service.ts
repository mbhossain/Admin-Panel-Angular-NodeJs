/* Angular Stuff */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Third party */
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseDataService {

  constructor(private _http: HttpClient) { }

  // formatErrors
  private formatErrors(error: any) {
    return throwError(error.error);
  }

  // Save
  public save<T>(path: string, entity: any): Observable<any> {
    return this._http.post<T>(
      `${path}`,
      entity,
      // JSON.stringify(entity),
      // this.headerProvd.getHeader('application/json')
    ).pipe(catchError(this.formatErrors));
  }

  // getCategory() {
  //   return this._http.get<any>('http://localhost:3000/api/get-all');
  // }

}
