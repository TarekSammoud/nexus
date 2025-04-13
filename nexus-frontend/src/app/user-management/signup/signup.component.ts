import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleType } from '../../core/entities/user/enums';
import { SignUp } from '../../core/entities/user/signup.model';
import { AuthService } from '../../core/services/user-management/auth.service'; // ✅ utiliser AuthService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: SignUp;
  RoleType = RoleType;
  emailError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.user = new SignUp({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleType: RoleType.PLAYER
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (!this.user.email || !this.user.password) {
      alert('Email et mot de passe sont requis');
      return;
    }

    // Commenter temporairement la vérification de l'email unique
    // this.authService.checkEmailUnique(this.user.email).subscribe({
    //   next: (isUnique) => {
    //     if (isUnique) {
    this.authService.register(this.user).subscribe({
      next: () => {
        console.log('Inscription réussie');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Erreur lors de l'inscription", err);
        alert('Erreur lors de l\'inscription.');
      }
    });
    //     } else {
    //       this.emailError = 'Cet email est déjà utilisé. Veuillez en choisir un autre.';
    //     }
    //   },
    //   error: () => {
    //     alert('Erreur lors de la vérification de l\'email.');
    //   }
    // });
  }
}
