package tn.arctic.nexus.services.FinanceModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.FinanceModule.transfer;
import tn.arctic.nexus.repositories.FinanceModule.ITransferRepository;

import java.util.List;

@Service
public class TransferService implements ITransferService {

    @Autowired
    ITransferRepository transferRepository;
    @Override
    public List<transfer> getTransfers() {
        return transferRepository.findAll();
    }

    @Override
    public transfer getTransfer(Long id) {
        return transferRepository.findById(id).orElseThrow(() -> new RuntimeException("Transfer not found"));
    }

    @Override
    public transfer createTransfer(transfer transfer) {
        return transferRepository.save(transfer);
    }

    @Override
    public transfer updateTransfer(transfer transfer) {
        return transferRepository.save(transfer);
    }

    @Override
    public boolean deleteTransfer(Long id) {
        if (transferRepository.existsById(id)) {
            transferRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
