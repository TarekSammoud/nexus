package tn.arctic.nexus.repositories.UsersModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.Notification;
import tn.arctic.nexus.entities.Role;

public interface IRoleRepository extends JpaRepository<Role,Long> {
}
