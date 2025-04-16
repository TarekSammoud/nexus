import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/user-management/auth.service';
import { UserProfileService } from '../core/services/user-management/userprofile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenService } from '../core/services/user-management/token.service';  // Import de TokenService

import { GameKeyService } from '../core/services/game-key.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private _gameKeyService: GameKeyService,
    private userProfileService: UserProfileService,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService
    // Injection du TokenService
    , private _router: Router,
    private gameKeyService: GameKeyService,
    private _fb: FormBuilder
  ) { }
  gameKeyForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';



  ngOnInit(): void {
    this.gameKeyForm= this._fb.group({
      keyCode: ['',Validators.required]
    })
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

  navigateToJams() {
    this._router.navigate(['jams']);
  }


  
  onSubmit(){
    if (this.gameKeyForm.valid){
      this._gameKeyService.redeemGameKey(this.gameKeyForm.value).subscribe({
    next: (res: boolean) => {
      if (res === true) {
        this.successMessage = 'Code redeemed successfully!';
        this.errorMessage = '';
        this.gameKeyForm.reset();

        setTimeout(() => this.successMessage = '', 3000); // optional auto-clear
      } else {
        this.successMessage = '';
        this.errorMessage = 'Invalid or already used code.';

        setTimeout(() => this.errorMessage = '', 3000); // optional auto-clear
      }
    },
    error: (err) => {
      this.successMessage = '';
      this.errorMessage = 'Something went wrong. Please try again.';
    }
  });
    }
  }

}
