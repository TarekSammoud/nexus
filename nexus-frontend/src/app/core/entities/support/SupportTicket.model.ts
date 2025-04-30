import { User } from '../user/user.model';
import { Room } from './Room.model';
import { SupportAgent } from './SupportAgent.model';
import { TicketCategory } from './TicketCategory.enum';
import { TicketPriority } from './TicketPriority.enum';
import { TicketStatus } from './TicketStatus.enum'; // Adjust the path as needed

export interface SupportTicket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus; // Enum pour le statut du ticket
  priority: TicketPriority; // Enum pour la priorité du ticket
  category: TicketCategory; // Enum pour la catégorie du ticket
  assigneA: SupportAgent; // L'agent assigné
  room?: Room; // La salle associée
  user: User; // L'utilisateur associé au ticket
  createdAt: string;
    
  }