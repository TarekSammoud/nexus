import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface Friend {
  id: number;
  name: string;
  profilePic: string;
}
@Component({
  selector: 'app-transfer-popup',
  templateUrl: './transfer-popup.component.html',
  styleUrls: ['./transfer-popup.component.css']
})
export class TransferPopupComponent {
  constructor(public activeModal: NgbActiveModal) {
    this.filteredFriends = [...this.friends];

  }


  searchText: string = '';
  coinAmountTosend: number = 0;
  filteredFriends: Friend[] = [];

  friends: Friend[] = [
    {
      id: 1,
      name: 'John Doe',
      profilePic: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      name: 'Jane Smith',
      profilePic: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      profilePic: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      profilePic: 'https://i.pravatar.cc/150?img=4'
    },
    {
      id: 5,
      name: 'David Brown',
      profilePic: 'https://i.pravatar.cc/150?img=5'
    }
  ];
  searchFriends() {
    if (!this.searchText) {
      this.filteredFriends = [...this.friends];
      return;
    }
    
    const searchTerm = this.searchText.toLowerCase().trim();
    this.filteredFriends = this.friends.filter(friend => 
      friend.name.toLowerCase().includes(searchTerm)
    );
  }

  clearSearch() {
    this.searchText = '';
    this.searchFriends();
  }

  incrementCoins() {
    this.coinAmountTosend += 1;
  }

  decrementCoins() {
    if (this.coinAmountTosend > 0) {
      this.coinAmountTosend -= 1;
    }
  }

  sendCoins(friend: Friend) {
    if (this.coinAmountTosend <= 0) {
      alert('Please select amount of coins to send');
      return;
    }

}
}
