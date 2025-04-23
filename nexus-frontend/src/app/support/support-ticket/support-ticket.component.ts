import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/core/services/support/support-ticket.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportTicket } from 'src/app/core/entities/support/SupportTicket.model';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/user-management/auth.service';
import { TokenService } from 'src/app/core/services/user-management/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.css']
})
export class SupportTicketComponent implements OnInit {
  tickets: SupportTicket[] = [];
  ticketForm: FormGroup;
  isEditMode: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  currentTicketId: number | null = null;
  isLoading: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private supportService: SupportService,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router // Inject Router to navigate
  ) {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      priority: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  // Load tickets
  loadTickets(): void {
    this.isLoading = true;
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

  // Submit ticket
  onSubmit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.ticketForm.invalid) {
      return;
    }

    const ticketData = this.ticketForm.value;
    const userId = TokenService.getUserId();

    if (!userId) {
      this.errorMessage = 'User not authenticated. Please log in again.';
      return;
    }

    this.isSubmitting = true;
    this.supportService.createTicket(userId, ticketData).subscribe(
      (createdTicket) => {
        this.successMessage = 'Ticket created successfully!';
        this.ticketForm.reset();
        this.loadTickets();
      },
      (error) => {
        console.error('Error creating ticket:', error);
        this.errorMessage = 'Failed to create ticket. Please try again.';
      },
      () => {
        this.isSubmitting = false;
      }
    );
  }

  // Modify ticket for editing
  onModify(ticket: SupportTicket): void {
    this.ticketForm.setValue({
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      category: ticket.category
    });
    this.isEditMode = true;
    this.currentTicketId = ticket.id;
    document.querySelector('.ticket-form')?.scrollIntoView({ behavior: 'smooth' });
  }

  // Update ticket
  updateTicket(ticketData: any): void {
    if (!this.currentTicketId) return;

    const updatedTicket = {
      ...ticketData,
      id: this.currentTicketId
    };

    this.supportService.updateTicket(updatedTicket)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe(
        () => this.finalizeAction('Ticket updated successfully!'),
        (error: any) => {
          console.error('Error updating ticket:', error);
          this.errorMessage = 'Failed to update ticket. Please try again.';
        }
      );
  }

  // Delete ticket
  onDelete(ticket: SupportTicket): void {
    if (!ticket.id) return;

    if (confirm(`Are you sure you want to delete ticket "${ticket.title}"?`)) {
      this.isLoading = true;
      this.supportService.deleteTicket(ticket.id)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          () => {
            this.tickets = this.tickets.filter(t => t.id !== ticket.id);
            this.successMessage = 'Ticket deleted successfully!';
            setTimeout(() => this.successMessage = '', 5000);
          },
          (error: any) => {
            console.error('Error deleting ticket:', error);
            this.errorMessage = 'Failed to delete ticket. Please try again.';
          }
        );
    }
  }

  // Finalize action (show success message)
  private finalizeAction(message: string): void {
    this.successMessage = message;
    this.ticketForm.reset();
    this.loadTickets();
    setTimeout(() => this.successMessage = '', 5000);
  }

  // Getters for form fields
  get title() { return this.ticketForm.get('title'); }
  get description() { return this.ticketForm.get('description'); }
  get priority() { return this.ticketForm.get('priority'); }
  get category() { return this.ticketForm.get('category'); }
}
