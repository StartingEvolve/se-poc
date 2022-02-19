import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  UrlTree,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStore } from '@core/store/auth/auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private as: AuthStore
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          if (!user.emailVerified) {
            this.router.navigate(['/verify-email']);
          }
          // if the user hasn't verified their email, send them to that page

          resolve(true);
        } else {
          console.log('Auth Guard: userState is not logged in');
          // not logged in so redirect to login page with the return url and return false
          this.router.navigate(['signin'], {
            queryParams: { returnUrl: state.url }
          }); // a logged out userState will always be sent to home
          resolve(false);
        }
      });
    });
  }
}
