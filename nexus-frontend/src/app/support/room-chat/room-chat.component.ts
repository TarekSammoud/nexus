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
  roomId!: number; // Example room ID
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
      this.roomService.receiveMessages(this.roomId).subscribe(
        (data) => {
          this.messages = data;
        },
        (error) => {
          console.error('Error loading messages:', error);
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
          alert('Failed to send message.');
          this.sending = false;
        }
      );
    }
  }
  closeRoom(): void {
    this.roomService.closeRoom(this.roomId).subscribe(
      () => {
        this.chatClosed = true;
      },
      (error) => {
        console.error('Error closing room:', error);
        alert('Failed to close the room.');
      }
    );
  }
}
