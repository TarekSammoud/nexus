import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/services/support/room.service';

@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.css']
})
export class AdminRoomComponent {
  rooms: any[] = [];
  errorMessage: string = '';

ticket:any;
room: any;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.getAllRooms();
  }

  // Get all rooms
  getAllRooms(): void {
    this.roomService.getAllRooms().subscribe(
      (data) => {
        this.rooms = data;
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
  deleteRoom(roomId: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette room ?')) {
      this.roomService.deleteRoom(roomId).subscribe(
        (response) => {
          alert(response);
          this.getAllRooms();
        },
        (error: string) => {
          alert('Erreur: ' + error);
        }
      );
    }
  }  
}

