package tn.arctic.nexus.services.FinanceModule;

import tn.arctic.nexus.entities.FinanceModule.Payment;
import tn.arctic.nexus.entities.FinanceModule.Purchase;

import java.util.List;

public interface IPurchaseService{
    public List<Purchase> getAllPurchases();
    public Purchase getPurchaseById(Long id);
    public Purchase createPurchase(Purchase purchase);
    public Purchase updatePurchase(Purchase purchase);
    public boolean deletePurchase(Long id);

}
