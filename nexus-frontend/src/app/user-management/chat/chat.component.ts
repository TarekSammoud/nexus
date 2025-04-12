import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendRequestService } from '../../core/services/user-management/friend-request.service';
import { ChatService } from '../../core/services/user-management/Chat.Service';
import { ChatMessage } from '../../core/entities/user/ChatMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = []; // Correction du type ici
  messageContent = '';
  recipientId: number = 0;
  currentUserId: number | null = null;
  friends: any[] = [];
  private messageInterval: any;

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
        this.chatService.connect(this.currentUserId);

        this.friendRequestService.getFriends(this.currentUserId).subscribe({
          next: (data) => {
            this.friends = data;
          },
          error: (err) => {
            console.error('Erreur lors du chargement des amis :', err);
          }
        });

        this.chatService.messages$.subscribe((msg: ChatMessage) => {  // Ajout du type ici
          if (msg && this.isPrivateMessage(msg)) {
            this.messages.push(msg);
            console.log('Message privé reçu:', msg);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }
  }

  isPrivateMessage(msg: ChatMessage): boolean {
    return (
      (msg.senderId === this.currentUserId && msg.recipientId === this.recipientId) ||
      (msg.senderId === this.recipientId && msg.recipientId === this.currentUserId)
    );
  }

  loadMessages(): void {
    if (this.currentUserId && this.recipientId) {
      this.chatService.getMessages(this.currentUserId).subscribe(
        (messages: ChatMessage[]) => { // Spécification du type ici
          this.messages = messages.filter(msg => this.isPrivateMessage(msg));
        },
        (error) => {
          console.error('Erreur lors de la récupération des messages', error);
        }
      );
    }
  }

  sendMessage(): void {
    if (!this.messageContent.trim() || !this.currentUserId || !this.recipientId) {
      console.warn("Message ou destinataire manquant.");
      return;
    }

    const message: ChatMessage = {
      id: 0, // ou undefined
      senderId: this.currentUserId,
      recipientId: this.recipientId,
      sendername: 'Moi',
      content: this.messageContent,
      type: 'CHAT',
      timestamp: new Date().toISOString() // Compatible avec LocalDateTime côté backend si format ISO
    };

    this.chatService.sendMessage(
      message.senderId,
      message.recipientId,
      message.content
    );

    this.messageContent = '';
  }


  trackById(index: number, item: any): number {
    return item.id;
  }

  getUserNameById(id: number): string {
    if (id === this.currentUserId) {
      return 'Moi';
    }

    const friend = this.friends.find(f => f.id === id);
    return friend ? `${friend.firstName} ${friend.lastName}` : `Utilisateur #${id}`;
  }
}
