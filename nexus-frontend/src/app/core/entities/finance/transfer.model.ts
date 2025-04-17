import { NexusWallet } from "./wallet.model";

export interface Transfer {
    id?: number;
    receiverMetaMaskAddress: String;
    senderMetaMaskAddress: String;
    amount: number;
    type: TransferType;
    createdAt?: Date;
    updatedAt?: Date;
    wallet?: NexusWallet; // wallet associated with the transfer
  }

  export enum TransferType {
    IN = 'IN',
    OUT = 'OUT',
    Donation_IN = 'Donation_IN',
    Donation_OUT = 'Donation_OUT',
  }