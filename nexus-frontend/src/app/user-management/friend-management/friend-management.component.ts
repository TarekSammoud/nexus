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
  userId!: number; // ID de l'utilisateur
  friends: User[] = []; // Liste des amis
  imageUrls: { [userId: number]: any } = {}; // Pour stocker les URLs des images
  isLoading = false; // Indicateur de chargement

  constructor(
    private friendRequestService: FriendRequestService,
    private userProfileService: UserProfileService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const userId = TokenService.getUserId(); // Récupérer l'ID de l'utilisateur connecté
    if (userId) {
      this.userId = userId; // Assigner à userId si ce n'est pas null
      this.loadFriends();
    } else {
      console.error('Utilisateur non authentifié');
      // Vous pouvez rediriger vers la page de connexion si nécessaire
    }
  }


  // Charger les amis de l'utilisateur
  loadFriends(): void {
    this.isLoading = true;
    this.friendRequestService.getFriends(this.userId).subscribe(
      (friends: User[]) => {
        this.friends = friends;
        friends.forEach(friend => {
          if (friend.id !== null) { // Vérifier que l'ID n'est pas null
            this.loadProfilePicture(friend.id); // Charger les images de profil
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


  // Charger l'image de profil d'un utilisateur
  loadProfilePicture(userId: number): void {
    this.userProfileService.getProfilePicture(userId).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.imageUrls[userId] = this.sanitizer.bypassSecurityTrustUrl(objectURL); // Sécuriser l'URL
      },
      error: () => {
        this.imageUrls[userId] = null; // Si pas d'image, ne pas afficher
      }
    });
  }
}
