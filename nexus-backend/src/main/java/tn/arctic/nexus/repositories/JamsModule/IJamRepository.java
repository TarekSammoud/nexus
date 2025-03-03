package tn.arctic.nexus.repositories.JamsModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.Jam;

import java.util.List;

@Repository
public interface IJamRepository extends JpaRepository<Jam, Long> {
    List<Jam> findByUserId(Long userId);

    List<Jam> findByDevStartDateAfter(java.time.LocalDateTime date);

    List<Jam> findByVoteStartDateBeforeAndVoteEndDateAfter(java.time.LocalDateTime now1, java.time.LocalDateTime now2);

}


