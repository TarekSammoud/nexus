package tn.arctic.nexus.services.FinanceModule;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.FinanceModule.Purchase;
import tn.arctic.nexus.entities.FinanceModule.Refund;
import tn.arctic.nexus.entities.FinanceModule.Wallet;
import tn.arctic.nexus.repositories.FinanceModule.IPurchaseRepositpry;
import tn.arctic.nexus.repositories.FinanceModule.IRefundRepository;

import java.util.List;

@Service
public class RefundService implements IRefundService {

    @Autowired
    IRefundRepository refundRepo;
    @Autowired
    IPurchaseRepositpry purchaseRepository;

    @Override
    public List<Refund> getRefunds() {
        return refundRepo.findAll();
    }

    @Override
    public Refund getRefund(Long id) {
        return refundRepo.findById(id).orElseThrow(() -> new RuntimeException("Refund not found"));
    }

    @Override
    public Refund addRefund(Refund refund) {
        return refundRepo.save(refund);
    }

    @Override
    public Refund updateRefund(Refund refund) {
        return refundRepo.save(refund);
    }

    @Override
    public boolean deleteRefund(Long id) {
        if (refundRepo.existsById(id)) {
            refundRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Refund CreateAffectRefundToPurchase(Long purchaseId, Refund refund) {
        // Retrieve purchase
        Purchase purchase = purchaseRepository.findById(purchaseId).orElseThrow(() -> new RuntimeException("purchase not found"));

        if (purchase == null) {
            throw new EntityNotFoundException("Purchase with ids " + purchaseId + " not found.");
        }
        // Link refund and save purchase
        refund.setPurchase(purchase);
        return refundRepo.save(refund);
    }

    @Override
    public List<Refund> getRefundsByWalletPK(String metamaskPublicKey) {
        return refundRepo.findByPurchase_Wallet_MetamaskPublicKey(metamaskPublicKey);
    }

    @Override
    public Refund updateRefundStatus(Long refundId) {
        Refund refund = refundRepo.findById(refundId).orElseThrow(() -> new RuntimeException("Refund not found"));
        refund.setStatus("Accepted");
        refundRepo.save(refund);
        return refund;
    }


}
