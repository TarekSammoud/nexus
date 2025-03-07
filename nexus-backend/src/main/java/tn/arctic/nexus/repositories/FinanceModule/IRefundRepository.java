package tn.arctic.nexus.repositories.FinanceModule;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.FinanceModule.Refund;

@Repository
public interface IRefundRepository extends JpaRepository<Refund, Long> {


}
