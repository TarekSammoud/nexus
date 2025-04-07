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
          console.log('User ID:', userId);  // Affiche l'ID de l'utilisateur dans la console
          localStorage.setItem('userId', JSON.stringify(userId));  // Stocke l'ID utilisateur dans localStorage

          // Redirigez vers le profil de l'utilisateur
          this.router.navigate([`/user-profile/${userId}`]);
        },
        error => {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in both email and password.';
    }
  }


}