import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportTicket } from 'src/app/core/entities/support/SupportTicket.model';
import { SupportService } from 'src/app/core/services/support/support-ticket.service';

@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.css']
})
export class SupportTicketComponent implements OnInit {
  tickets: SupportTicket[] = [];
  ticketForm: FormGroup;
  successMessage: string = ''; // Pour le message de remerciement

  constructor(
    private fb: FormBuilder,
    private supportService: SupportService
  ) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['TECHNICAL', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.supportService.getAllTickets().subscribe(
      (data) => {
        this.tickets = data;
      },
      (error) => {
        console.error('Error fetching tickets', error);
      }
    );
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const newTicket: SupportTicket = {
        ...this.ticketForm.value,
        status: 'OPEN',       // Défini un statut par défaut
        priority: 'LOW',      // Défini une priorité par défaut
      };
  
      console.log('Ticket data to send:', newTicket); // Log les données avant d'envoyer la requête
  
      this.supportService.createTicket(newTicket).subscribe(
        (ticket) => {
          this.tickets.push(ticket);
          this.ticketForm.reset();
          this.successMessage = '🎉 Merci pour votre ticket ! Un agent de support a bien reçu votre demande. Veuillez vérifier votre email pour les prochaines étapes.';
        },
        (error) => {
          console.error('Error creating ticket', error);
        }
      );
    }
  }
  
  
  }
  
    


