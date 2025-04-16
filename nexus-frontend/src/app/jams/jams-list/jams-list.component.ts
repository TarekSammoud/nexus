import { Component, OnInit } from '@angular/core';
import { JamService } from 'src/app/core/services/jam/jam.service';
import { Router } from '@angular/router';
import { Jam } from 'src/app/core/entities/Jam/jam';

@Component({
  selector: 'app-jams-list',
  templateUrl: './jams-list.component.html',
  styleUrls: ['./jams-list.component.css']
})
export class JamsListComponent implements OnInit {
  jams: Jam[] = [];
  selectedJam: Jam | null = null;
  editMode = false;
  showForm = false;
  page = 1;

   constructor(private jamService: JamService, private router: Router) {}
  ngOnInit(): void {
    this.loadJams();
  }

  loadJams(): void {
    this.jamService.getJams().subscribe({
      next: (data) => this.jams = data,
    });
  }

  viewDetails(jam: Jam): void {
    this.selectedJam = jam;
    this.editMode = false;
  }

  editJam(jam: Jam): void {
    this.selectedJam = { ...jam };
    this.editMode = true;
  }

  closeDetails(): void {
    this.selectedJam = null;
    this.editMode = false;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onJamCreated(newJam: Jam): void {
    this.jams.push(newJam);
    this.showForm = false;
  }

  deleteJam(jamId: number): void {
    if (!confirm("Are you sure you want to delete this Game Jam?")) return;

    this.jamService.deleteJam(jamId).subscribe(() => {
      this.jams = this.jams.filter(j => j.id !== jamId);
    });
  }

  updateJam(): void {
    if (!this.selectedJam) return;

    this.jamService.updateJam(this.selectedJam.id, this.selectedJam).subscribe(() => {
      const index = this.jams.findIndex(j => j.id === this.selectedJam!.id);
      if (index !== -1) this.jams[index] = this.selectedJam!;
      this.closeDetails();
    });
  }
  
  goToVipJams(): void {
    this.router.navigate(['/vip-jams']);
  }


}
