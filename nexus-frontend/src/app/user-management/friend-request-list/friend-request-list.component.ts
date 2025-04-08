import { Component, OnInit } from '@angular/core';
import { FriendRequestService } from '../../core/services/user-management/friend-request.service';
import { UserProfileService } from '../../core/services/user-management/userprofile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friend-request-list',
  templateUrl: './friend-request-list.component.html',
  styleUrls: ['./friend-request-list.component.css']
})
export class FriendRequestListComponent implements OnInit {

  isLoading: boolean = false;
  availablePlayers: any[] = [];
  errorMessage: string = '';
  imageUrls: { [userId: number]: any } = {};

  userId!: number;
  constructor(
    private friendRequestService: FriendRequestService,
    private userProfileService: UserProfileService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = userId;
    this.loadAvailablePlayers(userId);
  }


  loadAvailablePlayers(userId: number): void {
    this.isLoading = true;
    this.friendRequestService.getAvailablePlayers(userId).subscribe({
      next: (players: any[]) => {
        this.availablePlayers = players;
        this.availablePlayers.forEach(player => {
          this.loadProfilePicture(player.id);
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = "Erreur lors du chargement des joueurs.";
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
        alert('Friend request sent successfully!');
        // Optionnel : retirer le joueur de la liste
        this.availablePlayers = this.availablePlayers.filter(p => p.id !== playerId);
      },
      error: () => {
        alert('Failed to send friend request.');
      }
    });
  }

}
