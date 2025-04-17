import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/user-management/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';
  otp = '';
  newPassword = '';
  step = 1;
  message = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSendOtp() {
    this.message = '';
    this.error = '';

    if (!this.email) {
      this.error = 'L\'email est requis';
      return;
    }

    this.authService.sendOtp(this.email.trim()).subscribe({
      next: (response) => {
        if (response.success) {
          this.step = 2;
          this.message = response.message || 'Code envoyé par email.';
        } else {
          this.error = response.message || 'L\'utilisateur avec cet email n\'existe pas.';
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur inconnue lors de l\'envoi du code';
      }
    });
  }

  onResetPassword() {
    if (!this.otp || !this.newPassword) {
      this.error = 'Le code OTP et le nouveau mot de passe sont requis';
      return;
    }

    this.authService.resetPassword(this.email.trim(), this.otp.trim(), this.newPassword).subscribe({
      next: (response) => {
        if (response && response.includes("réinitialisé")) {
          this.message = response || 'Mot de passe réinitialisé avec succès.';
          this.step = 3;
          this.error = '';

          // 🔁 Redirection après 3 secondes
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.error = response || 'Erreur inconnue lors de la réinitialisation du mot de passe';
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur inconnue lors de la réinitialisation du mot de passe';
      }
    });
  }
}
