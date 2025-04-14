package tn.arctic.nexus;

import static org.mockito.Mockito.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import tn.arctic.nexus.services.TechnicalSupportModule.EmailService;

@SpringBootTest
public class EmailServiceTest {

    @Autowired
    private EmailService emailService;

    @Test
    public void testSendVerificationEmail() {


        String email = "abdouhanafi090@gmail.com";
        String code = "ABC123";

        emailService.sendVerificationEmail(email, code);


    }
}

