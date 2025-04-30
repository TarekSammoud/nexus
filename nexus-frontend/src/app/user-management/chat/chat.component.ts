import { Component, OnInit, OnDestroy } from '@angular/core';
import { FriendRequestService } from '../../core/services/user-management/friend-request.service';
import { ChatService } from '../../core/services/user-management/Chat.Service';
import { ChatMessage } from '../../core/entities/user/ChatMessage';
import { TokenService } from '../../core/services/user-management/token.service';
import { UserProfileService } from '../../core/services/user-management/userprofile.service';

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
  senders = new Map<number, any>(); // 💡 Pour stocker les utilisateurs envoyeurs
  private messageInterval: any;

  constructor(
    private friendRequestService: FriendRequestService,
    private chatService: ChatService,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit(): void {
    this.currentUserId = TokenService.getUserId();

    if (this.currentUserId !== null) {
      this.chatService.connect(this.currentUserId);

      this.friendRequestService.getFriends(this.currentUserId).subscribe({
        next: (data) => {
          this.friends = data;
        },
        error: (err) => {
          console.error('Error loading friends:', err);
        }
      });

      this.chatService.messages$.subscribe(msg => {
        if (msg) {
          this.messages.push(msg);
          if (!this.senders.has(msg.senderId)) {
            this.userProfileService.getUserById(msg.senderId).subscribe(user => {
              this.senders.set(msg.senderId, user);
            });
          }
        }
      });
    }
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
          console.error('Error loading messages', error);
        }
      );
    }
  }

  sendMessage(): void {
    if (!this.messageContent.trim() || !this.currentUserId) return;

    const message = {
      senderId: this.currentUserId,
      sendername: 'Me',
      content: this.messageContent,
      type: 'CHAT'
    };

    this.chatService.sendMessage(message.senderId, message.content);
    this.messageContent = '';
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  getUserNameById(id: number): string {
    if (id === this.currentUserId) return 'Me';

    const user = this.senders.get(id);
    return user ? `${user.firstName} ${user.lastName}` : '...';
  }
}
