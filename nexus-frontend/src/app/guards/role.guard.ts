import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/user-management/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  user: any = {};

  constructor(private authService: AuthService, private router: Router) {
     this.authService.getLoggedInUserProfile().subscribe({
       next: (user: any) => {
         this.user = user;
         console.log('User profile:', this.user);
         console.log('User role:', this.user.roleType);
       },
       error: (error) => {
         console.error('Error fetching user profile:', error);
       }
     });
  }
  canActivate(): boolean {

    if (this.user && this.user.roleType==='DEVELOPER') {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
  
}
