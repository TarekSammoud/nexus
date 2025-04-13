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
  messages: ChatMessage[] = [];
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

        this.chatService.messages$.subscribe(msg => {
          if (msg) {
            this.messages.push(msg);
            console.log('Message ajouté à l’interface:', msg);

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

  loadMessages(): void {
    if (this.currentUserId && this.recipientId) {
      this.chatService.getMessages(this.currentUserId).subscribe(
        (messages) => {
          this.messages = messages.filter(msg =>
            (msg.senderId === this.currentUserId && msg.recipientId === this.recipientId) ||
            (msg.senderId === this.recipientId && msg.recipientId === this.currentUserId)
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération des messages', error);
        }
      );
    }
  }

  sendMessage(): void {
    if (!this.messageContent.trim() || !this.currentUserId) return;

    const message = {
      senderId: this.currentUserId,
      sendername: 'Moi', // Optionnel si backend la récupère
      content: this.messageContent,
      type: 'CHAT'
    };

    this.chatService.sendMessage(message.senderId, message.content);

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