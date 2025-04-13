import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportAgent } from 'src/app/core/entities/support/SupportAgent.model';
import { Departement } from 'src/app/core/entities/support/Departement.enum';
import { SupportAgentService } from 'src/app/core/services/support/agent-support.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-agent-support',
  templateUrl: './admin-agent-support.component.html',
  styleUrls: ['./admin-agent-support.component.css']
})
export class AdminAgentSupportComponent implements OnInit {
  agents: SupportAgent[] = [];
  agentForm: FormGroup;
  isEditMode: boolean = false;
  currentAgentId: number | null = null;
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  departements = Object.values(Departement);

  constructor(
    private fb: FormBuilder, 
    private agentService: SupportAgentService
  ) {
    this.agentForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      departement: ['', Validators.required]
    });
  }

  // Getters for form controls
  get name() { return this.agentForm.get('name'); }
  get email() { return this.agentForm.get('email'); }
  get departement() { return this.agentForm.get('departement'); }

  ngOnInit(): void {
    this.loadAgents();
    console.log('Component initialized, attempting to load agents...');
  }

  loadAgents(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.agentService.getAllAgents()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (data: SupportAgent[]) => {
          this.agents = data;
          console.log('Agents loaded:', this.agents);
        },
        (error: any) => {
          console.error('Error loading agents', error);
          this.errorMessage = 'Failed to load agents. Please try again later.';
        }
      );
  }

  onModify(agent: SupportAgent): void {
    this.isEditMode = true;
    this.currentAgentId = agent.id;
    this.agentForm.patchValue(agent);
    this.successMessage = '';
    this.errorMessage = '';
    
    // Scroll to the form
    document.getElementById('agentForm')?.scrollIntoView({ behavior: 'smooth' });
  }

  createAgent(agentData: any): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.agentService.createAgent(agentData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (createdAgent: SupportAgent) => {
          this.agents.push(createdAgent);
          this.finalizeAction('🎉 Agent created successfully!');
        },
        (error: any) => {
          console.error('Creation error', error);
          this.errorMessage = 'Failed to create agent. Please try again.';
        }
      );
  }

  updateAgent(agentData: any): void {
    if (this.currentAgentId != null) {
      agentData.id = this.currentAgentId;
      this.isLoading = true;
      this.errorMessage = '';
      
      this.agentService.updateAgent(agentData)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          () => {
            this.finalizeAction('🎉 Agent updated successfully!');
            // Update the agent in the local array
            const index = this.agents.findIndex(a => a.id === this.currentAgentId);
            if (index !== -1) {
              this.agents[index] = { ...agentData, id: this.currentAgentId };
            }
          },
          (error: any) => {
            console.error('Update error', error);
            this.errorMessage = 'Failed to update agent. Please try again.';
          }
        );
    }
  }

  onDelete(agent: SupportAgent): void {
    if (confirm(`Are you sure you want to delete the agent "${agent.name}"?`)) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.agentService.deleteAgent(agent.id)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          () => {
            this.agents = this.agents.filter(existingAgent => existingAgent.id !== agent.id);
            this.successMessage = '🗑️ Agent deleted successfully!';
            
            // Auto-dismiss success message after 5 seconds
            setTimeout(() => {
              this.successMessage = '';
            }, 5000);
          },
          (error: any) => {
            console.error('Deletion error', error);
            this.errorMessage = 'Failed to delete agent. Please try again.';
          }
        );
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.currentAgentId = null;
    this.agentForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.agentForm.valid) {
      const formData = this.agentForm.value;
      if (this.isEditMode) {
        this.updateAgent(formData);
      } else {
        this.createAgent(formData);
      }
    } else {
      // Mark all form controls as touched to trigger validation messages
      Object.keys(this.agentForm.controls).forEach(key => {
        this.agentForm.get(key)?.markAsTouched();
      });
    }
  }

  finalizeAction(message: string): void {
    this.successMessage = message;
    this.resetForm();
    this.loadAgents();
    
    // Auto-dismiss success message after 5 seconds
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }
}