// signup.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoleType } from '../../core/entities/user/enums';
import { SignUp } from '../../core/entities/user/signup.model';
import { Role } from '../../core/entities/user/role.model';
import { UserService } from '../../core/services/user-management/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: SignUp;
  RoleType = RoleType; // ✅ Pour que le template y ait accès

  constructor(private userService: UserService, private router: Router) {
    this.user = new SignUp({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: new Role({ roleType: RoleType.PLAYER })
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (!this.user.email || !this.user.password) {
      alert('Email et mot de passe sont requis');
      return;
    }

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
  }
}
