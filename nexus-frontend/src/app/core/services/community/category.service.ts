import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:9000/nexus-backend/api/categories';  // 🔹 Endpoint du backend

  constructor(private http: HttpClient) {}

  // Récupérer toutes les catégories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);  // 🔹 Récupération des catégories
  }
}
