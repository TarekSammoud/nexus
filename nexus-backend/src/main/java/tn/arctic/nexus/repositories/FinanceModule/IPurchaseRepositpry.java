package tn.arctic.nexus.repositories.FinanceModule;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.FinanceModule.Purchase;

@Repository
public interface IPurchaseRepositpry  extends JpaRepository<Purchase, Long> {
}
