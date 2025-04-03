import { Component } from '@angular/core';
import { User } from '../../core/entities/user/user.model';



import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = new User();

  constructor(private router: Router) { }

  onSubmit() {
    if (this.user) {
      console.log("User data:", this.user);
      // Ajoutez ici la logique pour envoyer les données à un service d'API
      // Rediriger vers la page de connexion après la soumission
      this.router.navigate(['/login']);
    }
  }
}
