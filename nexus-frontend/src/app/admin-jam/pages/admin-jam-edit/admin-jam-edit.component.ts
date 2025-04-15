import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JamService } from 'src/app/core/services/jam/jam.service';
import { Jam } from 'src/app/core/entities/Jam/jam';

@Component({
  selector: 'app-admin-jam-edit',
  templateUrl: './admin-jam-edit.component.html',
  styleUrls: ['./admin-jam-edit.component.css']
})
export class AdminJamEditComponent implements OnInit {
  jam!: Jam;

  constructor(
    private route: ActivatedRoute,
    private jamService: JamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.jamService.getJamById(id).subscribe(jam => this.jam = jam);
  }

  saveJam(): void {
    this.jamService.updateJam(this.jam.id, this.jam).subscribe(() => {
      this.router.navigate(['/admin/jams/list']);
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/jams/list']);
  }
}
