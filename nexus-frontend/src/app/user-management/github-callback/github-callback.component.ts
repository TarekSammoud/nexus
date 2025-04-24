import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/user-management/auth.service';

@Component({
  selector: 'app-github-callback',
  template: '<p>Authentification GitHub en cours...</p>',
  styleUrls: ['./github-callback.component.css']
})
export class GithubCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer le paramètre 'code' de l'URL
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      console.log('Received GitHub code:', code);  // Log the received code
      if (code) {
        this.authService.githubLogin(code).subscribe({
          next: (res: any) => {
            localStorage.setItem('auth_token', res.token);
            this.router.navigate(['/user-profile']);
          },
          error: (err) => {
            console.error('GitHub login error:', err);
          }
        });
      } else {
        console.error('No GitHub code received');
      }
    });

  }
}
