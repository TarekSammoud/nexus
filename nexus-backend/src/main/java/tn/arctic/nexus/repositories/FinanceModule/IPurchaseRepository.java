package tn.arctic.nexus.repositories.FinanceModule;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.FinanceModule.Purchase;

import java.util.Date;
import java.util.List;

@Repository
public interface IPurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByWallet_MetamaskPublicKey(String metamaskPublicKey );
    @Query("SELECT p FROM Purchase p WHERE p.createdAt >= :startDate AND p.createdAt <= :endDate")
    List<Purchase> findByCreatedAtBetween(@Param("startDate") Date startDate, @Param("endDate") Date endDate);


}
