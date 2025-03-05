package tn.arctic.nexus.repositories.FinanceModule;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.FinanceModule.Wallet;

@Repository
public interface IWalletRepository extends JpaRepository<Wallet, Long> {

    Wallet findByUserId(Long userId);
}
