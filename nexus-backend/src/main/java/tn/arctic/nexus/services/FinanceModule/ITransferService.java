package tn.arctic.nexus.services.FinanceModule;

import tn.arctic.nexus.entities.FinanceModule.Transfer;

import java.util.List;

public interface ITransferService {

    public List<Transfer> getTransfers();
    public Transfer getTransfer(Long id);
    public Transfer createTransfer(Transfer transfer);
    public Transfer updateTransfer(Transfer transfer);
    public boolean deleteTransfer(Long id);
    public Transfer CreateAffectTransferToWallet(String metamaskPublicKey, Transfer transfer);
    public List<Transfer> getTransfersByWalletPK(String metamaskPublicKey) ;

}
