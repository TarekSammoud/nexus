import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/user-management/auth.service';
import { UserProfileService } from '../../core/services/user-management/userprofile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenService } from '../../core/services/user-management/token.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  errorMessage = '';
  selectedFile!: File;
  imageUrl: any;

  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.authService.getLoggedInUserProfile().subscribe({
      next: (data: any) => {
        this.user = data;
        this.loadProfilePicture(this.user.id);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la récupération des données.';
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadProfilePicture(): void {
    if (!this.selectedFile) return;

    this.userProfileService.uploadProfilePicture(this.user.id, this.selectedFile).subscribe({
      next: () => {
        this.loadProfilePicture(this.user.id);
      },
      error: () => {
        this.errorMessage = "Erreur lors de l'upload.";
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
        this.errorMessage = 'Image non trouvée.';
      }
    });
  }

  saveChanges(): void {
    this.userProfileService.updateUserProfile(this.user).subscribe({
      next: () => {
        alert('Profil mis à jour avec succès !');
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la mise à jour.';
      }
    });
  }
}
