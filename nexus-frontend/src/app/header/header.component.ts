import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/user-management/auth.service';
import { UserProfileService } from '../core/services/user-management/userprofile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenService } from '../core/services/user-management/token.service';  // Import de TokenService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any = {};
  imageUrl: any = null;

  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService  // Injection du TokenService
  ) { }

  ngOnInit(): void {
    this.authService.getLoggedInUserProfile().subscribe({
      next: (user: any) => {
        this.user = user;

        const userId = TokenService.getUserId();  // Récupérer l'ID depuis le TokenService

        if (userId) {
          this.loadProfilePicture(userId);
        } else {
          console.error('ID utilisateur non trouvé dans le token.');
        }
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération du profil utilisateur', err);
      }
    });
  }

  loadProfilePicture(userId: number): void {
    this.userProfileService.getProfilePicture(userId).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: () => {
        this.imageUrl = null;
      }
    });
  }
}
