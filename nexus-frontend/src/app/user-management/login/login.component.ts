import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/user-management/auth.service';
import { TokenService } from '../../core/services/user-management/token.service';

declare global {
  interface Window { fbAsyncInit: () => void; }
}
declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.loadFacebookSDK();

    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      this.authService.githubLogin(code).subscribe({
        next: (res: any) => {
          localStorage.setItem('auth_token', res.token);
          this.router.navigate(['/user-profile']);
        },
        error: (err) => {
          console.error('Erreur backend GitHub login', err);
          this.errorMessage = 'Échec de l’authentification GitHub.';
        }
      });
    }
  }


  loadFacebookSDK(): void {
    if (document.getElementById('facebook-jssdk')) return;

    window.fbAsyncInit = () => {
      FB.init({
        appId: '1021564546008110',
        cookie: true,
        xfbml: true,
        version: 'v15.0'
      });
      FB.AppEvents.logPageView();
    };

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  onLogin(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          const token = response.token;
          localStorage.setItem('auth_token', token);
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

  loginWithFacebook(): void {
    FB.login((response: any) => {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;
        console.log('Access Token:', accessToken);

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


  loginWithGithub(): void {
    const clientId = 'Ov23li0qwXhIrPaTVfkg'; // Replace with your actual GitHub client ID
    const redirectUri = encodeURIComponent('http://localhost:4200/github-callback'); // Callback URL should match exactly
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;

    console.log('Redirecting to GitHub OAuth: ', githubAuthUrl); // Add a log to verify the URL
    window.location.href = githubAuthUrl;
  }



}
