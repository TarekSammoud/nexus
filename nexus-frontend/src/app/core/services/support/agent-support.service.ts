import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportAgent } from '../../entities/support/SupportAgent.model';

@Injectable({
  providedIn: 'root'
})
export class SupportAgentService {
  private baseUrl = 'http://localhost:9000/nexus-backend/agents';

  constructor(private http: HttpClient) {}

  // Get all agents
  getAllAgents(): Observable<SupportAgent[]> {
    return this.http.get<SupportAgent[]>(`${this.baseUrl}/getAll`);
  }

  // Get agent by ID
  getAgentById(id: number): Observable<SupportAgent> {
    return this.http.get<SupportAgent>(`${this.baseUrl}/${id}`);
  }

  // Create a new agent
  createAgent(agent: SupportAgent): Observable<SupportAgent> {
    return this.http.post<SupportAgent>(`${this.baseUrl}/createagent`, agent);
  }

  // Update an existing agent
  updateAgent(agent: SupportAgent): Observable<SupportAgent> {
    return this.http.put<SupportAgent>(`${this.baseUrl}/${agent.id}`, agent);
  }

  // Delete an agent by ID
  deleteAgent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Get agents by department
  getAgentsByDepartment(department: string): Observable<SupportAgent[]> {
    return this.http.get<SupportAgent[]>(`${this.baseUrl}/department/${department}`);
  }
}
