import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/core/services/support/support-ticket.service'; // Fix the import path
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportTicket } from 'src/app/core/entities/support/SupportTicket.model'; 
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-support-list',
  templateUrl: './admin-support-list.component.html',
  styleUrls: ['./admin-support-list.component.css']
})
export class AdminSupportListComponent implements OnInit {


  tickets: SupportTicket[] = [];
  ticketForm: FormGroup;
  isEditMode: boolean = false;  // Indicator for editing a ticket
  successMessage: string = '';
  currentTicketId: number | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';
priority: any;
  
  constructor(
    private supportService: SupportService,
    private fb: FormBuilder
  ) {
    // Initialize the form
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      category: ['', Validators.required]
      // Added status field
    });
  }

  private finalizeAction(message: string): void {
    this.successMessage = message;
    this.resetForm();
    this.loadTickets();
    
    // Auto-dismiss success message after 5 seconds
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }

  public resetForm(): void {
    this.ticketForm.reset();
    this.isEditMode = false;
    this.currentTicketId = null;
    this.errorMessage = '';
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
    this.isLoading = true;
    this.errorMessage = '';
    
    this.supportService.getAllTickets()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (data: SupportTicket[]) => this.tickets = data,
        (error: any) => {
          console.error('Error loading tickets:', error);
          this.errorMessage = 'Failed to load tickets. Please try again.';
        }
      );
  }

  onSortChange(event: any): void {
    const sortCriteria = event.target.value;
    if (sortCriteria === 'priority-and-createdAt') {
      this.loadSortedTickets();
    } else {
      this.loadTickets(); // Default sorting
    }
  }

  // Method to load sorted tickets
  loadSortedTickets(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.supportService.getTicketsSortedByPriorityAndCreatedAt()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (data: SupportTicket[]) => this.tickets = data,
        (error: any) => {
          console.error('Error loading sorted tickets:', error);
          this.errorMessage = 'Failed to load sorted tickets. Please try again.';
        }
      );
  }

  // Methods for creating, deleting, and updating tickets
  onSubmit(): void {
    if (this.ticketForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.ticketForm.controls).forEach(key => {
        const control = this.ticketForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    if (this.isEditMode) {
      this.updateTicket(this.ticketForm.value);
    } else {
      this.createTicket(this.ticketForm.value);
    }
  }

  // Create a ticket
  createTicket(ticketData: any): void {
    const newTicket: SupportTicket = {
      ...ticketData
      // Don't set the 'id' here, as it will be returned by the backend
    };
  
    this.supportService.createTicket(newTicket)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (createdTicket: SupportTicket) => {
          this.tickets.push(createdTicket);
          this.finalizeAction('🎉 Ticket created successfully!');
        },
        (error: any) => {
          console.error('Error creating ticket:', error);
          this.errorMessage = 'Failed to create ticket. Please try again.';
        }
      );
  }
  
  // Update a ticket
  updateTicket(ticketData: any): void {
    if (!this.currentTicketId) return;
    
    const updatedTicket = {
      ...ticketData,
      id: this.currentTicketId // Ensure correct ticket ID
    };
    
    this.supportService.updateTicket(updatedTicket)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        () => this.finalizeAction('🎉 Ticket updated successfully!'),
        (error: any) => {
          console.error('Error updating ticket:', error);
          this.errorMessage = 'Failed to update ticket. Please try again.';
        }
      );
  }

  // Delete a ticket
  onDelete(ticket: SupportTicket): void {
    if (!ticket.id) return;
    
    if (confirm(`Are you sure you want to delete the ticket "${ticket.title}"?`)) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.supportService.deleteTicket(ticket.id)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          () => {
            this.tickets = this.tickets.filter(t => t.id !== ticket.id);
            this.successMessage = '🗑️ Ticket deleted successfully!';
            
            // Auto-dismiss success message after 5 seconds
            setTimeout(() => {
              this.successMessage = '';
            }, 5000);
          },
          (error: any) => {
            console.error('Error deleting ticket:', error);
            this.errorMessage = 'Failed to delete ticket. Please try again.';
          }
        );
    }
  }

  // Modify a ticket (switch to edit mode)
  onModify(ticket: SupportTicket): void {
    this.ticketForm.setValue({
      title: ticket.title,
      description: ticket.description,
      category: ticket.category
    });
    this.isEditMode = true;
    this.currentTicketId = ticket.id;
    this.errorMessage = '';
    
    // Scroll to the form
    document.getElementById('ticketForm')?.scrollIntoView({ behavior: 'smooth' });
  }

  onCancelEdit(): void {
    this.resetForm();
  }
}
