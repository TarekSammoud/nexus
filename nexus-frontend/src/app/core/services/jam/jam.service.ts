import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JamService {
  private apiUrl = '/api/nexus-backend/api/gamejams'; 


  constructor(private http: HttpClient) {}

  getJams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getJamById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  addJam(jam: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, jam);
  }

  deleteJam(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
  
  updateJam(id: number, jam: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, jam);
  }

  uploadImage(formData: FormData): Observable<string> {
    return this.http.post(`${this.apiUrl}/upload`, formData, { responseType: 'text' });
  }
  
}
