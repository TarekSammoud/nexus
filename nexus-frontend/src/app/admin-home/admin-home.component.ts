import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  animations: [
    trigger('dropdownAnimation', [
      // Dropdown closed state
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('300ms ease-out', style({ opacity: 1, height: '*' }))
      ]),
      // Dropdown open state
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class AdminHomeComponent {
  constructor(private _router: Router) { }
  dropdownOpen = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  navigateToGamesList(){
    this._router.navigate([{ outlets: { modal: 'admin/games/list' } }]);
  }

  isCollapsed = false;  // Track whether sidebar is collapsed

  // Toggle the sidebar state
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }



}
