import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Game } from 'src/app/core/entities/game/game';
import { MetamaskService } from './metamask.service';
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


  constructor(private metamaskService: MetamaskService) {
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
  checkout(): void {
    console.log('Proceeding to checkout...', this.cartItems);
    this.cartItems = [];
    this.saveCart();
  }
}
