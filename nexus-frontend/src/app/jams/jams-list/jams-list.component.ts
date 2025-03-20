import { Component, OnInit } from '@angular/core';
import { JamService } from 'src/app/core/services/jam/jam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jams-list',
  templateUrl: './jams-list.component.html',
  styleUrls: ['./jams-list.component.css']
})
export class JamsListComponent implements OnInit {
  jams: any[] = [];
  selectedJam: any = null;
  editMode: boolean = false;
  showForm: boolean = false;

  constructor(private jamService: JamService, private router: Router) {}

  ngOnInit(): void {
    this.loadJams();
  }

  loadJams() {
    this.jamService.getJams().subscribe({
      next: (data) => {
        this.jams = data;
      },
      error: (err) => {
        console.error("Error loading game jams:", err);
      }
    });
  }

  viewDetails(jam: any) {
    this.selectedJam = jam;
    this.editMode = false; 
    console.log("Viewing details for:", jam);
  }
  

  editJam(jam: any) {
    this.selectedJam = { ...jam };
    this.editMode = true; 
    console.log("Editing game jam:", jam);
  }
  

  closeDetails() {
    this.selectedJam = null;
    this.editMode = false;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onJamCreated(newJam: any) {
    this.jams.push(newJam);
    this.showForm = false;
  }

  deleteJam(jamId: number) {
    if (confirm("Are you sure you want to delete this Game Jam?")) {
      this.jamService.deleteJam(jamId).subscribe(() => {
        this.jams = this.jams.filter(j => j.id !== jamId);
      });
    }
  }

  updateJam() {
    this.jamService.updateJam(this.selectedJam.id, this.selectedJam).subscribe(() => {
      const index = this.jams.findIndex(j => j.id === this.selectedJam.id);
      if (index !== -1) {
        this.jams[index] = this.selectedJam;
      }
      this.closeDetails();
    });
  }

  page: number = 1;  

  getCountdown(startDate: string): string {
    const now = new Date();
    const start = new Date(startDate);
    const diff = start.getTime() - now.getTime();
  
    if (diff <= 0) return "🚀 Already Started!";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days left`;
  }
  
}
