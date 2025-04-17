import { Component, EventEmitter, Output } from '@angular/core';
import { JamService } from 'src/app/core/services/jam/jam.service';
import { TokenService } from 'src/app/core/services/user-management/token.service';

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
    const formattedJam = {
      ...this.jam,
      devStartDate: this.formatDate(this.jam.devStartDate),
      devEndDate: this.formatDate(this.jam.devEndDate),
      voteStartDate: this.formatDate(this.jam.voteStartDate),
      voteEndDate: this.formatDate(this.jam.voteEndDate),
    };
  
    this.jamService.addJam(formattedJam).subscribe({
      next: (createdJam) => {
        this.jamCreated.emit(createdJam);
        this.resetForm();
      }
    });
  }
  
  private formatDate(date: any): string {
    if (!(date instanceof Date)) return date;
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
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
