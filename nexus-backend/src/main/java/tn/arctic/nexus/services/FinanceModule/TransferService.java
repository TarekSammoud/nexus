package tn.arctic.nexus.services.FinanceModule;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.FinanceModule.Transfer;
import tn.arctic.nexus.entities.FinanceModule.Wallet;
import tn.arctic.nexus.repositories.FinanceModule.ITransferRepository;
import tn.arctic.nexus.repositories.FinanceModule.IWalletRepository;

import java.util.List;

@Service
public class TransferService implements ITransferService {

    @Autowired
    ITransferRepository transferRepository;
    @Autowired
    IWalletRepository walletRepository;
    @Override
    public List<Transfer> getTransfers() {
        return transferRepository.findAll();
    }

    @Override
    public Transfer getTransfer(Long id) {
        return transferRepository.findById(id).orElseThrow(() -> new RuntimeException("Transfer not found"));
    }

    @Override
    public Transfer createTransfer(Transfer transfer) {
        return transferRepository.save(transfer);
    }

    @Override
    public Transfer updateTransfer(Transfer transfer) {
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

    @Override
    public Transfer CreateAffectTransferToWallet(String metamaskPublicKey, Transfer transfer) {
        // Retrieve wallet
        Wallet wallet = walletRepository.findByMetamaskPublicKey(metamaskPublicKey);

        if (wallet == null) {
            throw new EntityNotFoundException("Wallet with public key " + metamaskPublicKey + " not found.");
        }
        // Link wallet and save payment
        transfer.setWallet(wallet);
        return transferRepository.save(transfer);
    }

    @Override
    public List<Transfer> getTransfersByWalletPK(String metamaskPublicKey) {
        return transferRepository.findByWallet_MetamaskPublicKey(metamaskPublicKey);

    }


}
