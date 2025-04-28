import { Component, OnInit } from '@angular/core';
import { FriendRequestService } from '../../core/services/user-management/friend-request.service';
import { UserProfileService } from '../../core/services/user-management/userprofile.service';
import { TokenService } from '../../core/services/user-management/token.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../core/entities/user/user.model';

@Component({
  selector: 'app-friend-management',
  templateUrl: './friend-management.component.html',
  styleUrls: ['./friend-management.component.css']
})
export class FriendManagementComponent implements OnInit {
  userId!: number; // Utilisation de l'opérateur ! pour indiquer que userId ne sera jamais null
  friends: User[] = [];
  imageUrls: { [userId: number]: any } = {};
  isLoading = false;

  constructor(
    private friendRequestService: FriendRequestService,
    private userProfileService: UserProfileService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.userId = TokenService.getUserId()!; // Utilisation de ! pour garantir que userId est un nombre non null
    if (this.userId) { // Assurez-vous que userId est un nombre valide
      this.loadFriends();
    } else {
      console.error('Utilisateur non authentifié');
    }
  }

  loadFriends(): void {
    this.isLoading = true;
    this.friendRequestService.getFriends(this.userId).subscribe(
      (friends: User[]) => {
        this.friends = friends;
        friends.forEach(friend => {
          if (friend.id !== null) {
            this.loadProfilePicture(friend.id);
          }
        });
        this.isLoading = false;
      },
      error => {
        console.error('Erreur lors du chargement des amis:', error);
        this.isLoading = false;
      }
    );
  }

  loadProfilePicture(userId: number): void {
    this.userProfileService.getProfilePicture(userId).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.imageUrls[userId] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: () => {
        this.imageUrls[userId] = null;
      }
    });
  }

  removeFriend(userId1: number, userId2: number): void {
    if (userId1 && userId2) {
      this.friendRequestService.removeFriend(userId1, userId2).subscribe(
        () => {
          this.friends = this.friends.filter(friend => friend.id !== userId2);
        },
        error => {
          console.error('Erreur lors de la suppression de l\'ami:', error);
        }
      );
    } else {
      console.error('Erreur: un ou plusieurs IDs sont invalides');
    }
  }
}
