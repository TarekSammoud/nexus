import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from '../../entities/community/report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'http://localhost:9000/nexus-backend/api/reports';

  constructor(private http: HttpClient) {}

  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/all`);
  }

  getReportById(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/${id}`);
  }

  createReport(report: Report): Observable<Report> {
    return this.http.post<Report>(`${this.apiUrl}/add`, report);
  }

  updateReport(id: number, report: Report): Observable<Report> {
    return this.http.put<Report>(`${this.apiUrl}/${id}`, report);
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
