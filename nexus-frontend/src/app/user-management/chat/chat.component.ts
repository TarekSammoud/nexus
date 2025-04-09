import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendRequestService } from '../../core/services/user-management/friend-request.service'; // importez FriendRequestService

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  messageContent = '';
  recipientId = ''; // sera choisi via dropdown
  currentUserId: number | null = null; // ID de type number
  friends: any[] = []; // Liste des amis

  constructor(
    private friendRequestService: FriendRequestService, // Utilisation du service FriendRequest
    private route: ActivatedRoute, // Injecter ActivatedRoute pour récupérer l'ID
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur depuis l'URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.currentUserId = id ? +id : null; // Convertir l'ID en number

      if (this.currentUserId !== null) {
        // Récupérer les amis de l'utilisateur
        this.friendRequestService.getAvailablePlayers(this.currentUserId).subscribe({
          next: (data) => {
            this.friends = data;
          },
          error: (err) => {
            console.error('Erreur lors du chargement des amis :', err);
          }
        });
      }
    });
  }

  sendMessage(): void {
    if (!this.messageContent.trim()) return;

    const isFriend = this.friends.some(friend => friend.id != null && friend.id === +this.recipientId);
    if (!isFriend) {
      alert("Vous ne pouvez envoyer un message qu'à vos amis !");
      return;
    }

    // Appel pour envoyer un message via chatService (si nécessaire)
    // this.chatService.sendMessage(this.currentUserId?.toString() || '', this.recipientId, this.messageContent);
    this.messageContent = '';
  }
}
