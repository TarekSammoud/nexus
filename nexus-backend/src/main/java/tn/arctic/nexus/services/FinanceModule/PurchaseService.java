package tn.arctic.nexus.services.FinanceModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.FinanceModule.Purchase;
import tn.arctic.nexus.repositories.FinanceModule.IPurchaseRepositpry;

import java.util.List;

@Service
public class PurchaseService implements IPurchaseService {
    @Autowired
    IPurchaseRepositpry purchaseRepository;

    @Override
    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    @Override
    public Purchase getPurchaseById(Long id) {
        return purchaseRepository.findById(id).orElseThrow(() -> new RuntimeException("Purchase not found"));
    }

    @Override
    public Purchase createPurchase(Purchase purchase) {
        return purchaseRepository.save(purchase);
    }

    @Override
    public Purchase updatePurchase(Purchase purchase) {
        return purchaseRepository.save(purchase);
    }

    @Override
    public boolean deletePurchase(Long id) {
        if (purchaseRepository.existsById(id)) {
            purchaseRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }


}
