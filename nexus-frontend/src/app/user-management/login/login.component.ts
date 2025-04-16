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
  loginWithFacebook() {
    /*FB.login((response: any) => {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;
        console.log('Facebook Access Token:', accessToken);

        // Demander des informations publiques et l'email
        FB.api('/me', { fields: 'id,name,email,first_name,last_name,picture' }, (userInfo: any) => {
          console.log('Informations utilisateur récupérées:', userInfo);
          // Ici, tu peux accéder à toutes les informations de l'utilisateur récupérées
          const { id, name, email, first_name, last_name, picture } = userInfo;

          // Appel au backend pour vérifier le token et obtenir un JWT + rôle
          this.authService.facebookLogin(accessToken).subscribe({
            next: (res: any) => {
              console.log('Connexion via Facebook réussie', res);

              const jwtToken = res.token;
              const userEmail = res.email;
              const userFirstName = res.firstName; // Le prénom
              const userLastName = res.lastName; // Le nom
              const userProfilePicture = res.profilePicture;

              // Sauvegarde du JWT et des informations utilisateur dans localStorage
              localStorage.setItem('auth_token', jwtToken);
              localStorage.setItem('user_email', userEmail);
              localStorage.setItem('user_name', userFirstName);
              localStorage.setItem('user_picture', userProfilePicture?.data?.url);  // URL de la photo de profil

              // Redirection vers la page du profil
              this.router.navigate(['/user-profile']);
            },
            error: (err: any) => {
              console.error('Erreur lors de la connexion Facebook', err);
              this.errorMessage = 'Erreur de connexion via Facebook, veuillez réessayer.';
            }
          });
        });
      } else {
        console.log('Utilisateur a annulé la connexion ou n’a pas autorisé l’app.');
      }
    }, { scope: 'email,public_profile' });*/
  }





}
