import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/user-management/auth.service';
import { UserProfileService } from '../core/services/user-management/userprofile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenService } from '../core/services/user-management/token.service';

import { GameKeyService } from '../core/services/game-key.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MetamaskService } from 'src/services/finance/metamask.service';
import { PanierService } from 'src/services/finance/panier.service';
import { WalletService } from 'src/services/finance/Crud/wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any = {};
  imageUrl: any = null;
  cartCountItems: number = 0;
  isWalletConnected: boolean = false;

  gameKeyForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private _gameKeyService: GameKeyService,
    private userProfileService: UserProfileService,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService,
    private walletService: WalletService,
    private panierService: PanierService,
    private metaMaskService: MetamaskService,
    private _fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.gameKeyForm = this._fb.group({
      keyCode: ['', Validators.required]
    });

    this.authService.getLoggedInUserProfile().subscribe({
      next: (user: any) => {
        this.user = user;
        const userId = TokenService.getUserId();

        if (userId) {
          this.loadProfilePicture(userId);
          this.isUserHaveWallet();
        } else {
          console.error('ID utilisateur non trouvé dans le token.');
        }
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération du profil utilisateur', err);
      }
    });

    this.panierService.countItems();
    this.panierService.count$.subscribe(newCount => {
      this.cartCountItems = newCount;
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

  isUserHaveWallet(): void {
    const userId = TokenService.getUserId();

    this.walletService.getWalletByUserId(userId).subscribe({
      next: (data) => {
        this.isWalletConnected = data?.metamaskPublicKey !== null;
      },
      error: (err) => {
        console.error('Error fetching wallet: on the header component', err);
      }
    });
  }

  navigateToJams() {
    this._router.navigate(['jams']);
  }

  goToWallet() {
    this._router.navigate([this.isWalletConnected ? '/wallet' : '/connectWallet']);
  }

  onSubmit() {
    if (this.gameKeyForm.valid) {
      this._gameKeyService.redeemGameKey(this.gameKeyForm.value).subscribe({
        next: (res: boolean) => {
          if (res === true) {
            this.successMessage = 'Code redeemed successfully!';
            this.errorMessage = '';
            this.gameKeyForm.reset();
            setTimeout(() => this.successMessage = '', 3000);
          } else {
            this.successMessage = '';
            this.errorMessage = 'Invalid or already used code.';
            setTimeout(() => this.errorMessage = '', 3000);
          }
        },
        error: (err) => {
          this.successMessage = '';
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this._router.navigate(['/login']);
  }
}
