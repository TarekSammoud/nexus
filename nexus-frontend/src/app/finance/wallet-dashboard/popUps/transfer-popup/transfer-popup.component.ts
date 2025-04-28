import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Transfer, TransferType } from 'src/app/core/entities/finance/transfer.model';
import { TransferService } from 'src/services/finance/Crud/transfer.service';
import { MetamaskService } from 'src/services/finance/metamask.service';
import { NotificationService } from 'src/services/finance/notification.service';

interface Friend {
  id: number;
  metaMaskAddress: String;
  name: string;
  profilePic: string;
}
@Component({
  selector: 'app-transfer-popup',
  templateUrl: './transfer-popup.component.html',
  styleUrls: ['./transfer-popup.component.css']
})
export class TransferPopupComponent {
  constructor(public activeModal: NgbActiveModal,
    private metamaskService :MetamaskService,
    private transferService :TransferService,
    private notificationService: NotificationService
  
  ) {
    this.filteredFriends = [...this.friends];

  }


  searchText: string = '';
  coinAmountTosend: number = 0;
  filteredFriends: Friend[] = [];

  friends: Friend[] = [
    {
      id: 3,
      metaMaskAddress: '0x9375f2d84f9843Df4BC29260219B7B25E73a92d1',
      name: 'nexus',
      profilePic: 'https://i.pravatar.cc/150?img=1'
    },
    
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

  transfer: Transfer = {
    type: TransferType.OUT,
    receiverMetaMaskAddress: "0",
    senderMetaMaskAddress: "0",
    amount: 0
  };
  createTransfer(): void {
    this.transferService.createAndAffectTransfer(this.metamaskService.getWalletAddress(),this.transfer).subscribe({
      next: (response) => {
        console.log('Transfer created:', response);
      },
      error: (err) => {
        console.error('Error creating transfer:', err);
      }
    });
    console.log('Transfer create to the reciever:');
    this.transfer.type = TransferType.IN;
    this.transferService.createAndAffectTransfer(this.transfer.receiverMetaMaskAddress,this.transfer).subscribe({
      next: (response) => {
        console.log('Transfer created:', response);
      },
      error: (err) => {
        console.error('Error creating transfer:', err);
      }
    });
    

  }
  
 
  async sendCoins(friend: Friend) {
    if (this.coinAmountTosend <= 0) {
      alert('Please select amount of coins to send');
      return;
    }else{
         await this.metamaskService.TransfertCoins(friend.metaMaskAddress, this.coinAmountTosend);

         //notficating the reciever
  console.log(friend.id.toString());
         this.notificationService.showNotification(friend.id.toString(),"you have recived " + this.coinAmountTosend+ "coins");
       
       
         this.transfer.receiverMetaMaskAddress = friend.metaMaskAddress;
          this.transfer.senderMetaMaskAddress = this.metamaskService.getWalletAddress() || '';
          this.transfer.amount = this.coinAmountTosend;
          this.createTransfer();
          this.activeModal.close('Coins sent successfully!');
    }
  
  }
}

