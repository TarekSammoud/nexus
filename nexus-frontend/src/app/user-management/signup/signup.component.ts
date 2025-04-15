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
  phoneError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.user = new SignUp({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleType: RoleType.PLAYER,
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (!this.user.email || !this.user.password) {
      alert('Email et mot de passe sont requis');
      return;
    }

    // Vérification de l'unicité de l'email
    this.authService.checkEmailUnique(this.user.email).subscribe({
      next: (isUnique) => {
        if (!isUnique) {
          this.emailError = 'Cet email est déjà utilisé. Veuillez en choisir un autre.';
          return;  // Arrêter l'exécution si l'email n'est pas unique
        }

        // Vérification de l'unicité du numéro de téléphone (si défini)
        if (this.user.phoneNumber) {  // Vérification que phoneNumber existe
          this.authService.checkPhoneUnique(this.user.phoneNumber).subscribe({
            next: (isPhoneUnique) => {
              if (!isPhoneUnique) {
                this.phoneError = 'Le numéro de téléphone est déjà utilisé.';
                return;  // Arrêter l'exécution si le numéro de téléphone n'est pas unique
              }

              // Si tout est valide, inscrire l'utilisateur
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
            },
            error: () => {
              this.phoneError = 'Erreur lors de la vérification du numéro de téléphone.';
            }
          });
        } else {
          // Si phoneNumber est vide ou non défini, continuer sans vérifier l'unicité du numéro
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
        }
      },
      error: () => {
        this.emailError = 'Erreur lors de la vérification de l\'email.';
      }
    });
  }

}
