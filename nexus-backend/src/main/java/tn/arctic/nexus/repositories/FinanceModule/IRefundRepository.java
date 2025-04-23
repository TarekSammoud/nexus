package tn.arctic.nexus.repositories.FinanceModule;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.FinanceModule.Purchase;
import tn.arctic.nexus.entities.FinanceModule.Refund;
import tn.arctic.nexus.entities.FinanceModule.Transfer;

import java.util.Date;
import java.util.List;

@Repository
public interface IRefundRepository extends JpaRepository<Refund, Long> {
    List<Refund> findByPurchase_Wallet_MetamaskPublicKey(String metamaskPublicKey);
    @Query("SELECT p FROM Refund p WHERE p.createdAt >= :startDate AND p.createdAt <= :endDate")
    List<Refund> findByCreatedAtBetween(@Param("startDate") Date startDate, @Param("endDate") Date endDate);




}
