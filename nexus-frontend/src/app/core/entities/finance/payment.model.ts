import { NexusWallet } from "./wallet.model";

  export interface Payment {
    id?: number; // Optional because it will be auto-generated
    coinAmount: number;
    status: string;
    price: String;
    createdAt?: Date; // Optional since it is auto-generated
    updatedAt?: Date; // Optional since it is auto-updated
    NexusWalletId?: number; // wallet associated with the transfer
  }
  
