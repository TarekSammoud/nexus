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

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleDropdownf () {
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
