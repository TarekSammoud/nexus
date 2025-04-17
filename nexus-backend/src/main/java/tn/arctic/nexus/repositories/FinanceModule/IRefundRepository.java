package tn.arctic.nexus.repositories.FinanceModule;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.FinanceModule.Refund;
import tn.arctic.nexus.entities.FinanceModule.Transfer;

import java.util.List;

@Repository
public interface IRefundRepository extends JpaRepository<Refund, Long> {
    List<Refund> findByPurchase_Wallet_MetamaskPublicKey(String metamaskPublicKey);



}
