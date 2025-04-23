import { Component } from '@angular/core';
import { ethers } from 'ethers';
import { Payment } from 'src/app/core/entities/finance/payment.model';
import { PaymentService } from 'src/services/finance/Crud/payment.service';
import { EthereumPriceService } from 'src/services/finance/ethereum-price.service';
import { MetamaskService } from 'src/services/finance/metamask.service';
import { NotificationService } from 'src/services/finance/notification.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent {
  ethereumPrice: number =0;
  oneNexusCoinPrice: number =0;
  txReceiptLabel: string = ''; // Amount in Ether to send
  connectedWalletAddress : string =''; // Get the connected wallet address from the service
  
  isFetched: boolean = false; // Flag to check if the price is fetched
  coinsAmountChosen: number = 0; // Amount in Ether to send
  priceChange: number = -2.4; // Positive for up, negative for down
  constructor(private cryptoPriceService: EthereumPriceService , 
    private metaMaskService: MetamaskService,
    private notificationService: NotificationService,
     ) {}


  ngOnInit(): void {
  this.isFetched = false; // Reset the flag on component initialization
    // Fetch the Ethereum price on component initialization
    this.cryptoPriceService.getEthereumPrice().subscribe(
      (data) => {
        // Access the Ethereum price from the API response
        this.ethereumPrice = data.ethereum.usd;
        this.oneNexusCoinPrice = 1 / this.ethereumPrice;
        console.log('Ethereum Price:', this.ethereumPrice);
        this.isFetched = true; // Set the flag to true after fetching the price
      },
      (error) => {
        console.error('Error fetching Ethereum price:', error);
      }
    );

    this.lsitenToEtherReceived();
    
  }

  async lsitenToEtherReceived() {
    this.metaMaskService.connectWallet()
    this.connectedWalletAddress = await this.metaMaskService.getWalletAddress() || '';
    console.log("this.connectedWalletAddress",this.connectedWalletAddress)
    if(this.connectedWalletAddress =='') {console.log("adrres null") } else{// Get the connected wallet address from the service
   await   this.metaMaskService.listenToEtherReceived();}
  }

  async sendTransaction(numberOfTokens: number, amountInEther: number) {
   try {
      localStorage.setItem('coinsToPurchase', numberOfTokens.toString());
      console.log("numberOfTokens",Number(localStorage.getItem('coinsToPurchase')))
      localStorage.setItem('n', amountInEther.toFixed(6));
      console.log("price",(localStorage.getItem('n')))
     const nexusCoinAmount = (numberOfTokens * this.oneNexusCoinPrice).toFixed(6);
     const txReceipt = await this.metaMaskService.sendTransaction( nexusCoinAmount);
     this.txReceiptLabel =txReceipt
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  }


}
