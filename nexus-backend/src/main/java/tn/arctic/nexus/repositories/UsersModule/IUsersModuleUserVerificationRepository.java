package tn.arctic.nexus.repositories.UsersModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.UserVerification;

public interface IUsersModuleUserVerificationRepository extends JpaRepository<UserVerification, Long> {
    UserVerification findByEmail(String email);
}