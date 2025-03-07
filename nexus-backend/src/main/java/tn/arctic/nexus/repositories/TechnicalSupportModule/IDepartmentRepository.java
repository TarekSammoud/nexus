package tn.arctic.nexus.repositories.TechnicalSupportModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.Department;

@Repository
public interface IDepartmentRepository extends JpaRepository<Department, Long> {
}