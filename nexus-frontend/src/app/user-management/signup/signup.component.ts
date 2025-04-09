import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleType } from '../../core/entities/user/enums';
import { SignUp } from '../../core/entities/user/signup.model';
import { UserService } from '../../core/services/user-management/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: SignUp;
  RoleType = RoleType; // ✅ Pour que le template y ait accès
  emailError: string | null = null; // Pour afficher l'erreur d'email

  constructor(private userService: UserService, private router: Router) {
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
    // Vérification de l'email
    if (!this.user.email || !this.user.password) {
      alert('Email et mot de passe sont requis');
      return;
    }

    // Vérification de l'unicité de l'email
    this.userService.checkEmailUnique(this.user.email).subscribe({
      next: (isEmailUnique) => {
        if (isEmailUnique) {
          // L'email est unique, on peut soumettre l'inscription
          this.userService.createUser(this.user).subscribe({
            next: (response) => {
              console.log('Inscription réussie', response);
              this.router.navigate(['/login']);
            },
            error: (error) => {
              console.error("Erreur d'inscription", error);
              alert('Une erreur est survenue lors de l\'inscription.');
            }
          });
        } else {
          // L'email est déjà utilisé
          this.emailError = 'Cet email est déjà utilisé. Veuillez en choisir un autre.';
        }
      },
      error: (error) => {
        console.error('Erreur lors de la vérification de l\'email', error);
        alert('Une erreur est survenue lors de la vérification de l\'email.');
      }
    });
  }
}
