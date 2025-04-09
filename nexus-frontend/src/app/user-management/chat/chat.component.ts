import { ChatService } from '../../core/services/user-management/Chat.Service';
import { User } from '../../core/entities/user/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  friends: User[] = [];

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute, // Injecter ActivatedRoute pour récupérer l'ID
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur depuis l'URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.currentUserId = id ? +id : null; // Convertir l'ID en number

      if (this.currentUserId !== null) {
        // Connexion WebSocket si l'ID est valide
        this.chatService.connect(this.currentUserId.toString()); // Le service attend un string, donc convertir ici

        // Écoute des messages entrants
        this.chatService.messages$.subscribe(msg => {
          if (msg) this.messages.push(msg);
        });

        // Récupérer les amis de l'utilisateur
        this.chatService.getFriends(this.currentUserId).subscribe({
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

    this.chatService.sendMessage(this.currentUserId?.toString() || '', this.recipientId, this.messageContent);
    this.messageContent = '';
  }
}
