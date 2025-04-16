import { NexusWallet } from "./wallet.model";

export interface Transfer {
    id?: number;
    receiverMetaMaskAddress: String;
    amount: number;
    createdAt?: Date;
    updatedAt?: Date;
    wallet?: NexusWallet; // wallet associated with the transfer
  }