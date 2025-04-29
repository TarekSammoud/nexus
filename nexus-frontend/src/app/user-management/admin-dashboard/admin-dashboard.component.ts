import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../core/services/user-management/userprofile.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user-management/UserService';

import { BlockListService } from '../../core/services/user-management/block-list.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];  // Tableau pour stocker les utilisateurs
  loading: boolean = true; // Indicateur de chargement
  errorMessage: string = ''; // Message d'erreur, si besoin

  blockReason: string = '';
  blockUntilDate: string = ''; // Format YYYY-MM-DD
  selectedUser: any;
  isModalOpen: boolean = false; // Indicateur pour afficher/fermer le modal

  constructor(private userProfileService: UserProfileService, private blockListService: BlockListService, private router: Router) { }

  ngOnInit(): void {
    // Appeler le service pour obtenir les utilisateurs
    this.userProfileService.getAllUsers().subscribe(
      (data) => {
        this.users = data;  // Assigner les utilisateurs récupérés
        this.loading = false;  // Arrêter le chargement
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des utilisateurs';  // Afficher un message d'erreur en cas d'échec
        this.loading = false;  // Arrêter le chargement
      }
    );
  }

  // Ouvrir le modal de blocage avec les informations de l'utilisateur sélectionné
  openBlockModal(user: any): void {
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  // Fermer le modal de blocage
  closeBlockModal(): void {
    this.isModalOpen = false;
    this.blockReason = '';
    this.blockUntilDate = '';
  }

  // Soumettre les informations de blocage
  onBlockSubmit(): void {
    if (this.blockReason && this.blockUntilDate) {
      const currentDate = new Date();
      if (new Date(this.blockUntilDate) <= currentDate) {
        this.errorMessage = 'La date de fin de blocage doit être supérieure à la date actuelle.';
        return;
      }

      const blockDetails = {
        blockedUser: this.selectedUser,
        blockedAt: new Date(),  // Date actuelle pour le début du blocage
        blockedUntil: this.blockUntilDate,
        reason: this.blockReason,
      };

      // Appel au service BlockList pour ajouter l'utilisateur à la liste de blocage
      this.blockListService.addBlockList(blockDetails).subscribe(
        (response) => {
          console.log('Utilisateur bloqué:', response);
          this.users = this.users.filter(u => u.id !== this.selectedUser.id); // Retirer l'utilisateur de la liste
          this.closeBlockModal(); // Fermer le modal après avoir bloqué l'utilisateur
        },
        (error) => {
          this.errorMessage = 'Erreur lors du blocage de l\'utilisateur';  // Afficher un message d'erreur
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs.';
    }
  }
}
