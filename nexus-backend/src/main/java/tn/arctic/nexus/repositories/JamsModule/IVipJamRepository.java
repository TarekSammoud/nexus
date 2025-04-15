package tn.arctic.nexus.repositories.JamsModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.VipJam;

@Repository
public interface IVipJamRepository extends JpaRepository<VipJam, Long >{
}
