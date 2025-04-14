package tn.arctic.nexus.repositories.TechnicalSupportModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.UserVerification;

public interface IUserVerificationRepository  extends JpaRepository<UserVerification, Long> {
    UserVerification findByEmail(String email);
}
