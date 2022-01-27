import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.auth.isAuthenticated()) {
      return true
    } else {
      this.auth.logout()
      this.router.navigate(['/admin', 'login'], {
        // queryparams for information that session ended or user has to login again
        queryParams: {
          loginAgain: true
        }
      })
      return false
    }
  }

}
