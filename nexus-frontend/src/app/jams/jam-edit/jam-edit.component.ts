import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JamService } from 'src/app/core/services/jam/jam.service';

@Component({
  selector: 'app-jam-edit',
  templateUrl: './jam-edit.component.html',
  styleUrls: ['./jam-edit.component.css']
})
export class JamEditComponent {
  @Input() jam: any; 
  @Output() jamUpdated = new EventEmitter<any>(); 

  constructor(private jamService: JamService) {}

  updateJam() {
    this.jamService.updateJam(this.jam.id, this.jam).subscribe({
      next: (updatedJam) => {
        console.log("Game Jam updated:", updatedJam);
        this.jamUpdated.emit(updatedJam); 
      },
      error: (err) => {
        console.error("Error updating Game Jam:", err);
      }
    });
  }

  cancelEdit() {
    this.jamUpdated.emit(null); 
  }
}
