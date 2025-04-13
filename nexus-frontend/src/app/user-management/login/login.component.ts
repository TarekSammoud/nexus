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

          // Redirige vers le profil sans passer l'ID dans l'URL
          this.router.navigate(['/user-profile']);
        },
        (error) => {
          this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir l\'email et le mot de passe.';
    }
  }
}
