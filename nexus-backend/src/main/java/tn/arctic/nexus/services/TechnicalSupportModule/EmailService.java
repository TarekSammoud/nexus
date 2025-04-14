package tn.arctic.nexus.services.TechnicalSupportModule;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String toEmail, String verificationCode) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject("🛠️ Nexus — Join your Technical Support Room");

            // Beautiful HTML Email Template
            String content = "<html>" +
                    "<head>" +
                    "  <meta charset='UTF-8'>" +
                    "  <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                    "</head>" +
                    "<body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;'>" +

                    // Header with logo and wave design
                    "<div style='background-color: #1D70B8; padding: 30px 0 50px 0; text-align: center; position: relative;'>" +
                    "  <img src='https://nexus-app.com/assets/logo.jpg' alt='Nexus Logo' style='width: 120px; height: auto; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);'>" +
                    "  <div style='position: absolute; bottom: 0; left: 0; width: 100%; height: 40px; background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100'%3E%3Cpath fill='%23f9f9f9' fill-opacity='1' d='M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z'%3E%3C/path%3E%3C/svg%3E\"); background-size: cover;'></div>" +
                    "</div>" +

                    // Main content
                    "<div style='max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f9f9f9;'>" +
                    "  <div style='background-color: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);'>" +

                    // Heading and main text
                    "    <h1 style='color: #1D70B8; text-align: center; margin-top: 0; margin-bottom: 25px; font-size: 24px;'>Welcome to Nexus Technical Support!</h1>" +
                    "    <p style='color: #444444; font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>We've created a private room for you to discuss your technical issue with our support team.</p>" +

                    // Support specialist icon and text
                    "    <div style='background-color: #f0f7ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; display: flex; align-items: center;'>" +
                    "      <div style='background-color: #1D70B8; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;'>" +
                    "        <span style='color: white; font-size: 20px;'>👤</span>" +
                    "      </div>" +
                    "      <div>" +
                    "        <p style='margin: 0; color: #1D70B8; font-weight: bold;'>Your Support Specialist</p>" +
                    "        <p style='margin: 5px 0 0 0; font-size: 14px; color: #555555;'>Available to assist you immediately when you join</p>" +
                    "      </div>" +
                    "    </div>" +

                    // CTA Button
                    "    <div style='text-align: center; margin: 30px 0;'>" +
                    "      <a href='" + verificationCode + "' style='display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #1D70B8 0%, #1558a0 100%); color: #FFFFFF; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; transition: all 0.3s; box-shadow: 0 4px 10px rgba(29, 112, 184, 0.3);'>Join Support Room</a>" +
                    "    </div>" +

                    // Additional info
                    "    <div style='background-color: #f9f9f9; border-left: 4px solid #1D70B8; padding: 15px; margin-top: 30px;'>" +
                    "      <p style='margin: 0; color: #666666; font-size: 14px;'>If you didn't request this support, you can safely ignore this email.</p>" +
                    "    </div>" +
                    "  </div>" +

                    // Footer
                    "  <div style='text-align: center; padding: 20px 0; margin-top: 30px;'>" +
                    "    <p style='color: #888888; font-size: 14px; margin: 5px 0;'>Nexus Support Team</p>" +
                    "    <div style='margin-top: 10px;'>" +
                    "      <a href='#' style='color: #1D70B8; text-decoration: none; margin: 0 10px; font-size: 13px;'>Help Center</a> | " +
                    "      <a href='#' style='color: #1D70B8; text-decoration: none; margin: 0 10px; font-size: 13px;'>Privacy Policy</a> | " +
                    "      <a href='#' style='color: #1D70B8; text-decoration: none; margin: 0 10px; font-size: 13px;'>Terms of Service</a>" +
                    "    </div>" +
                    "    <p style='color: #888888; font-size: 12px; margin-top: 15px;'>&copy; 2025 Nexus. All rights reserved.</p>" +
                    "  </div>" +
                    "</div>" +
                    "</body></html>";

            helper.setText(content, true); // true = HTML content

            mailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}