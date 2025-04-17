package tn.arctic.nexus.services.FinanceModule;


import tn.arctic.nexus.entities.FinanceModule.Purchase;
import tn.arctic.nexus.entities.FinanceModule.Refund;
import tn.arctic.nexus.entities.FinanceModule.Transfer;

import java.util.List;

public interface IRefundService {

    public List<Refund> getRefunds();
    public Refund getRefund(Long id);
    public Refund addRefund(Refund refund);
    public Refund updateRefund(Refund refund);
    public boolean deleteRefund(Long id);
    public Refund CreateAffectRefundToPurchase(Long purchaseId, Refund refund);
    public List<Refund> getRefundsByWalletPK(String metamaskPublicKey) ;


}
