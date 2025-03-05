package tn.arctic.nexus.entities.FinanceModule;

public enum TransactionType {
    DEPOSIT,       // When the user adds money/tokens to their wallet
    PURCHASE,      // When the user spends tokens to buy something
    REFUND,        // When a transaction is reversed
    TRANSFER
}
