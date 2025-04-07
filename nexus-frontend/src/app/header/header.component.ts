import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/user-management/auth.service';
import { UserProfileService } from '../core/services/user-management/userprofile.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const userId = JSON.parse(localStorage.getItem('userId') || '{}');
    if (userId) {
      this.authService.getUserProfile(userId).subscribe({
        next: user => {
          this.user = user;
          this.loadProfilePicture(userId);
        },
        error: err => {
          console.error('Error fetching user profile', err);
        }
      });
    }
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
