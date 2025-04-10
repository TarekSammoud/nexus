import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/user-management/auth.service';
import { UserProfileService } from '../../core/services/user-management/userprofile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    const userIdParam = this.route.snapshot.paramMap.get('id');
    const userId = userIdParam ? parseInt(userIdParam, 10) : null;

    if (userId) {
      this.authService.getUserProfile(userId).subscribe(
        response => {
          this.user = response;
          this.loadProfilePicture(userId);
        },
        error => {
          this.errorMessage = 'Erreur lors de la récupération des informations.';
        }
      );
    } else {
      this.errorMessage = 'ID utilisateur introuvable.';
    }
  }

  loadProfilePicture(userId: number): void {
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
