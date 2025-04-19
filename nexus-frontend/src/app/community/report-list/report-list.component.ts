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
  selectedReportIdToDelete: number | null = null;


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
    this.selectedReportIdToDelete = id;
  
    // Ouvre la modal de confirmation Bootstrap
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete(): void {
    if (this.selectedReportIdToDelete !== null) {
      this.reportService.deleteReport(this.selectedReportIdToDelete).subscribe({
        next: () => {
          // Mise à jour visuelle immédiate
          this.reports = this.reports.filter(r => r.id !== this.selectedReportIdToDelete);
  
          // ✅ Fermer la modal APRÈS mise à jour
          const modalEl = document.getElementById('deleteModal');
          if (modalEl) {
            const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
            modalInstance.hide();
          }
  
         this.toastr.success('🗑️ Signalement supprimé.');
          this.selectedReportIdToDelete = null;
        },
        error: () => this.toastr.error('Erreur lors de la suppression.')
      });
    }
  }
  
}
