import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.css']
})
export class SupportTicketComponent implements OnInit {
  tickets: any[] = [];  // Liste des tickets
  ticketForm: FormGroup;
  isEditMode: boolean = false;  // Indicateur pour modifier un ticket
  successMessage: string = '';

  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Charger les tickets si nécessaire
    this.loadTickets();
  }

  // Accesseurs
  get title() { 
    return this.ticketForm.get('title'); 
  }

  get description() { 
    return this.ticketForm.get('description'); 
  }

  get category() { 
    return this.ticketForm.get('category'); 
  }

  // Charger les tickets
  loadTickets(): void {
    // Exemple de tickets pour le démonstration
    this.tickets = [
      { title: 'Ticket 1', description: 'Description du ticket 1', category: 'TECHNICAL' },
      { title: 'Ticket 2', description: 'Description du ticket 2', category: 'PURCHASE' }
    ];
  }

  // Méthodes pour les actions de création, suppression et modification
  onSubmit(): void {
    if (this.ticketForm.valid) {
      if (this.isEditMode) {
        this.updateTicket(this.ticketForm.value);
      } else {
        this.createTicket(this.ticketForm.value);
      }
    }
  }

  // Créer un ticket
  createTicket(ticket: any): void {
    console.log('Ticket créé:', ticket);
    this.tickets.push(ticket);  // Ajout du ticket dans la liste (simulé)
    this.ticketForm.reset();
    this.successMessage = '🎉 Ticket créé avec succès!';
  }

  // Mettre à jour un ticket
  updateTicket(ticket: any): void {
    console.log('Ticket modifié:', ticket);
    // Mettre à jour le ticket dans la liste (simulé)
    this.successMessage = '🎉 Ticket mis à jour avec succès!';
  }

  // Supprimer un ticket
  onDelete(ticket: any): void {
    const index = this.tickets.indexOf(ticket);
    if (index > -1) {
      this.tickets.splice(index, 1);  // Supprimer le ticket
      console.log('Ticket supprimé');
    }
  }

  // Modifier un ticket (passer en mode édition)
  onModify(ticket: any): void {
    this.ticketForm.setValue({
      title: ticket.title,
      description: ticket.description,
      category: ticket.category
    });
    this.isEditMode = true;  // Passer en mode édition
  }

}
