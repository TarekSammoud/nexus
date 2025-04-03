import { Component, EventEmitter, Output } from '@angular/core';
import { JamService } from 'src/app/core/services/jam/jam.service';

@Component({
  selector: 'app-jam-form',
  templateUrl: './jam-form.component.html',
  styleUrls: ['./jam-form.component.css']
})
export class JamFormComponent {
  @Output() jamCreated = new EventEmitter<any>();

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

  createJam(): void {
    this.jamService.addJam(this.jam).subscribe({
      next: (createdJam) => {
        this.jamCreated.emit(createdJam);
        this.resetForm();
      },
      error: (err) => {
      }
    });
  }

  private resetForm(): void {
    this.jam = {
      imageUrl: '',
      name: '',
      description: '',
      devStartDate: '',
      devEndDate: '',
      voteStartDate: '',
      voteEndDate: '',
      reward: ''
    };
  }
}
