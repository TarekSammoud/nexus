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

            // Enhanced HTML Email Template with Modern Design
            String content = "<!DOCTYPE html>" +
                    "<html lang=\"en\">" +
                    "<head>" +
                    "  <meta charset=\"UTF-8\">" +
                    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                    "  <style>" +
                    "    body {" +
                    "      margin: 0;" +
                    "      padding: 0;" +
                    "      font-family: 'Segoe UI', Arial, sans-serif;" +
                    "      background-color: #f4f7fa;" +
                    "      color: #333;" +
                    "      line-height: 1.6;" +
                    "    }" +
                    "    " +
                    "    .container {" +
                    "      max-width: 600px;" +
                    "      margin: 0 auto;" +
                    "      background-color: #ffffff;" +
                    "      border-radius: 16px;" +
                    "      overflow: hidden;" +
                    "      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);" +
                    "    }" +
                    "    " +
                    "    .header {" +
                    "      background: linear-gradient(135deg, #2B32B2 0%, #1488CC 100%);" +
                    "      padding: 30px 20px;" +
                    "      text-align: center;" +
                    "      position: relative;" +
                    "    }" +
                    "    " +
                    "    .header::after {" +
                    "      content: \"\";" +
                    "      position: absolute;" +
                    "      bottom: 0;" +
                    "      left: 0;" +
                    "      width: 100%;" +
                    "      height: 40px;" +
                    "      background: linear-gradient(135deg, transparent 20px, #ffffff 0) top left, linear-gradient(225deg, transparent 20px, #ffffff 0) top right;" +
                    "      background-size: 50% 100%;" +
                    "      background-repeat: no-repeat;" +
                    "    }" +
                    "    " +
                    "    .logo-container {" +
                    "      position: relative;" +
                    "      margin-bottom: 15px;" +
                    "    }" +
                    "    " +
                    "    .logo {" +
                    "      width: 110px;" +
                    "      height: 110px;" +
                    "      background-color: white;" +
                    "      border-radius: 20px;" +
                    "      padding: 10px;" +
                    "      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);" +
                    "      display: inline-block;" +
                    "    }" +
                    "    " +
                    "    .logo-glow {" +
                    "      position: absolute;" +
                    "      top: 50%;" +
                    "      left: 50%;" +
                    "      transform: translate(-50%, -50%);" +
                    "      width: 140px;" +
                    "      height: 140px;" +
                    "      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);" +
                    "      z-index: 0;" +
                    "    }" +
                    "    " +
                    "    .header h1 {" +
                    "      color: white;" +
                    "      font-size: 26px;" +
                    "      margin: 20px 0 5px;" +
                    "      text-shadow: 0 2px 4px rgba(0,0,0,0.1);" +
                    "    }" +
                    "    " +
                    "    .header p {" +
                    "      color: rgba(255, 255, 255, 0.9);" +
                    "      margin: 5px 0 0;" +
                    "      font-size: 16px;" +
                    "    }" +
                    "    " +
                    "    .content {" +
                    "      padding: 40px 30px;" +
                    "      position: relative;" +
                    "    }" +
                    "    " +
                    "    .welcome-section {" +
                    "      text-align: center;" +
                    "      margin-bottom: 35px;" +
                    "    }" +
                    "    " +
                    "    .welcome-section h2 {" +
                    "      color: #2B32B2;" +
                    "      font-size: 24px;" +
                    "      margin-top: 0;" +
                    "      margin-bottom: 15px;" +
                    "    }" +
                    "    " +
                    "    .welcome-section p {" +
                    "      font-size: 16px;" +
                    "      color: #555;" +
                    "      margin-bottom: 0;" +
                    "    }" +
                    "    " +
                    "    .support-card {" +
                    "      background-color: #f9fafc;" +
                    "      border-radius: 12px;" +
                    "      padding: 25px;" +
                    "      margin: 30px 0;" +
                    "      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);" +
                    "      border-left: 4px solid #1488CC;" +
                    "    }" +
                    "    " +
                    "    .card-header {" +
                    "      display: flex;" +
                    "      align-items: center;" +
                    "      margin-bottom: 20px;" +
                    "    }" +
                    "    " +
                    "    .icon-circle {" +
                    "      width: 50px;" +
                    "      height: 50px;" +
                    "      border-radius: 50%;" +
                    "      background: linear-gradient(135deg, #2B32B2 0%, #1488CC 100%);" +
                    "      color: white;" +
                    "      display: flex;" +
                    "      align-items: center;" +
                    "      justify-content: center;" +
                    "      font-size: 24px;" +
                    "      box-shadow: 0 4px 10px rgba(20, 136, 204, 0.3);" +
                    "      margin-right: 15px;" +
                    "    }" +
                    "    " +
                    "    .card-title {" +
                    "      flex: 1;" +
                    "    }" +
                    "    " +
                    "    .card-title h3 {" +
                    "      margin: 0 0 5px;" +
                    "      color: #2B32B2;" +
                    "      font-size: 18px;" +
                    "    }" +
                    "    " +
                    "    .card-title p {" +
                    "      margin: 0;" +
                    "      color: #666;" +
                    "      font-size: 14px;" +
                    "    }" +
                    "    " +
                    "    .status-indicator {" +
                    "      display: flex;" +
                    "      align-items: center;" +
                    "      margin-bottom: 20px;" +
                    "    }" +
                    "    " +
                    "    .status-dot {" +
                    "      width: 12px;" +
                    "      height: 12px;" +
                    "      background-color: #4CAF50;" +
                    "      border-radius: 50%;" +
                    "      margin-right: 8px;" +
                    "      position: relative;" +
                    "    }" +
                    "    " +
                    "    .status-dot::after {" +
                    "      content: \"\";" +
                    "      position: absolute;" +
                    "      top: -4px;" +
                    "      left: -4px;" +
                    "      width: 20px;" +
                    "      height: 20px;" +
                    "      background-color: rgba(76, 175, 80, 0.2);" +
                    "      border-radius: 50%;" +
                    "      animation: pulse 2s infinite;" +
                    "    }" +
                    "    " +
                    "    @keyframes pulse {" +
                    "      0% {" +
                    "        transform: scale(0.95);" +
                    "        opacity: 0.7;" +
                    "      }" +
                    "      70% {" +
                    "        transform: scale(1.1);" +
                    "        opacity: 0.3;" +
                    "      }" +
                    "      100% {" +
                    "        transform: scale(0.95);" +
                    "        opacity: 0.7;" +
                    "      }" +
                    "    }" +
                    "    " +
                    "    .status-text {" +
                    "      color: #4CAF50;" +
                    "      font-weight: 500;" +
                    "      font-size: 15px;" +
                    "    }" +
                    "    " +
                    "    .button-container {" +
                    "      text-align: center;" +
                    "      margin: 35px 0;" +
                    "      position: relative;" +
                    "    }" +
                    "    " +
                    "    .cta-button {" +
                    "      display: inline-block;" +
                    "      padding: 16px 40px;" +
                    "      background: linear-gradient(135deg, #ffffff 0%, #808080 100%);" +
                    "      color: white;" +
                    "      text-decoration: none;" +
                    "      border-radius: 50px;" +
                    "      font-weight: 600;" +
                    "      font-size: 16px;" +
                    "      position: relative;" +
                    "      z-index: 1;" +
                    "      transition: all 0.3s ease;" +
                    "      box-shadow: 0 8px 20px rgba(20, 136, 204, 0.3);" +
                    "    }" +
                    "    " +
                    "    .cta-button:hover {" +
                    "      transform: translateY(-3px);" +
                    "      box-shadow: 0 12px 25px rgba(20, 136, 204, 0.4);" +
                    "    }" +
                    "    " +
                    "    .button-container::before {" +
                    "      content: \"\";" +
                    "      position: absolute;" +
                    "      top: 50%;" +
                    "      left: 0;" +
                    "      right: 0;" +
                    "      height: 1px;" +
                    "      background: linear-gradient(to right, transparent, #e0e0e0, transparent);" +
                    "      z-index: 0;" +
                    "    }" +
                    "    " +
                    "    .tips-section {" +
                    "      background-color: #f0f8ff;" +
                    "      border-radius: 12px;" +
                    "      padding: 20px;" +
                    "      margin-top: 30px;" +
                    "    }" +
                    "    " +
                    "    .tips-header {" +
                    "      display: flex;" +
                    "      align-items: center;" +
                    "      margin-bottom: 15px;" +
                    "    }" +
                    "    " +
                    "    .tips-icon {" +
                    "      width: 30px;" +
                    "      height: 30px;" +
                    "      background-color: rgba(20, 136, 204, 0.2);" +
                    "      border-radius: 50%;" +
                    "      display: flex;" +
                    "      align-items: center;" +
                    "      justify-content: center;" +
                    "      color: #1488CC;" +
                    "      margin-right: 10px;" +
                    "      font-size: 16px;" +
                    "    }" +
                    "    " +
                    "    .tips-header h3 {" +
                    "      margin: 0;" +
                    "      color: #2B32B2;" +
                    "      font-size: 16px;" +
                    "    }" +
                    "    " +
                    "    .tips-list {" +
                    "      padding-left: 20px;" +
                    "      margin: 15px 0 5px;" +
                    "    }" +
                    "    " +
                    "    .tips-list li {" +
                    "      margin-bottom: 8px;" +
                    "      color: #555;" +
                    "      font-size: 14px;" +
                    "    }" +
                    "    " +
                    "    .footer {" +
                    "      background-color: #f9fafc;" +
                    "      padding: 25px 30px;" +
                    "      text-align: center;" +
                    "      border-top: 1px solid #eaeef3;" +
                    "    }" +
                    "    " +
                    "    .footer p {" +
                    "      color: #777;" +
                    "      font-size: 14px;" +
                    "      margin: 0 0 15px;" +
                    "    }" +
                    "    " +
                    "    .footer-links {" +
                    "      margin-bottom: 20px;" +
                    "    }" +
                    "    " +
                    "    .footer-links a {" +
                    "      color: #1488CC;" +
                    "      text-decoration: none;" +
                    "      margin: 0 12px;" +
                    "      font-size: 14px;" +
                    "      font-weight: 500;" +
                    "      transition: color 0.3s ease;" +
                    "    }" +
                    "    " +
                    "    .footer-links a:hover {" +
                    "      color: #2B32B2;" +
                    "    }" +
                    "    " +
                    "    .social-links {" +
                    "      margin-top: 20px;" +
                    "    }" +
                    "    " +
                    "    .social-button {" +
                    "      display: inline-flex;" +
                    "      align-items: center;" +
                    "      justify-content: center;" +
                    "      width: 36px;" +
                    "      height: 36px;" +
                    "      background-color: #eaeef3;" +
                    "      border-radius: 50%;" +
                    "      margin: 0 8px;" +
                    "      color: #1488CC;" +
                    "      text-decoration: none;" +
                    "      transition: all 0.3s ease;" +
                    "    }" +
                    "    " +
                    "    .social-button:hover {" +
                    "      background-color: #1488CC;" +
                    "      color: white;" +
                    "      transform: translateY(-3px);" +
                    "    }" +
                    "    " +
                    "    .disclaimer {" +
                    "      font-size: 13px;" +
                    "      color: #999;" +
                    "      margin-top: 20px;" +
                    "      line-height: 1.5;" +
                    "    }" +
                    "  </style>" +
                    "</head>" +
                    "<body>" +
                    "  <div class=\"container\">" +
                    "    <div class=\"header\">" +
                    "      <div class=\"logo-container\">" +
                    "        <div class=\"logo-glow\"></div>" +
                    "        <div class=\"logo\">" +
                    "          <img src=\"https://i.imgur.com/WyvHdvr.png\" alt=\"Nexus Logo\" style=\"width: 100%; height: 100%; object-fit: contain; border-radius: 12px;\">" +
                    "        </div>" +
                    "      </div>" +
                    "      <h1>Nexus Technical Support</h1>" +
                    "      <p>Your solution is just one click away</p>" +
                    "    </div>" +
                    "    " +
                    "    <div class=\"content\">" +
                    "      <div class=\"welcome-section\">" +
                    "        <h2>Your Support Room is Ready!</h2>" +
                    "        <p>We've created a private space for you to discuss your technical issue with our expert team.</p>" +
                    "      </div>" +
                    "      " +
                    "      <div class=\"support-card\">" +
                    "        <div class=\"card-header\">" +
                    "          <div class=\"icon-circle\">👤</div>" +
                    "          <div class=\"card-title\">" +
                    "            <h3>Your Support Specialist</h3>" +
                    "            <p>Technical expert assigned to your case</p>" +
                    "          </div>" +
                    "        </div>" +
                    "        " +
                    "        <div class=\"status-indicator\">" +
                    "          <div class=\"status-dot\"></div>" +
                    "          <div class=\"status-text\">Available now</div>" +
                    "        </div>" +
                    "        " +
                    "        <p>Our technical specialist is ready to assist you with your issue. Join your private support room to start the conversation immediately.</p>" +
                    "      </div>" +
                    "      " +
                    "      <div class=\"button-container\">" +
                    "        <a href=\"" + verificationCode + "\" class=\"cta-button\">Join Support Room</a>" +
                    "      </div>" +
                    "      " +
                    "      <div class=\"tips-section\">" +
                    "        <div class=\"tips-header\">" +
                    "          <div class=\"tips-icon\">💡</div>" +
                    "          <h3>Tips for a Productive Session</h3>" +
                    "        </div>" +
                    "        <ul class=\"tips-list\">" +
                    "          <li>Have your device details ready to help us diagnose faster</li>" +
                    "          <li>Be specific about any error messages you're seeing</li>" +
                    "          <li>Let us know what steps you've already tried</li>" +
                    "        </ul>" +
                    "      </div>" +
                    "      " +
                    "      <p class=\"disclaimer\">If you didn't request technical support, you can safely ignore this email. This link will expire in 24 hours for security purposes.</p>" +
                    "    </div>" +
                    "    " +
                    "    <div class=\"footer\">" +
                    "      <p>&copy; 2025 Nexus. All rights reserved.</p>" +
                    "      <div class=\"footer-links\">" +
                    "        <a href=\"#\">Help Center</a>" +
                    "        <a href=\"#\">Privacy Policy</a>" +
                    "        <a href=\"#\">Terms of Service</a>" +
                    "      </div>" +
                    "      <div class=\"social-links\">" +
                    "        <a href=\"#\" class=\"social-button\">𝕏</a>" +
                    "        <a href=\"#\" class=\"social-button\">in</a>" +
                    "        <a href=\"#\" class=\"social-button\">f</a>" +
                    "      </div>" +
                    "    </div>" +
                    "  </div>" +
                    "</body>" +
                    "</html>";

            helper.setText(content, true); // true = HTML content

            mailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}