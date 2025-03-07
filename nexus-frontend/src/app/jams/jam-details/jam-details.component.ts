import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JamService } from 'src/app/core/services/jam/jam.service';

@Component({
  selector: 'app-jam-details',
  templateUrl: './jam-details.component.html',
  styleUrls: ['./jam-details.component.css']
})
export class JamDetailsComponent implements OnInit {
  jam: any;

  constructor(private route: ActivatedRoute, private jamService: JamService) {}

  ngOnInit(): void {
    const jamId = this.route.snapshot.paramMap.get('id');
    if (jamId) {
      this.loadJamDetails(+jamId);
    }
  }

  loadJamDetails(id: number) {
    this.jamService.getJamById(id).subscribe({
      next: (data) => {
        this.jam = data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement du Game Jam :", err);
      }
    });
  }
}
