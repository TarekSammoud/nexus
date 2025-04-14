package tn.arctic.nexus.services.TechnicalSupportModule;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.UserVerification;
import tn.arctic.nexus.repositories.TechnicalSupportModule.IUserVerificationRepository;

@Service
public class VerificationService {

    @Autowired
    private IUserVerificationRepository verificationRepository;

    public boolean verifyCode(String email, String code) {
        UserVerification userVerification = verificationRepository.findByEmail(email);
        if (userVerification != null && userVerification.getVerificationCode().equals(code)) {
            // Verification successful
            return true;
        }
        // Verification failed
        return false;
    }
}
