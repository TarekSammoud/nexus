import { NexusWallet } from "./wallet.model";

export interface Transfer {
    id: number;
    receiver_wallet_id: number;
    amount: number;
    createdAt?: Date;
    updatedAt?: Date;
    wallet?: NexusWallet; // wallet associated with the transfer
  }