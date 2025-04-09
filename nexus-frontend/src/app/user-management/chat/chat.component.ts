import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendRequestService } from '../../core/services/user-management/friend-request.service';
import { ChatService } from '../../core/services/user-management/Chat.Service';  // Utilisez le bon chemin
import { ChatMessage } from '../../core/entities/user/ChatMessage';  // Import du modèle ChatMessage

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];  // Type des messages mis à jour
  messageContent = '';
  recipientId: number = 0;  // ID du destinataire modifié pour être un nombre
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
        this.chatService.connect(this.currentUserId);  // Connexion au WebSocket

        this.friendRequestService.getFriends(this.currentUserId).subscribe({
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
            // Conversion du message reçu en objet ChatMessage avec IDs de type number
            const receivedMessage = new ChatMessage(+msg.senderId, +msg.recipientId, msg.content);
            this.messages.push(receivedMessage);  // Ajouter le message reçu à la liste
          }
        });
      }
    });
  }

  sendMessage(): void {
    if (!this.messageContent.trim()) return;

    const message = new ChatMessage(this.currentUserId || 0, this.recipientId, this.messageContent);

    // Affichage des détails dans la console
    console.log(`User ID (sender): ${this.currentUserId}`);
    console.log(`Recipient ID: ${this.recipientId}`);
    console.log(`Message Content: ${this.messageContent}`);

    // Ajouter le message à la liste des messages locaux
    this.messages.push(message);

    // Envoyer le message via le ChatService avec les IDs en number
    this.chatService.sendMessage(message.senderId, message.recipientId, this.messageContent);

    // Réinitialiser le champ de texte du message
    this.messageContent = '';
  }

}
