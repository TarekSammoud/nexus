import { Component, OnInit } from '@angular/core';
import { BlockList } from '../../core/entities/user/BlockList.model';
import { UserProfileService } from '../../core/services/user-management/userprofile.service';

import { BlockListService } from '../../core/services/user-management/block-list.service';
@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.css']
})
export class BlockedUsersComponent implements OnInit {
  blockedUsers: BlockList[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private blockListService: BlockListService,
    private userProfileService: UserProfileService  // Injection du service
  ) { }

  ngOnInit(): void {
    this.fetchBlockedUsers();
  }

  fetchBlockedUsers(): void {
    this.blockListService.getBlockedUsers().subscribe(
      (data) => {
        this.blockedUsers = data;
        // Pour chaque utilisateur bloqué, récupérer ses détails
        this.blockedUsers.forEach(blockedUser => {
          // Vérifie que blockedUser.blockedUser.id n'est ni null ni undefined
          if (blockedUser.blockedUser?.id) {
            this.userProfileService.getUserById(blockedUser.blockedUser.id).subscribe(
              (userDetails) => {
                blockedUser.blockedUser = userDetails;
              },
              (error) => {
                this.errorMessage = 'Erreur lors du chargement des détails de l\'utilisateur.';
              }
            );
          } else {
            this.errorMessage = 'ID de l\'utilisateur bloqué non valide.';
          }
        });
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des utilisateurs bloqués.';
        this.loading = false;
      }
    );
  }

  deleteBlockedUser(id: number): void {
    this.blockListService.removeBlock(id).subscribe(
      () => {
        this.blockedUsers = this.blockedUsers.filter(user => user.idBlockList !== id);
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la suppression du blocage.';
      }
    );
  }
}
