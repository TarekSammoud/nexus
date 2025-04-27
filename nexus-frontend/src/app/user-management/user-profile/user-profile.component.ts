import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../core/services/user-management/token.service';
import { AuthService } from '../../core/services/user-management/auth.service';
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
  isLoading: boolean = false;  // Indicateur de chargement
  animationResult: any = null;
  taskId: string = '';

  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {

    this.getUserDetails();
  }

  getUserDetails(): void {

    const userId = TokenService.getUserId();
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
    const userId = TokenService.getUserId();
    if (userId) {
      this.userProfileService.getProfilePicture(userId).subscribe({
        next: (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: () => {
          this.imageUrl = null;  // Pas d'image => pas d'affichage
        }
      });
    }
  }

  uploadToFaceAnimer(): void {
    this.isLoading = true;  // Début du chargement
    const userId = TokenService.getUserId();
    if (userId) {
      this.userProfileService.getProfilePicture(userId).subscribe({
        next: (blob: Blob) => {
          const file = new File([blob], "profile-picture.jpg", { type: blob.type });
          const formData = new FormData();
          formData.append('file', file);

          // Appel API : POST /nexus-backend/api/face-animer/upload
          this.userProfileService.uploadAvatar(file).subscribe(
            (data: any) => {
              console.log('Upload success:', data);
              this.taskId = data.data || ''; // Adapté en fonction de la réponse réelle
              this.isLoading = false;  // Fin du chargement
              this.getAnimationResult();  // Demander le résultat de l'animation
            },
            error => {
              this.isLoading = false;  // Fin du chargement en cas d'erreur
              this.errorMessage = 'Erreur lors de l\'upload de l\'image.';
            }
          );
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Erreur lors de la récupération de l\'image.';
        }
      });
    }
  }


  getAnimationResult(): void {
    if (!this.taskId) return;

    this.isLoading = true;  // Début du chargement

    // Fonction de polling
    const checkAnimation = () => {
      this.userProfileService.getTaskInfo(this.taskId).subscribe(
        (data: any) => {
          console.log('Task info:', data);
          if (data?.data?.status === 1 && data?.data?.previewUrl) {
            this.animationResult = data;
            this.isLoading = false;  // Fin du chargement
          } else if (data?.data?.status === 0) {
            // L'avatar est en cours de traitement, reessayer dans quelques secondes
            setTimeout(checkAnimation, 3000);  // Vérifier à nouveau après 3 secondes
          } else {
            this.isLoading = false;
            this.errorMessage = 'Erreur lors de la génération de l\'avatar.';
          }
        },
        error => {
          this.isLoading = false;
          this.errorMessage = 'Erreur lors de la récupération de l\'animation.';
        }
      );
    };

    checkAnimation();  // Démarre le polling
  }


}
