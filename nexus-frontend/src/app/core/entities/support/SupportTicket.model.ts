import { Room } from './Room.model';
import { SupportAgent } from './SupportAgent.model';
import { TicketCategory } from './TicketCategory.enum';
import { TicketPriority } from './TicketPriority.enum';
import { TicketStatus } from './TicketStatus.enum'; // Adjust the path as needed

export interface SupportTicket {
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    category: TicketCategory;
    assigneA?: SupportAgent;
    room?: Room;
    
  }