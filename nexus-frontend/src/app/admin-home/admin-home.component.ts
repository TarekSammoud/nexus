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
  gamesDropdownOpen = false;   // State for games dropdown
  supportDropdownOpen = false; // State for support dropdown
  dropdownOpen = false;
  walletDropdownOpen = false;  // New property for wallet dropdown
  isCollapsed = false;  // Track whether sidebar is collapsed
  jamDropdownOpen = false;

  dropdownOpenD = false;



  toggleGamesDropdown(): void {
    this.gamesDropdownOpen = !this.gamesDropdownOpen;
  }

  toggleJamDropdown() {
    this.jamDropdownOpen = !this.jamDropdownOpen;
  }
  
  toggleSupportDropdown(){
    this.supportDropdownOpen = !this.supportDropdownOpen;
  }
  toggleDropdownD() {
    this.dropdownOpenD = !this.dropdownOpenD;
  }

  toggleDropdownf () {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleWalletDropdown() {  // New method for wallet dropdown
    this.walletDropdownOpen = !this.walletDropdownOpen;
  }

  navigateToGamesList(){
    this._router.navigate([{ outlets: { modal: 'admin/games/list' } }]);
  }


  // Toggle the sidebar state
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
  
