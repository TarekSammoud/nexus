package tn.arctic.nexus.services.FinanceModule;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.FinanceModule.Purchase;
import tn.arctic.nexus.entities.FinanceModule.Wallet;
import tn.arctic.nexus.repositories.FinanceModule.IPurchaseRepository;
import tn.arctic.nexus.repositories.FinanceModule.IWalletRepository;

import java.util.List;

@Service
public class PurchaseService implements IPurchaseService {
    @Autowired
    IPurchaseRepository purchaseRepository;
    @Autowired
    IWalletRepository walletRepository;

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
 /// one purchase
    @Override
    public Purchase CreateAffectPurchaseToWallet(String metamaskPublicKey, Purchase purchase) {
        // Retrieve wallet
        Wallet wallet = walletRepository.findByMetamaskPublicKey(metamaskPublicKey);

        if (wallet == null) {
            throw new EntityNotFoundException("Wallet with public key " + metamaskPublicKey + " not found.");
        }
        // Link wallet and save purchase
        purchase.setWallet(wallet);
        return purchaseRepository.save(purchase);
    }

    /// many purchases
    @Override
    public List<Purchase> CreateAffectPurchasesToWallet(String metamaskPublicKey, List<Purchase> purchases) {
        Wallet wallet = walletRepository.findByMetamaskPublicKey(metamaskPublicKey);
        if (wallet == null) {
            throw new EntityNotFoundException("Wallet with public key " + metamaskPublicKey + " not found.");
        }
        for (Purchase purchase : purchases) {
            purchase.setWallet(wallet);
        }
        return purchaseRepository.saveAll(purchases);


    }

    @Override
    public List<Purchase> getPurchasesByWalletPK(String metamaskPublicKey) {
        return purchaseRepository.findByWallet_MetamaskPublicKey(metamaskPublicKey);
    }




}
