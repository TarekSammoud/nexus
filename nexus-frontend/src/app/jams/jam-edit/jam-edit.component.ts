import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-jam-edit',
  templateUrl: './jam-edit.component.html',
  styleUrls: ['./jam-edit.component.css']
})
export class JamEditComponent {
  @Input() jam: any;
  @Output() jamUpdated = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  submit() {
    this.jamUpdated.emit(this.jam);
  }

  cancelEdit() {
    this.cancel.emit();
  }
  
}
