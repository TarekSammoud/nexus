import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/user-management/auth.service';
import { UserProfileService } from '../../core/services/user-management/userprofile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderComponent } from '../../header/header.component'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = {};  // Contiendra les informations de l'utilisateur
  errorMessage: string = '';  // Pour afficher un message d'erreur si nécessaire



  selectedFile!: File;
  uploadProgress: number = 0;
  imageUrl: any;


  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.getUserDetails();  // Appel de la méthode pour récupérer les informations utilisateur
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
          this.errorMessage = 'Error fetching user details. Please try again later.';
        }
      );
    } else {
      this.errorMessage = 'No user ID in URL. Please try again.';
    }
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadProfilePicture(): void {
    if (!this.selectedFile) return;
    const userId = this.user.id;

    this.userProfileService.uploadProfilePicture(userId, this.selectedFile).subscribe({
      next: event => {
        this.uploadProgress = 100;
        this.loadProfilePicture(userId);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l’upload de la photo.';
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
        this.imageUrl = null; // Pas d’image => pas de preview
      }
    });
  }

}


