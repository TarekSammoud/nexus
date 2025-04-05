export interface Transfer {
    id: number;
    receiver_wallet_id: number;
    amount: number;
    createdAt?: Date;
    updatedAt?: Date;
    NexusWalletId?: number; // wallet associated with the transfer
  }