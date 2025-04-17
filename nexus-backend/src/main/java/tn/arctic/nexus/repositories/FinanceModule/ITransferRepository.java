package tn.arctic.nexus.repositories.FinanceModule;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.FinanceModule.Purchase;
import tn.arctic.nexus.entities.FinanceModule.Transfer;

import java.util.List;

@Repository
public interface ITransferRepository extends JpaRepository<Transfer, Long> {
    List<Transfer> findByWallet_MetamaskPublicKey(String metamaskPublicKey );

}
