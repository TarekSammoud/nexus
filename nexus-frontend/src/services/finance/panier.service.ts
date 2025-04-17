import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from 'src/app/core/entities/game/game';
import { MetamaskService } from './metamask.service';
import { GameService } from 'src/app/core/services/game/game.service';
export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private cartItems: Game[] = [];
  private readonly storageKey = 'cart';
  total: number = 0;
  private countItem = new BehaviorSubject<number>(0);

  count$ = this.countItem.asObservable();


  constructor(private metamaskService: MetamaskService,private gameService: GameService) {
    const storedItems = localStorage.getItem(this.storageKey);
    this.cartItems = storedItems ? JSON.parse(storedItems) : [];
    this.calculateTotal();
    this.countItem.next(this.countItems());
  
  }

   saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    this.calculateTotal();
    this.updateCount();
  }
  getItems(): Game[] {
    return this.cartItems;
  }

countItems(): number {
  return this.cartItems.length
}


  getTotal(): number {
    return this.total;
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.price), 0);
}

  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.saveCart();

  }

  //metode to update the count of items in the cart
  private updateCount() {
    this.countItem.next(this.countItems());
  }

   addItemToCart(item: Game): void {
    this.cartItems.push(item);
    this.saveCart();

  }
   async checkout(): Promise<void> {

     const walletAddress: string = this.metamaskService.getWalletAddress() || '';
     const coinsBalance: string | null = await this.metamaskService.getBalance(walletAddress) || '';
    if(this.total > parseInt(coinsBalance)){
  alert("not enough coins in your wallet")
  } else {
    console.log('Proceeding to checkout...', this.cartItems)
    this.metamaskService.SpendCoinsFromCart(this.total,this.cartItems);
    for (const item of this.cartItems) {
      this.gameService.addGameToLibrary(item.id).subscribe(
        response => {
          console.log('Game added to library:', response);
        }
      );  
    }
    this.cartItems = [];
    this.saveCart();
  }
}
}
