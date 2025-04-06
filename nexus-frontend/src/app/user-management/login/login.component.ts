import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/user-management/auth.service';  // Assurez-vous que le service est importé

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';  // Pour afficher les erreurs, si nécessaire

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        userId => {
          // Si l'authentification réussit, enregistrez l'ID de l'utilisateur dans localStorage
          localStorage.setItem('userId', JSON.stringify(userId));  // Stocke l'ID utilisateur dans localStorage

          // Redirigez vers le profil de l'utilisateur
          this.router.navigate(['/user-profile']);
        },
        error => {
          // Si erreur, affichez un message d'erreur
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in both email and password.';
    }
  }

}