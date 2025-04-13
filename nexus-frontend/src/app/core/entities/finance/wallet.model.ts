import { Payment } from "./payment.model";
import { Purchase } from "./purchase.model";
import { Transfer } from "./transfer.model";

export interface NexusWallet {
  id?: number;
  coinBalance?: number;
  metamaskPublicKey?: string;
  createdAt?: Date;
  updatedAt?: Date;
  payments?: Payment[];
  transfers?: Transfer[];
  purchases?: Purchase[];
}