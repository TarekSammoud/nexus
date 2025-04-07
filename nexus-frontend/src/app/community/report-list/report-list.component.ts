import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/core/services/community/report.service';
import { Report } from 'src/app/core/entities/community/report';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  reports: Report[] = [];

  constructor(
    private reportService: ReportService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.getAllReports().subscribe({
      next: (data) => this.reports = data,
      error: () => this.toastr.error('Erreur lors du chargement des signalements')
    });
  }

  markAsResolved(report: Report): void {
    const updated = { ...report, status: 'RESOLVED' };
    this.reportService.updateReport(report.id!, updated).subscribe({
      next: () => {
        report.status = 'RESOLVED';
        this.toastr.success('✅ Signalement marqué comme traité.');
      },
      error: () => this.toastr.error('❌ Erreur lors de la mise à jour.')
    });
  }

  deleteReport(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce signalement ?')) {
      this.reportService.deleteReport(id).subscribe({
        next: () => {
          this.reports = this.reports.filter(r => r.id !== id);
          this.toastr.success('🗑️ Signalement supprimé.');
        },
        error: () => this.toastr.error('Erreur lors de la suppression.')
      });
    }
  }
}
