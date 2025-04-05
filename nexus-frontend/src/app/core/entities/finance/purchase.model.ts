export interface Purchase {
  id: number;
  productType: productType;
  productId: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  NexusWalletId?: number; // wallet associated with the transfer
  refundId?: number; // Assuming Refund is referenced by ID
}
  export enum productType {
    GAME= 'GAME',
    GAME_ITEM= 'GAME_ITEM',
  }
    