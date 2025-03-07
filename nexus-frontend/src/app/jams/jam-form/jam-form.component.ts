import { Component, EventEmitter, Output } from '@angular/core';
import { JamService } from 'src/app/core/services/jam/jam.service';

@Component({
  selector: 'app-jam-form',
  templateUrl: './jam-form.component.html',
  styleUrls: ['./jam-form.component.css']
})
export class JamFormComponent {
  @Output() jamCreated = new EventEmitter<any>(); // Émettre un événement quand un Jam est créé

  jam = {
    imageUrl: '',
    name: '',
    description: '',
    devStartDate: '',
    devEndDate: '',
    voteStartDate: '',
    voteEndDate: '',
    reward: ''
  };

  constructor(private jamService: JamService) {}

  createJam() {
    this.jamService.addJam(this.jam).subscribe({
      next: (newJam) => {
        console.log("Game Jam created:", newJam);
        this.jamCreated.emit(newJam); // Envoyer le Jam créé au composant parent
      },
      error: (err) => {
        console.error("Error creating Game Jam:", err);
      }
    });
  }
}
