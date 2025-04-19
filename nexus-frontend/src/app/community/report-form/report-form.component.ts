import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/core/services/community/report.service';
import { CommunityService } from '../../core/services/community/community.service';
import { ToastrService } from 'ngx-toastr';
import { Report } from 'src/app/core/entities/community/report';
import { Publication } from 'src/app/core/entities/community/publication';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  publicationId!: number;
  publication!: Publication;
  reason: string = '';
  userId: number = 1; // à remplacer par l'utilisateur connecté

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private reportService: ReportService,
    private communityService: CommunityService,
   private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.publicationId = +this.route.snapshot.paramMap.get('publicationId')!;
    this.loadPublication();
  }

  loadPublication(): void {
    this.communityService.getPublicationById(this.publicationId).subscribe({
      next: (data) => this.publication = data,
      error: () => this.toastr.error('Impossible de charger la publication.')
    });
  }

  submitReport(): void {
    if (!this.reason.trim()) {
      this.toastr.warning('Veuillez entrer une raison.');
      return;
    }
  
    const report: Report = {
      reason: this.reason,
      status: 'PENDING',
      publication: { id: this.publicationId } as Publication, // ✅ uniquement l'id
      user: { id: this.userId } as any // à remplacer plus tard par l'utilisateur connecté
    };
  
    this.reportService.createReport(report).subscribe({
      next: () => {
        this.toastr.success('🚩 Signalement envoyé avec succès !');
        this.router.navigate(['/community']);
      },
      error: () => this.toastr.error("Erreur lors de l’envoi du signalement.")
    });
  }
  
}
