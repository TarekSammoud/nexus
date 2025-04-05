import { Component } from '@angular/core';
import { ethers } from 'ethers';
import { EthereumPriceService } from 'src/services/finance/ethereum-price.service';
import { MetamaskService } from 'src/services/finance/metamask.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent {
  ethereumPrice: number =0;
  oneNexusCoinPrice: number =0;
  recipientAddress: string = '0x9375f2d84f9843Df4BC29260219B7B25E73a92d1'; // The recipient's address
  amountToSend: string = '0.1'; // Amount in Ether to send
  txReceiptLabel: string = ''; // Amount in Ether to send

  priceChange: number = -2.4; // Positive for up, negative for down
  constructor(private cryptoPriceService: EthereumPriceService , private metaMaskService: MetamaskService) {}


  ngOnInit(): void {
    // Fetch the Ethereum price on component initialization
    this.cryptoPriceService.getEthereumPrice().subscribe(
      (data) => {
        // Access the Ethereum price from the API response
        this.ethereumPrice = data.ethereum.usd;
        this.oneNexusCoinPrice = 1 / this.ethereumPrice;
        console.log('Ethereum Price:', this.ethereumPrice);

      },
      (error) => {
        console.error('Error fetching Ethereum price:', error);
      }
    );
  }

  async sendTransaction(numberOfTokens: number) {
    try {
      const nexusCoinAmount = (numberOfTokens * this.oneNexusCoinPrice).toFixed(6); // Keeps 6 decimal places
      const txReceipt = await this.metaMaskService.sendTransaction(this.recipientAddress, nexusCoinAmount);
      console.log('Transaction successful:', txReceipt);
      this.txReceiptLabel =txReceipt;
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  }


}
