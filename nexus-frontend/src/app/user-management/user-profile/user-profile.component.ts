import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/user-management/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = {};  // Contiendra les informations de l'utilisateur
  errorMessage: string = '';  // Pour afficher un message d'erreur si nécessaire

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserDetails();  // Appel de la méthode pour récupérer les informations utilisateur
  }

  getUserDetails(): void {
    const userId = JSON.parse(localStorage.getItem('userId') || '{}');  // Récupérer l'ID de l'utilisateur du localStorage
    if (userId) {
      this.authService.getUserProfile(userId).subscribe(
        response => {
          this.user = response;  // Affecter les informations de l'utilisateur récupérées
        },
        error => {
          this.errorMessage = 'Error fetching user details. Please try again later.';
        }
      );
    } else {
      this.errorMessage = 'No user data available. Please login again.';
    }
  }
}
