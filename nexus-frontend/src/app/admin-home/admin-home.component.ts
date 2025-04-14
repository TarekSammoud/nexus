import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  constructor(private _router: Router) { }
  gamesDropdownOpen = false;   // State for games dropdown
  supportDropdownOpen = false; // State for support dropdown

  toggleGamesDropdown() {
    this.gamesDropdownOpen = !this.gamesDropdownOpen;
  }

  toggleSupportDropdown(){
    this.supportDropdownOpen = !this.supportDropdownOpen;
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
