import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/services/support/room.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  rooms: any[] = [];
  errorMessage: string = '';

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
}
