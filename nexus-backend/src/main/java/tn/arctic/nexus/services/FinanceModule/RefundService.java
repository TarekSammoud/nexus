package tn.arctic.nexus.services.FinanceModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.FinanceModule.Refund;
import tn.arctic.nexus.repositories.FinanceModule.IRefundRepository;

import java.util.List;

@Service
public class RefundService implements IRefundService {

    @Autowired
    IRefundRepository refundRepo;

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
}
