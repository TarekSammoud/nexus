import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/services/support/room.service';
import { UserService } from 'src/app/core/services/user-management/signup.service';

@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.css']
})
export class AdminRoomComponent implements OnInit {
  rooms: any[] = [];
  errorMessage: string = '';

  constructor(private roomService: RoomService, private userService: UserService) {}

  ngOnInit(): void {
    this.getAllRooms();
  }

  // Get all rooms and fetch user details for each room
  getAllRooms(): void {
    this.roomService.getAllRooms().subscribe(
      (data) => {
        this.rooms = data;
        this.rooms.forEach(room => {
          if (room.user) {
            // Assuming `room.user` is now an object with firstName and lastName
            room.userFirstname = room.user.firstName;  // Add Firstname to the room object
          }
        });
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  // Create a room for a ticket
  createRoom(ticketId: number): void {
    this.roomService.createRoom(ticketId).subscribe(
      (response) => {
        alert(response);
        this.getAllRooms(); // Refresh the list of rooms
      },
      (error) => {
        alert('Error: ' + error);
      }
    );
  }

  // Close a room for a ticket
  closeRoom(ticketId: number): void {
    this.roomService.closeRoom(ticketId).subscribe(
      (response: any) => {
        alert(response);
        this.getAllRooms();  // Refresh the list of rooms
      },
      (error: string) => {
        alert('Error: ' + error);
      }
    );
  }

  // Delete a room
  deleteRoom(roomId: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette room ?')) {
      this.roomService.deleteRoom(roomId).subscribe(
        (response) => {
          alert(response);
          this.getAllRooms();  // Refresh the list of rooms
        },
        (error: string) => {
          alert('Erreur: ' + error);
        }
      );
    }
  }
}
