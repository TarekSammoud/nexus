package tn.arctic.nexus.repositories.JamsModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.Jam;

import java.util.Date;
import java.util.List;

@Repository
public interface IJamRepository extends JpaRepository<Jam, Long> {
    List<Jam> findByUserId(Long userId);

    List<Jam> findByDevStartDateAfter(Date date);

    List<Jam> findByVoteStartDateBeforeAndVoteEndDateAfter(Date now1, Date now2);
}
