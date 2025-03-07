package tn.arctic.nexus.repositories.TechnicalSupportModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.SupportAgent;

import java.util.List;

@Repository
public interface ISupportAgentRepository extends JpaRepository<SupportAgent, Long> {
    List<SupportAgent> findByDepartmentId(Long departmentId);
}