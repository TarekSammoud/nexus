import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendRequestService } from '../../core/services/user-management/friend-request.service';
import { ChatService } from '../../core/services/user-management/Chat.Service'; // importez le service de chat

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  messageContent = '';
  recipientId = '';
  currentUserId: number | null = null;
  friends: any[] = [];

  constructor(
    private friendRequestService: FriendRequestService,
    private chatService: ChatService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.currentUserId = id ? +id : null;

      if (this.currentUserId !== null) {
        this.chatService.connect(this.currentUserId.toString());  // Connexion au WebSocket

        this.friendRequestService.getAvailablePlayers(this.currentUserId).subscribe({
          next: (data) => {
            this.friends = data;
          },
          error: (err) => {
            console.error('Erreur lors du chargement des amis :', err);
          }
        });

        // Souscrire aux messages reçus
        this.chatService.messages$.subscribe(msg => {
          if (msg) {
            this.messages.push(msg);  // Ajouter les messages reçus à la liste
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

    const message = {
      senderId: this.currentUserId?.toString() || '',
      recipientId: this.recipientId,
      content: this.messageContent
    };

    // Ajouter le message envoyé à la liste
    this.messages.push({
      senderId: this.currentUserId?.toString(),
      content: this.messageContent,
      recipientId: this.recipientId
    });

    // Envoyer le message via le ChatService
    this.chatService.sendMessage(message.senderId, this.recipientId, this.messageContent);
    this.messageContent = '';  // Réinitialiser le champ de texte
  }
}