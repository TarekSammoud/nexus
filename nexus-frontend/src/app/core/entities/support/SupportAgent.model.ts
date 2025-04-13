import { Departement } from './Departement.enum';
import { PerformanceReview } from './PerformanceReview.model';
import { SupportTicket } from './SupportTicket.model';

export interface SupportAgent {
  id: number;
  userId: number;
  name: string;
  email: string;
  averageRating?: number;
  departement: Departement;
  ticketsAssignes: SupportTicket[];
  evaluations: PerformanceReview[];

}