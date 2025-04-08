import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { RoomService } from '../../core/services/support/room.service';

@Component({
  selector: 'app-room-chat',
  templateUrl: './room-chat.component.html',
  styleUrls: ['./room-chat.component.css'],
})
export class RoomChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  roomId: number = 0;// Example room ID
  sending: boolean = false;
  chatClosed: boolean = false;

  constructor(private roomService: RoomService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Extract roomId from the URL parameters

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('roomId');
      if (idParam !== null) {
        this.roomId = +idParam; // Convert to number
        this.loadMessages();   // Load messages for the room
      }
    });
  }

  loadMessages(): void {
    if (!this.chatClosed && this.roomId) {
      this.roomService.receiveMessages(this.roomId).subscribe((data) => {
        this.messages = data;
      });
    }
  }

  sendMessage(): void {
    if (this.newMessage && !this.sending && !this.chatClosed) {
      this.sending = true;
      this.roomService.sendMessage(this.roomId, 'username', this.newMessage).subscribe(() => {
        this.messages.push({ sender: 'username', content: this.newMessage }); // Add sent message to history
        this.newMessage = '';
        this.sending = false;
        this.loadMessages(); // Refresh messages after sending
      });
    }
  }
  closeRoom(): void {
    this.roomService.closeRoom(this.roomId).subscribe(() => {
      this.chatClosed = true;
    });
  }
}
