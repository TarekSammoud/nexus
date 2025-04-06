package tn.arctic.nexus.repositories.UsersModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import tn.arctic.nexus.entities.ProfilePictures;
import tn.arctic.nexus.entities.User;

import java.util.Optional;

public interface IUserRepository  extends JpaRepository<User,Long> {
    //ProfilePictures findByUserId(Long id);
    User findByEmail(String email);
}
