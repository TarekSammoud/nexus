package tn.arctic.nexus.repositories.CommunityModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.Report;

import java.util.List;

@Repository

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByStatus(String status);

}
