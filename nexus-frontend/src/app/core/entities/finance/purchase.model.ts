import { Refund } from "./refund.model";
import { NexusWallet } from "./wallet.model";

export interface Purchase {
  id?: number;
  productType: productType;
  productId: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  wallet?: NexusWallet; 
  refunds?: Refund; // List of refunds associated with this purchase
}
  export enum productType {
    GAME= 'GAME',
    GAME_ITEM= 'GAME_ITEM',
  }
    