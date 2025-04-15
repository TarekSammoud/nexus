import { Component, OnInit } from '@angular/core';
import { JamService } from 'src/app/core/services/jam/jam.service';
import { Jam } from 'src/app/core/entities/Jam/jam';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-jams-list',
  templateUrl: './admin-jams-list.component.html',
  styleUrls: ['./admin-jams-list.component.css']
})
export class AdminJamsListComponent implements OnInit {
  jams: Jam[] = [];
  page = 1;

  constructor(private jamService: JamService, private router: Router) {}

  ngOnInit(): void {
    this.loadJams();
  }

  loadJams(): void {
    this.jamService.getJams().subscribe({
      next: (data) => this.jams = data,
      error: (err) => console.error('Error loading jams:', err)
    });
  }

  viewJam(jamId: number): void {
    this.router.navigate(['/admin/jams/details', jamId]);
  }

  editJam(jamId: number): void {
    this.router.navigate(['/admin/jams/edit', jamId]);
  }

  deleteJam(jamId: number): void {
    if (!confirm("Are you sure you want to delete this jam?")) return;
    this.jamService.deleteJam(jamId).subscribe(() => {
      this.jams = this.jams.filter(j => j.id !== jamId);
    });
  }

  getStatus(jam: Jam): 'upcoming' | 'active' | 'completed' {
    const now = Date.now();
    const devStart = new Date(jam.devStartDate).getTime();
    const voteEnd = new Date(jam.voteEndDate).getTime();

    if (now < devStart) return 'upcoming';
    if (now > voteEnd) return 'completed';
    return 'active';
  }

  
}

