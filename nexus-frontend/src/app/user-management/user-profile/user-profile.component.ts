import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../core/services/user-management/token.service';  // Service pour récupérer l'ID utilisateur depuis le token
import { AuthService } from '../../core/services/user-management/auth.service';  // Service pour récupérer le profil
import { UserProfileService } from '../../core/services/user-management/userprofile.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  errorMessage: string = '';
  imageUrl: any;

  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService  // Pour récupérer l'ID utilisateur à partir du token
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    const userId = TokenService.getUserId();  // Utilisation de TokenService.getUserId() pour récupérer l'ID utilisateur
    if (userId) {
      this.authService.getLoggedInUserProfile().subscribe(
        response => {
          this.user = response;
          this.loadProfilePicture();
        },
        error => {
          this.errorMessage = 'Erreur lors de la récupération des informations.';
        }
      );
    } else {
      this.errorMessage = 'Utilisateur non connecté.';
    }
  }

  loadProfilePicture(): void {
    const userId = TokenService.getUserId();  // Utilisation de TokenService.getUserId() pour récupérer l'ID utilisateur
    if (userId) {
      this.userProfileService.getProfilePicture(userId).subscribe({
        next: (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: () => {
          this.imageUrl = null; // Pas d’image => pas d'affichage
        }
      });
    }
  }
}
