package tn.arctic.nexus.services.FinanceModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.FinanceModule.Wallet;
import tn.arctic.nexus.repositories.FinanceModule.IWalletRepository;

import java.util.List;

@Service
public class WalletService implements IWalletService {

    @Autowired
    IWalletRepository walletRepository;


    @Override
    public List<Wallet> getWallets() {
        return walletRepository.findAll();
    }

    @Override
    public Wallet getWalletsById(Long id) {
        return walletRepository.findById(id).orElseThrow(() -> new RuntimeException("Wallet not found"));
    }

    @Override
    public Wallet getWalletsByUserId(Long id) {
        return walletRepository.findByUserId(id);
    }

    @Override
    public Wallet addWallet(Wallet wallet) {
       return walletRepository.save(wallet);
    }

    @Override
    public Wallet updateWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    @Override
    public boolean deleteWalletById(Long id) {
        if (walletRepository.existsById(id)) {
            walletRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean deleteWalletByUserId(Long id) {
        Wallet wallet = walletRepository.findByUserId(id);
        if (wallet != null) {
            walletRepository.delete(wallet);
            return true;
        }else {
            return false;
        }

    }


}
