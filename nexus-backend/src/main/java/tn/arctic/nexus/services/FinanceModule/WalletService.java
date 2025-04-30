package tn.arctic.nexus.services.FinanceModule;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.FinanceModule.Wallet;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.FinanceModule.IWalletRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;
import tn.arctic.nexus.services.UsersModule.IUserService;

import java.util.List;

@Service
public class WalletService implements IWalletService {

    @Autowired
    IWalletRepository walletRepository;
    @Autowired
    IUserService userSer;
    @Autowired
    IUserRepository userRepo;


    @Override
    public List<Wallet> getWallets() {
        return walletRepository.findAll();
    }

    @Override
    public Wallet getWalletsById(Long id) {
        return walletRepository.findById(id).orElseThrow(() -> new RuntimeException("Wallet not found"));
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
        try {
            Wallet wallet = walletRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Wallet not found"));

            // Disconnect wallet from user to prevent foreign key violation
            User user = wallet.getUser();
            if (user != null) {
                user.setWallet(null);
                userRepo.save(user); // update user to remove wallet
            }

            wallet.setUser(null); // optional

            walletRepository.delete(wallet);

            return true; // deletion successful
        } catch (EntityNotFoundException e) {
            return false; // wallet not found
        } catch (Exception e) {
            // Optionally log the error
            return false; // other error
        }
    }


    @Override
    public Wallet findByMetamaskPublicKey(String metamask_public_key) {
        return walletRepository.findByMetamaskPublicKey(metamask_public_key);
    }

    @Override
    public Wallet findByUserId(Long userId) {
        return walletRepository.findByUser_Id(userId);
    }


    @Override
    public Wallet CreateAffectWalletToUser(Long userId, Wallet wallet) {
        User user = userSer.retrieveUser(userId);

        if (user == null) {
            throw new EntityNotFoundException("User with id " + userId + " not found.");
        }
        // Link wallet and save payment
        wallet.setUser(user);
        user.setWallet(wallet); // Optional for DB, but recommended

        // Save owning side first
        Wallet savedWallet = walletRepository.save(wallet);

        // Save the inverse side (for consistency)
        userRepo.save(user);

        return savedWallet;
    }


}
