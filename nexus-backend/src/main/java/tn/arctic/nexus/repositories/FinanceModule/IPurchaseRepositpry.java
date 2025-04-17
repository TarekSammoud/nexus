package tn.arctic.nexus.repositories.FinanceModule;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.FinanceModule.Payment;
import tn.arctic.nexus.entities.FinanceModule.Purchase;
import tn.arctic.nexus.entities.FinanceModule.Transfer;

import java.util.List;

@Repository
public interface IPurchaseRepositpry  extends JpaRepository<Purchase, Long> {
    List<Purchase> findByWallet_MetamaskPublicKey(String metamaskPublicKey );


}
