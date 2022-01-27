 // interceptors are always registered in main app module

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../admin/shared/services/auth.service";

 @Injectable()

 export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.isAuthenticated()) {
      // adding token for every request
      req = req.clone({
        setParams: {
          auth: this.auth.token
        }
      })
    }
    // handle returns stream
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('[Interceptor error]: ', error)
          if (error.status === 401) {
            this.auth.logout()
            this.router.navigate(['/admin', 'login'], {
              queryParams: {
                authFailed: true
              }
            })
          }
          // throwerror makes observable from error object
          return throwError(() => error)
      }))
   }
 }
