import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatRoomService, ChatMessage } from 'src/app/core/services/support/chat-room.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/user-management/auth.service';
import { User } from 'src/app/core/entities/user/user.model';
import { RoleType } from 'src/app/core/entities/user/enums';
import { TokenService } from 'src/app/core/services/user-management/token.service';
import { JwtPayload } from 'src/app/core/services/user-management/token.service';
import { WebsocketSupportService } from 'src/app/core/services/support/websocket/websocket-support.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './room-chat.component.html',
  styleUrls: ['./room-chat.component.css']
})
export class RoomChatComponent implements OnInit, OnDestroy {

  token: string = 'your-jwt-token';  // Replace with actual JWT token logic
  roomId: number = 0;
     constructor(
    private chatRoomService: ChatRoomService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private websocketService: WebsocketSupportService
  ) {}


  ngOnDestroy(): void {
   
    
  }


  ngOnInit(): void {
    this.token = localStorage.getItem('auth_token') || '';
    this.roomId = +this.route.snapshot.paramMap.get('roomId')!; // Retrieve the token from local storage or set a default value
    console.log('Token:', this.token);
    console.log('Room ID:', this.roomId);
    
    // Connect to the WebSocket server and listen for notifications
    this.websocketService.connect(this.token, this.roomId,(notification: any) => {

      this.messages.push({ message: notification.message, type: 'input' });

     // Handle the incoming notification
     console.log('Received notification:', notification);
   })
  } 

  messages: { message: string, type: 'input' | 'output' }[] = []; /// stock the mesages
  newMessage: string = ''; //message to be sent fom the input

// hedhum bch tintilisihum bel room (user id w el supprt id fl backend )
  userId: number = 4;
  supportAgentId: number = 3;


  tokenToId : string = '';
  userIdFromToken: number = 0;
  sendMessage() {
    this.tokenToId = localStorage.getItem('auth_token') || '';
    console.log('Token:', this.tokenToId);
  
    this.websocketService.getUserIdFromToken(this.tokenToId).subscribe({
      next: (userId: number) => {
        this.userIdFromToken = userId;
        console.log('User ID from token:', this.userIdFromToken);
  
         if(this.userIdFromToken == this.userId){
          const message = { userId: this.supportAgentId, message: this.newMessage,roomId: "19"  };///badl room id 
          this.messages.push({ message: this.newMessage, type: 'output' });
          this.websocketService.sendMessage('/app/send-message', message);
          this.newMessage = '';
          console.log('message:', this.messages);
         }else{
          const message = { userId: this.userId, message: this.newMessage,roomId: "19" }; ///badl room id 
          this.messages.push({ message: this.newMessage, type: 'output' });
          this.websocketService.sendMessage('/app/send-message', message);
          this.newMessage = '';
          console.log('message:', this.messages);
         }       

      },
      error: (err) => {
        console.error('Error retrieving user ID from token:', err);
      }
    });

  }
  
  closeRoom(): void {
    // Navigate to the performance review page
    this.router.navigate(['/performance-reviews']);
  }
  
    

  /*ngOnInit(): void {
    // Convert roomId from string to number
    this.roomId = +this.route.snapshot.paramMap.get('roomId')!;
    const rawToken = localStorage.getItem('auth_token');

    if (rawToken) {
      // Decode the token using TokenService
      this.token = TokenService.getDecodedToken();
    } else {
      console.error('Token not found in localStorage');
      return;
    }

    // Subscribe to get user data
    this.authService.getLoggedInUserProfile().subscribe(user => {
      if (user && user.id !== null) {
        this.userId = user.id;
        this.userName = `${user.firstName} ${user.lastName}`;
        this.isSupportAgent = user.roleType === RoleType.SUPPORTAGENT;
      } else {
        console.error('User information could not be retrieved');
        return;
      }
      
      // Connect to WebSocket after user data is available
     if (rawToken) {
        this.chatRoomService.connect(this.roomId.toString(), this.userId, rawToken); // Use rawToken (string)
      }
    });

    // Subscribe to incoming WebSocket messages
    this.sub = this.chatRoomService.messages$.subscribe((msg) => {
      if (msg) {
        this.messages.push(msg);
      }
    });

    // Fetch chat history for this room (roomId passed as string)
    this.chatRoomService.getMessages(this.roomId.toString()).subscribe((history) => {
      this.messages = history;
    });

    // Fetch room users
    this.chatRoomService.getRoomUsers(this.roomId.toString()).subscribe((users) => {
      this.roomUsers = users;
    })
  }*/

 /* sendMessage() {
    if (!this.newMessage.trim()) {
      console.warn("Cannot send empty message");
      return;
    }
  
    let recipientId: number | undefined = undefined;
  
    if (this.isSupportAgent) {
      // Support Agent — broadcast to everyone in the room
      recipientId = undefined;
    } else {
      // User sending — find a support agent in the room
      const supportAgent = this.roomUsers.find(user => user.roleType === RoleType.SUPPORTAGENT);
      if (supportAgent) {
        recipientId = supportAgent.id !== null ? supportAgent.id : undefined;  // Ensure recipientId is not null
      } else {
        console.warn("No support agent available in the room");
        return;
      }
    }
  
    const message: ChatMessage = {
      senderId: this.userId,
      sendername: this.userName,
      recipientId: recipientId,
      content: this.newMessage.trim(),
      type: 'CHAT',
      room: { roomId: this.roomId }
    };
  
    console.log("Sending message to room:", this.roomId);
    console.log("Message content:", message);
  
    if (this.token) {
      const rawToken = localStorage.getItem('auth_token'); // Fetch the raw token again
      if (rawToken) {
        // Send the message with raw token (string)
        this.chatRoomService.sendMessage(this.roomId.toString(), message, rawToken);
      } else {
        console.error("No raw token found, unable to send message");
      }
    } else {
      console.error("No token found, unable to send message");
    }
  
    // Clear the input field
    this.newMessage = '';
  }*/
  

 /* ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.chatRoomService.disconnect();
  }*/
}
