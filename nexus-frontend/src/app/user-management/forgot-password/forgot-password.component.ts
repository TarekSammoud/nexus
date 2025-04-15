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

  // Méthode pour envoyer l'OTP et vérifier si l'email existe
  onSendOtp() {
    // Réinitialisation des messages
    this.message = '';
    this.error = '';

    // Vérification que l'email est saisi
    if (!this.email) {
      this.error = 'L\'email est requis';
      return;
    }

    // Appel au service pour envoyer l'OTP
    this.authService.sendOtp(this.email.trim()).subscribe({
      next: (response) => {
        console.log('Réponse reçue:', response);

        // Vérifie si le backend a répondu avec success: true
        if (response.success) {
          this.step = 2; // Passage à l'étape suivante (saisie OTP + nouveau mot de passe)
          this.message = response.message || 'Code envoyé par email.';
        } else {
          this.error = response.message || 'L\'utilisateur avec cet email n\'existe pas.';
        }
      },
      error: (err) => {
        // Gestion d’erreur serveur ou réseau
        console.error('Erreur lors de l\'envoi de l\'OTP:', err);
        this.error = err.error?.message || 'Erreur inconnue lors de l\'envoi du code';
      }
    });
  }

  // Méthode pour réinitialiser le mot de passe
  onResetPassword() {
    if (!this.otp || !this.newPassword) {
      this.error = 'Le code OTP et le nouveau mot de passe sont requis';
      return;
    }

    this.authService.resetPassword(this.email.trim(), this.otp.trim(), this.newPassword).subscribe({
      next: (response) => {
        console.log('Réponse reçue:', response); // Debug (à retirer en prod)

        // Si la réponse contient un message spécifique de succès, on passe à l'étape suivante
        if (response && response.includes("réinitialisé")) {  // Vérifie si la réponse contient "réinitialisé"
          this.message = response || 'Mot de passe réinitialisé avec succès.'; // Message venant du backend
          this.step = 3;  // Passe à l'étape 3 pour afficher le message de succès
          this.error = '';  // Réinitialiser les erreurs
        } else {
          this.error = response || 'Erreur inconnue lors de la réinitialisation du mot de passe';
        }
      },
      error: (err) => {
        // Gestion d’erreur serveur ou réseau
        console.error('Erreur lors de la réinitialisation:', err); // Debug
        this.error = err.error?.message || 'Erreur inconnue lors de la réinitialisation du mot de passe';
      }
    });
  }

}
