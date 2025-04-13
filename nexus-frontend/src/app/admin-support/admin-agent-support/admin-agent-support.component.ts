import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportAgent } from 'src/app/core/entities/support/SupportAgent.model';

import { Departement } from 'src/app/core/entities/support/Departement.enum';
import { SupportAgentService } from 'src/app/core/services/support/agent-support.service';

@Component({
  selector: 'app-admin-agent-support',
  templateUrl: './admin-agent-support.component.html',
  styleUrls: ['./admin-agent-support.component.css']
})
export class AdminAgentSupportComponent {
  agents: SupportAgent[] = [];
  agentForm: FormGroup;
  isEditMode: boolean = false;
  currentAgentId: number | null = null;
  successMessage: string = '';

  departements = Object.values(Departement);

  constructor(private fb: FormBuilder, private agentService: SupportAgentService) {
    this.agentForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      departement: ['', Validators.required]
    });
  }

  finalizeAction(message: string): void {
    this.successMessage = message;
    this.resetForm();
    this.loadAgents();
  }

  ngOnInit(): void {
    this.loadAgents();
    // Add console log to confirm initialization
    console.log('Component initialized, attempting to load agents...');
  }

  loadAgents(): void {
    this.agentService.getAllAgents().subscribe(
      (data: SupportAgent[]) => {
        // Log the data to ensure it's correctly loaded
        this.agents = data;
        console.log('Agents loaded:', this.agents);
      },
      (error: any) => console.error('Error loading agents', error)
    );
  }

  onModify(agent: SupportAgent): void {
    this.selectAgent(agent);
    this.successMessage = ''; // Clearing messages for new action
  }

  selectAgent(agent: SupportAgent): void {
    this.isEditMode = true;
    this.currentAgentId = agent.id;
    this.agentForm.patchValue(agent);
  }

  createAgent(agentData: any): void {
    this.agentService.createAgent(agentData).subscribe(
      (createdAgent: SupportAgent) => {
        this.agents.push(createdAgent);
        this.finalizeAction('🎉 Agent created successfully!');
      },
      (error: any) => console.error('Creation error', error)
    );
  }

  updateAgent(agentData: any): void {
    if (this.currentAgentId != null) {
      agentData.id = this.currentAgentId;
      this.agentService.updateAgent(agentData).subscribe(
        () => this.finalizeAction('🎉 Agent updated successfully!'),
        (error: any) => console.error('Update error', error)
      );
    }
  }

  onDelete(agent: SupportAgent): void {
    this.agentService.deleteAgent(agent.id).subscribe(() => {
      this.agents = this.agents.filter(existingAgent => existingAgent.id !== agent.id);
      this.successMessage = 'Agent deleted successfully!';
    });
  }

  resetForm(): void {
    this.isEditMode = false;
    this.currentAgentId = null;
    this.agentForm.reset();
    this.successMessage = ''; // Clear any existing success message
  }

  onSubmit(): void {
    if (this.agentForm.valid) {
      const formData = this.agentForm.value;
      if (this.isEditMode) {
        // Update existing agent logic
        this.updateAgent(formData);
      } else {
        // Create new agent logic
        this.createAgent(formData);
      }
      this.resetForm();
    }
  }
}
