import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from '../../core/services/support/room.service';
import { PerformanceReviewService } from '../../core/services/support/performance-review.service';
import { SupportTicket } from '../../core/entities/support/SupportTicket.model';
import { SupportService } from 'src/app/core/services/support/support-ticket.service';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

interface ChatMessage {
  id?: number;
  sender: string;
  content: string;
  timestamp?: Date;
}

@Component({
  selector: 'app-room-chat',
  templateUrl: './room-chat.component.html',
  styleUrls: ['./room-chat.component.css'],
})
export class RoomChatComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  roomId!: number;
  sending: boolean = false;
  chatClosed: boolean = false;
  ticket?: SupportTicket;
  typing: boolean = false;
  private pollingSubscription?: Subscription;
  private pollingInterval = 5000; // 5 seconds
  
  @ViewChild('messageList') messageList?: ElementRef;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private reviewService: PerformanceReviewService,
    private ticketService: SupportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('roomId');
      if (idParam !== null) {
        this.roomId = +idParam;
        this.loadMessages();
        this.loadTicket();
        this.startMessagePolling();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  loadTicket(): void {
    this.ticketService.getTicketByRoomId(this.roomId).subscribe({
      next: (data) => {
        this.ticket = data;
      },
      error: (err) => {
        console.error('Error loading ticket:', err);
      }
    });
  }

  startMessagePolling(): void {
    this.pollingSubscription = interval(this.pollingInterval)
      .pipe(takeWhile(() => !this.chatClosed))
      .subscribe(() => {
        this.loadMessages();
      });
  }

  loadMessages(): void {
    if (!this.chatClosed && this.roomId) {
      this.roomService.receiveMessages(this.roomId).subscribe({
        next: (data) => {
          if (JSON.stringify(this.messages) !== JSON.stringify(data)) {
            this.messages = data;
            this.scrollToBottom();
          }
        },
        error: (error) => {
          console.error('Error loading messages:', error);
        }
      });
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.messageList) {
        const element = this.messageList.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    }, 100);
  }

  sendMessage(): void {
    if (!this.roomId) {
      alert("Room ID is not loaded yet!");
      return;
    }

    if (this.newMessage.trim() && !this.sending && !this.chatClosed) {
      this.sending = true;
      const messageContent = this.newMessage.trim();
      
      // Optimistic UI update
      const tempMessage: ChatMessage = {
        sender: 'username',
        content: messageContent,
        timestamp: new Date()
      };
      
      this.messages.push(tempMessage);
      this.newMessage = '';
      this.scrollToBottom();
      
      this.roomService.sendMessage(this.roomId, 'username', messageContent).subscribe({
        next: () => {
          this.sending = false;
          this.loadMessages(); // Refresh to get the actual saved message
        },
        error: (error) => {
          console.error('Error sending message:', error);
          // Remove the optimistic message if it failed
          this.messages = this.messages.filter(m => m !== tempMessage);
          alert('Failed to send message. Please try again.');
          this.newMessage = messageContent; // Restore the message text
          this.sending = false;
        }
      });
    }
  }

  closeChat(): void {
    if (confirm('Are you sure you want to close this chat?')) {
      this.chatClosed = true;
      this.router.navigate(['/performance-reviews'])
      

    }
  }
}

// if (this.pollingSubscription) {
//   this.pollingSubscription.unsubscribe();
// }

// // Optional: Send a final "chat closed" message
// this.roomService.closeRoom(this.roomId).subscribe({
//   next: () => {
//     this.router.navigate(['/performance-reviews']).then(success => {
//       if (success) {
//         console.log('Redirected to Performance Reviews');
//       } else {
//         console.warn('Redirect failed');
//       }
//     }).catch(err => console.error('Navigation error:', err));
    
//   },
//   error: (err) => {
//     console.error('Error closing chat:', err);
//   }
// });