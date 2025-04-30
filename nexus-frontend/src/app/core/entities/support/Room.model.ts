import { SupportTicket } from "./SupportTicket.model";


export interface Room {
  id: number;
  ticket: SupportTicket;
  lien: string;
  dateCreation: Date;
  dernierMessage: Date;
  active: boolean;
  user: { firstname: string}; 
}