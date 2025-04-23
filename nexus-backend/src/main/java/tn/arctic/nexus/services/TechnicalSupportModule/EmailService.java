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

    public void sendVerificationEmail(String toEmail, String verificationCode, String analysisResult) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject("🛠️ Nexus — Join your Technical Support Room");

            // Extract just the text content from the JSON structure
            String cleanedAnalysis = cleanAiResponse(analysisResult);

            String content = "<html>" +
                    "<head>" +
                    "<meta charset='UTF-8'>" +
                    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                    "</head>" +
                    "<body style='font-family: \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fb; margin: 0; padding: 20px;'>" +

                    "<div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);'>" +

                    "<div style='padding: 30px 40px; text-align: center; background-color: #1a2942; color: white;'>" +
                    "<h1 style='margin: 0; font-weight: 600; font-size: 24px;'>Welcome to Nexus Technical Support</h1>" +
                    "</div>" +

                    "<div style='padding: 35px 40px;'>" +
                    "<p style='font-size: 16px; line-height: 1.6; color: #333; margin-top: 0;'>" +
                    "We've created a private room for you to discuss your technical issue with our support team." +
                    "</p>" +

                    "<div style='margin: 30px 0; padding: 25px; background-color: #f8f9fb; border-left: 4px solid #3b6ecc; border-radius: 6px;'>" +
                    "<h3 style='color: #3b6ecc; margin-top: 0; font-size: 18px;'>AI Assistant Analysis:</h3>" +
                    "<p style='color: #444; font-size: 15px; line-height: 1.6; margin-bottom: 0;'>" + cleanedAnalysis + "</p>" +
                    "</div>" +

                    "<div style='text-align: center; margin: 35px 0;'>" +
                    "<a href='" + verificationCode + "' style='display: inline-block; background-color: #3b6ecc; color: #ffffff; font-weight: 600; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-size: 16px; transition: background 0.3s;'>Join Human Support Room</a>" +
                    "</div>" +

                    "<p style='font-size: 14px; color: #777; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;'>" +
                    "If you didn't request this support, please ignore this email." +
                    "</p>" +
                    "</div>" +

                    "<div style='background-color: #f8f9fb; padding: 20px; text-align: center; border-top: 1px solid #eee;'>" +
                    "<p style='margin: 0; color: #999; font-size: 13px;'>© 2025 Nexus Technical Support. All rights reserved.</p>" +
                    "</div>" +

                    "</div>" +
                    "</body></html>";

            helper.setText(content, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    /**
     * Cleans the AI response by removing JSON structure wrapper
     * Specifically handles the pattern: {"generated_text":[{"generated_text":"..."}]}
     *
     * @param jsonResponse The raw response from the AI system
     * @return Clean text without JSON formatting
     */
    private String cleanAiResponse(String jsonResponse) {
        try {
            // Handle the specific pattern in the example
            if (jsonResponse.contains("{\"generated_text\":[{\"generated_text\":")) {
                // Find where the actual content starts after the JSON prefix
                int startIndex = jsonResponse.indexOf("\"generated_text\":[{\"generated_text\":\"");
                if (startIndex >= 0) {
                    startIndex += 32; // Length of the prefix to skip

                    // Find where the content ends
                    int endIndex = jsonResponse.lastIndexOf("\"}]}");
                    if (endIndex > startIndex) {
                        // Extract just the content between the JSON markers
                        return jsonResponse.substring(startIndex, endIndex)
                                .replace("\\n", "<br>")  // Convert newlines to HTML breaks
                                .replace("\\\"", "\"");  // Handle escaped quotes
                    }
                }
            }

            // Handle simpler JSON format if present
            if (jsonResponse.contains("{\"generated_text\":\"")) {
                int startIndex = jsonResponse.indexOf("{\"generated_text\":\"");
                if (startIndex >= 0) {
                    startIndex += 18; // Skip past "{\"generated_text\":\""
                    int endIndex = jsonResponse.lastIndexOf("\"}");
                    if (endIndex > startIndex) {
                        return jsonResponse.substring(startIndex, endIndex)
                                .replace("\\n", "<br>")
                                .replace("\\\"", "\"");
                    }
                }
            }

            // Fallback if the patterns don't match exactly
            return jsonResponse
                    .replaceAll("\\{\"generated_text\":\\[\\{\"generated_text\":\"", "")
                    .replaceAll("\"}]}", "")
                    .replaceAll("\\{\"generated_text\":\"", "")
                    .replaceAll("\"\\}", "")
                    .replace("\\n", "<br>")
                    .replace("\\\"", "\"")
                    .trim();
        } catch (Exception e) {
            // If any error occurs during parsing, return a cleaned version or the original
            System.err.println("Error cleaning AI response: " + e.getMessage());
            return jsonResponse;
        }
    }
}