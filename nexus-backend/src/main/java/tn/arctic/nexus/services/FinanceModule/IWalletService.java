package tn.arctic.nexus.services.FinanceModule;

import tn.arctic.nexus.entities.FinanceModule.Wallet;

import java.util.List;

public interface IWalletService {

    public List<Wallet> getWallets();
    public Wallet getWalletsById(Long id);
    public Wallet addWallet(Wallet wallet);
    public Wallet updateWallet(Wallet wallet);
    public boolean deleteWalletById(Long id);



}
