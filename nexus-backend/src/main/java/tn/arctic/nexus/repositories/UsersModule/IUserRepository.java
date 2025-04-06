package tn.arctic.nexus.repositories.UsersModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.User;

public interface IUserRepository  extends JpaRepository<User,Long> {
}
