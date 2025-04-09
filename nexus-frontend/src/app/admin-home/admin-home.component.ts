import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  constructor(private _router: Router) { }
  dropdownOpen = false;
  walletDropdownOpen = false;  // New property for wallet dropdown
  isCollapsed = false;  // Track whether sidebar is collapsed


  toggleDropdown() {
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