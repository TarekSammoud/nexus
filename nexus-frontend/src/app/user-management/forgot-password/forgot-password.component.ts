import { Component } from '@angular/core';
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

  constructor(private authService: AuthService) { }

  onSendOtp() {
    this.authService.sendOtp(this.email).subscribe({
      next: () => {
        this.step = 2;
        this.message = 'Code envoyé par SMS.';
        this.error = '';
      },
      error: (err) => {
        this.error = err.error;
      }
    });
  }

  onResetPassword() {
    this.authService.resetPassword(this.email, this.otp, this.newPassword).subscribe({
      next: () => {
        this.message = 'Mot de passe réinitialisé avec succès.';
        this.step = 3;
      },
      error: (err) => {
        this.error = err.error;
      }
    });
  }
}
