import { SupportAgent } from "./SupportAgent.model";


export interface PerformanceReview {
  id?: number;
  supportAgentId: number;
  agent: SupportAgent;
  rating: number;
  feedback: string;
  departement: string; 
}