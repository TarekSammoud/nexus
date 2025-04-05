import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  private cartItems: CartItem[] = [];
  total: number = 0;
  private countItem = new BehaviorSubject<number>(0);

  count$ = this.countItem.asObservable();


  constructor() {
    this.cartItems = [
      { id: 1, name: 'Game Title 1', price: 59,  imageUrl: 'assets/game1.jpg' },
      { id: 2, name: 'Game Title 2', price: 30,  imageUrl: 'assets/game2.jpg' },
      { id: 3, name: 'Game Title 3', price: 20,  imageUrl: 'assets/game2.jpg' },
      { id: 4, name: 'Game Title 4', price: 100,  imageUrl: 'assets/game2.jpg' }


    ];
    this.calculateTotal();
    // Initialize the count of items in the cart
    this.countItem.next(this.countItems());
  
  }

  getItems(): CartItem[] {
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
    this.calculateTotal();
    //update the count after delete
    this.updateCount();

  }

  //metode to update the count of items in the cart
  private updateCount() {
    this.countItem.next(this.countItems());
  }
  checkout(): void {
    console.log('Proceeding to checkout...', this.cartItems);
  }
}
