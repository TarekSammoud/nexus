import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneratePdfComponent } from '../finance/wallet-dashboard/popUps/generate-pdf/generate-pdf.component';

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
  constructor(private _router: Router, private modalService: NgbModal) { }

  // Dropdown state variables
  gamesDropdownOpen = false;
  supportDropdownOpen = false;
  jamDropdownOpen = false;
  MarketDropdownOpen = false;
  walletDropdownOpen = false;
  communityDropdownOpen = false;     // Ajouté depuis l'ancienne version
  userSpaceDropdownOpen = false;     // Ajouté depuis l'ancienne version

  dropdownOpen = false;    // Pour un autre dropdown
  dropdownOpenD = false;   // Pour un autre dropdown

  // Sidebar state variables
  isCollapsed = false;
  sidebarOpen = true;      // Ajouté depuis l'ancienne version

  // Methods to toggle dropdowns
  toggleGamesDropdown(): void {
    this.gamesDropdownOpen = !this.gamesDropdownOpen;
  }

  toggleJamDropdown(): void {
    this.jamDropdownOpen = !this.jamDropdownOpen;
  }

  toggleMarketDropdown(): void {
    this.MarketDropdownOpen = !this.MarketDropdownOpen;
  }

  toggleSupportDropdown(): void {
    this.supportDropdownOpen = !this.supportDropdownOpen;
  }

  toggleWalletDropdown(): void {
    this.walletDropdownOpen = !this.walletDropdownOpen;
  }

  toggleCommunityDropdown(): void {
    this.communityDropdownOpen = !this.communityDropdownOpen;
  }

  toggleUserSpaceDropdown(): void {
    this.userSpaceDropdownOpen = !this.userSpaceDropdownOpen;
  }

  toggleDropdownf(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleDropdownD(): void {
    this.dropdownOpenD = !this.dropdownOpenD;
  }

  // Navigation
  navigateToGamesList(): void {
    this._router.navigate([{ outlets: { modal: 'admin/games/list' } }]);
  }

  // Open modal to generate PDF
  openGeneratePdfPopup(): void {
    const modalRef = this.modalService.open(GeneratePdfComponent);
  }

  // Sidebar methods
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }
}
