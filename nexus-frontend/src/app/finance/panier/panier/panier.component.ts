import { Component } from '@angular/core';
import { Game } from 'src/app/core/entities/game/game';
import { CartItem, PanierService } from 'src/services/finance/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  cartItems: Game[] = [];
  total: number = 0;

  constructor(private panierService: PanierService) {}

  ngOnInit() {
    this.cartItems = this.panierService.getItems();
    this.total = this.panierService.getTotal();
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
