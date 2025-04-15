import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/user-management/auth.service';  // Service d'authentification
import { TokenService } from '../../core/services/user-management/token.service';  // Service pour gérer les tokens

declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) { }

  // Méthode de connexion avec email et mot de passe
  onLogin(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          const token = response.token;
          // Sauvegarde du jeton JWT dans localStorage
          localStorage.setItem('auth_token', token);

          // Redirection vers la page du profil
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

  // Méthode de connexion avec Facebook


  loginWithFacebook(): void {
    FB.login((response: any) => {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;
        console.log('Access Token:', accessToken);

        // Appel à ton backend pour valider le token Facebook et recevoir ton JWT
        this.authService.facebookLogin(accessToken).subscribe({
          next: (res: any) => {
            localStorage.setItem('auth_token', res.token);
            this.router.navigate(['/user-profile']);
          },
          error: (err) => {
            console.error('Erreur backend Facebook login', err);
          }
        });

      } else {
        console.log("Connexion Facebook annulée ou refusée.");
      }
    }, { scope: 'email,public_profile' });
  }





}
