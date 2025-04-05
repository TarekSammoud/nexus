import { Purchase } from "./purchase.model";

export interface Refund {
    id: number;
    status: string;
    refundAmount: number;
    reason: string;
    createdAt: Date;
    updatedAt: Date;
    purchaseId: number; 
    purchase: Purchase;
  }
  