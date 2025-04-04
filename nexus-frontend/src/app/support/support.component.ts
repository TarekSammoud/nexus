import { Component, OnInit } from '@angular/core';
import { SupportTicketService } from './SupportTicketService/support-ticket.service';
  // Assure-toi que le service existe

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  tickets: any[] = [];  // Exemple de liste de tickets de support

  constructor(private supportTicketService: SupportTicketService) { }

  ngOnInit(): void {
    this.loadTickets();  // Charger les tickets au démarrage
  }

  loadTickets(): void {
    this.supportTicketService.getTickets().subscribe((data) => {
      this.tickets = data;  // Remplir les tickets avec les données récupérées
    });
  }
}
