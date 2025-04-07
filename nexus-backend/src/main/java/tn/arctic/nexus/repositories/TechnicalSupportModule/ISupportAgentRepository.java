package tn.arctic.nexus.repositories.TechnicalSupportModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.SupportAgent;
import tn.arctic.nexus.entities.Departement;

import java.util.List;
import java.util.Optional;

@Repository
public interface ISupportAgentRepository extends JpaRepository<SupportAgent, Long> {
    // Fetch agents by department
    List<SupportAgent> findByDepartement(Departement departement);

    // Corrected method signature to use 'id' instead of 'supportAgentId'
    Optional<SupportAgent> findById(Long id);


}
