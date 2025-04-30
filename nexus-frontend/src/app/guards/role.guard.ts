import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../core/services/user-management/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/unauthorized']);
      return of(false);
    }

    return this.authService.getLoggedInUserProfile().pipe(
      map((user: any) => {
        const role = user.roleType;
        const isAuthorized = role === 'ADMIN' || role === 'DEVELOPER';

        if (isAuthorized) {
          return true;
        }

        this.router.navigate(['/unauthorized']);
        return false;
      }),
      catchError((error) => {
        console.error('Error in RoleGuard:', error);
        this.router.navigate(['/unauthorized']);
        return of(false);
      })
    );
  }
}
