import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/core/services/support/support-ticket.service'; // Fix the import path
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportTicket } from 'src/app/core/entities/support/SupportTicket.model';

@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.css']
})
export class SupportTicketComponent implements OnInit {
  tickets: SupportTicket[] = [];
  ticketForm: FormGroup;
  isEditMode: boolean = false;  // Indicator for editing a ticket
  successMessage: string = '';
  currentTicketId: number | null = null;

  constructor(
    private supportService: SupportService,
    private fb: FormBuilder
  ) {
    // Initialize the form
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
       // Default status
    });
  } // <-- Add this closing brace here

  private finalizeAction(message: string): void {
    this.successMessage = message;
    this.resetForm();
    this.loadTickets();
  }

  public resetForm(): void {
    this.ticketForm.reset();
    this.isEditMode = false;
    this.currentTicketId = null;
  }

  ngOnInit(): void {
    // Load tickets from the service
    this.loadTickets();
  }

  // Accessors
  get title() { 
    return this.ticketForm.get('title'); 
  }

  get description() { 
    return this.ticketForm.get('description'); 
  }

  get category() { 
    return this.ticketForm.get('category'); 
  }

  // Load tickets via the service
  loadTickets(): void {
    this.supportService.getAllTickets().subscribe(
      (data: SupportTicket[]) => this.tickets = data,
      (error: any) => console.error('Error loading tickets:', error)
    );
  }

  // Methods for creating, deleting, and updating tickets
  onSubmit(): void {
    if (this.ticketForm.valid) {
      if (this.isEditMode) {
        this.updateTicket(this.ticketForm.value);
      } else {
        this.createTicket(this.ticketForm.value);
      }
    }
  }

  // Create a ticket
  createTicket(ticket: any): void {
    this.supportService.createTicket(ticket).subscribe(
      (createdTicket: SupportTicket) => {
        this.tickets.push(createdTicket);
        this.finalizeAction('🎉 Ticket created successfully!');
      },
      (error: any) => console.error('Creation error', error)
    );
  }

  // Update a ticket
  updateTicket(ticket: any): void {
    if (this.currentTicketId != null) {
      ticket.id = this.currentTicketId;
      this.supportService.updateTicket(ticket).subscribe(
        () => this.finalizeAction('🎉 Ticket updated successfully!'),
        (error: any) => console.error('Update error', error)
      );
    }
  }

  // Delete a ticket
  onDelete(ticket: any): void {
    if (ticket && ticket.id !== undefined) {
      this.supportService.deleteTicket(ticket.id).subscribe(
        () => {
          console.log('Ticket deleted');
          this.tickets = this.tickets.filter(t => t.id !== ticket.id);
        },
        (error: any) => console.error('Deletion error', error)
      );
    }
  }

  // Modify a ticket (switch to edit mode)
  onModify(ticket: any): void {
    this.ticketForm.setValue({
      title: ticket.title,
      description: ticket.description,
      category: ticket.category
    });
    this.isEditMode = true;
    this.currentTicketId = ticket.id;
  }
  
}
