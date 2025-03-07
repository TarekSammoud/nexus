package tn.arctic.nexus.repositories.FinanceModule;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.FinanceModule.transfer;

@Repository
public interface ITransferRepository extends JpaRepository<transfer, Long> {
}
