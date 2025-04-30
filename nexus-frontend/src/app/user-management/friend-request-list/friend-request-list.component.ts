import { Component, OnInit } from '@angular/core';
import { FriendRequestService } from '../../core/services/user-management/friend-request.service';
import { UserProfileService } from '../../core/services/user-management/userprofile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenService } from '../../core/services/user-management/token.service';

@Component({
  selector: 'app-friend-request-list',
  templateUrl: './friend-request-list.component.html',
  styleUrls: ['./friend-request-list.component.css']
})
export class FriendRequestListComponent implements OnInit {
  isLoading = false;
  availablePlayers: any[] = [];
  errorMessage = '';
  imageUrls: { [userId: number]: any } = {};
  receivedRequests: any[] = [];
  recommendedFriends: any[] = [];
  userId!: number;
  sentRequests: number[] = []; // IDs des demandes envoyées

  constructor(
    private friendRequestService: FriendRequestService,
    private userProfileService: UserProfileService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.userId = TokenService.getUserId()!;
    this.loadAvailablePlayers(this.userId);
    this.loadReceivedRequests(this.userId);
    this.loadRecommendedFriends(this.userId);
  }

  loadAvailablePlayers(userId: number): void {
    this.isLoading = true;
    this.friendRequestService.getAvailablePlayers(userId).subscribe({
      next: (players: any[]) => {
        this.availablePlayers = players;
        players.forEach(player => this.loadProfilePicture(player.id));
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des joueurs.';
        this.isLoading = false;
      }
    });
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

  sendFriendRequest(playerId: number): void {
    this.friendRequestService.sendFriendRequest(this.userId, playerId).subscribe({
      next: () => {
        alert('Demande d\'ami envoyée avec succès !');
        this.sentRequests.push(playerId); // Marque ce joueur comme déjà demandé
      },
      error: () => {
        alert('Échec de l\'envoi de la demande d\'ami.');
      }
    });
  }

  loadReceivedRequests(userId: number): void {
    this.friendRequestService.getReceivedFriendRequests(userId).subscribe({
      next: (requests: any[]) => {
        this.receivedRequests = requests;
        requests.forEach(req => this.loadProfilePicture(req.sender.id));
      },
      error: () => {
        console.error('Erreur lors du chargement des invitations reçues.');
      }
    });
  }

  acceptRequest(requestId: number): void {
    this.friendRequestService.acceptFriendRequest(requestId).subscribe({
      next: (updatedRequest) => {
        this.receivedRequests = this.receivedRequests.filter(r => r.idFriendRequest !== requestId);
        alert(`Demande acceptée de ${updatedRequest.sender.firstName} ${updatedRequest.sender.lastName}.`);
      },
      error: () => {
        alert('Échec lors de l\'acceptation de la demande.');
      }
    });
  }

  rejectRequest(requestId: number): void {
    this.friendRequestService.rejectFriendRequest(requestId).subscribe({
      next: () => {
        this.receivedRequests = this.receivedRequests.filter(r => r.idFriendRequest !== requestId);
        alert('Demande d\'ami rejetée.');
      },
      error: () => {
        alert('Échec lors du rejet de la demande.');
      }
    });
  }

  loadRecommendedFriends(userId: number): void {
    this.friendRequestService.getRecommendedFriends(userId).subscribe({
      next: (friends: any[]) => {
        this.recommendedFriends = friends;
        friends.forEach(friend => this.loadProfilePicture(friend.id));
      },
      error: () => {
        console.error('Erreur lors du chargement des recommandations d\'amis.');
      }
    });
  }
}
