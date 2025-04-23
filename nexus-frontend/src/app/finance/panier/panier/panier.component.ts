import { Component } from '@angular/core';
import { Game } from 'src/app/core/entities/game/game';
import { MetamaskService } from 'src/services/finance/metamask.service';
import { CartItem, PanierService } from 'src/services/finance/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  cartItems: Game[] = [];
  total: number = 0;

  constructor(private panierService: PanierService,private metamaskService:MetamaskService) {}

  ngOnInit() {
    
    for (let item of this.panierService.getItems()) {
      if (item.gameDiscount){
        if (item.gameDiscount.discountPercentage)
        item.price = item.price - (item.price * item.gameDiscount.discountPercentage / 100)
      }
    }
    this.cartItems = this.panierService.getItems();
    this.total = this.panierService.getTotal();
    this.metamaskService.connectWallet();

  }


  removeItem(itemId: number) {
    this.panierService.removeItem(itemId);
    this.cartItems = this.panierService.getItems();
    this.total = this.panierService.getTotal();
  }

  checkout() {
    this.panierService.checkout();
  }
}
