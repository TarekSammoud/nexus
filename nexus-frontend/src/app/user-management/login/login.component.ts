import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/user-management/auth.service';  // Service d'authentification
import { TokenService } from '../../core/services/user-management/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          const token = response.token;
          localStorage.setItem('auth_token', token);

          const userId = TokenService.getUserId();
          // ✅ utilise ton service

          if (userId) {
            this.router.navigate(['/user-profile', userId]);
          } else {
            this.errorMessage = 'Impossible de récupérer l\'ID utilisateur.';
          }
        },
        (error) => {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in both email and password.';
    }
  }


}
