import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportTicketComponent } from './support-ticket/support-ticket.component';
import { SupportAgentComponent } from './support-agent/support-agent.component';
import { RoomComponent } from './room/room.component';
import { PerformanceReviewComponent } from './performance-review/performance-review.component';
import { SupportComponent } from './support/support.component';



@NgModule({
  declarations: [
    SupportTicketComponent,
    SupportAgentComponent,
    RoomComponent,
    PerformanceReviewComponent,
    SupportComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SupportModule { }
