import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from '../../core/services/support/room.service';
import { PerformanceReviewService } from '../../core/services/support/performance-review.service';

@Component({
  selector: 'app-room-chat',
  templateUrl: './room-chat.component.html',
  styleUrls: ['./room-chat.component.css'],
})
export class RoomChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  roomId!: number;
  sending: boolean = false;
  chatClosed: boolean = false;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private reviewService: PerformanceReviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('roomId');
      if (idParam !== null) {
        this.roomId = +idParam;
        this.loadMessages();
      }
    });
  }

  loadMessages(): void {
    if (!this.chatClosed && this.roomId) {
      this.roomService.receiveMessages(this.roomId).subscribe(
        (data) => {
          this.messages = data;
        },
        (error) => {
          console.error('Error loading messages:', error);
          alert('Failed to load messages.');
        }
      );
    }
  }

  sendMessage(): void {
    if (!this.roomId) {
      alert("Room ID is not loaded yet!");
      return;
    }

    if (this.newMessage.trim() && !this.sending && !this.chatClosed) {
      this.sending = true;
      this.roomService.sendMessage(this.roomId, 'username', this.newMessage.trim()).subscribe(
        () => {
          this.messages.push({ sender: 'username', content: this.newMessage.trim() });
          this.newMessage = '';
          this.sending = false;
          this.loadMessages();
        },
        (error) => {
          console.error('Error sending message:', error);
          alert('Failed to send message. Please try again.');
          this.sending = false;
        }
      );
    }
  }

  closeChat(): void {
    if (this.router && this.reviewService.showPerformanceReview) {
      this.chatClosed = true;
      this.router.navigate(['/performance-reviews']).then(success => {
        if (success) {
          console.log('Navigation successful');
        } else {
          console.error('Navigation failed');
        }
      }).catch(err => console.error('Navigation error:', err));
      this.reviewService.showPerformanceReview();
    } else {
      console.error('Navigation or PerformanceReviewService not setup correctly');
    }
  }
}
