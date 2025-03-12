package tn.arctic.nexus.repositories.UsersModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.BlockList;

public interface IBlockListRepository extends JpaRepository<BlockList,Long> {
}
