import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MetamaskService } from 'src/services/finance/metamask.service';
import { PanierService } from 'src/services/finance/panier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartCountItems : number = 2;  
  isWalletConnected: boolean = false;


  constructor(private router: Router,private panierService: PanierService,private metaMaskService: MetamaskService) {

  }
  ngOnInit() {
    this.metaMaskService.isWalletConnected().then(isConnected => {
      this.isWalletConnected = isConnected;
    });
  
    this.panierService.countItems();
    this.panierService.count$.subscribe(newCount => {
      this.cartCountItems = newCount;
    });
  }
  
  

  goToWallet() {
    
    this.router.navigate([this.isWalletConnected ? '/wallet' : '/connectWallet']);

  }
  

}
