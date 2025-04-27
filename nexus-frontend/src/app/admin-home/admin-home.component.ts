import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('300ms ease-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class AdminHomeComponent {
  constructor(private _router: Router) { }

  gamesDropdownOpen = false;
  supportDropdownOpen = false;
  jamDropdownOpen = false;

  communityDropdownOpen = false;    // Nouvelle variable pour Community
  userSpaceDropdownOpen = false;    // Nouvelle variable pour Personal Space

  toggleGamesDropdown(): void {
    this.gamesDropdownOpen = !this.gamesDropdownOpen;
  }

  toggleJamDropdown() {
    this.jamDropdownOpen = !this.jamDropdownOpen;
  }

  toggleSupportDropdown() {
    this.supportDropdownOpen = !this.supportDropdownOpen;
  }

  toggleCommunityDropdown() {
    this.communityDropdownOpen = !this.communityDropdownOpen;
  }

  toggleUserSpaceDropdown() {
    this.userSpaceDropdownOpen = !this.userSpaceDropdownOpen;
  }

  navigateToGamesList() {
    this._router.navigate([{ outlets: { modal: 'admin/games/list' } }]);
  }

  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
