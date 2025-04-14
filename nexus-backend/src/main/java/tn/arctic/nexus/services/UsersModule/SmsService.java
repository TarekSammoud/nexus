package tn.arctic.nexus.services.UsersModule;

import okhttp3.OkHttpClient;
import org.springframework.stereotype.Service;
import okhttp3.*;

import java.io.IOException;

@Service
public class SmsService {
    private static final String SMS_API_URL = "https://api.webexinteract.com/v1/sms";
    private static final String ACCESS_TOKEN = "aky_2vjaU9CNxlAP5YFOjWlT5XVwntl"; // Sécuriser plus tard
    private static final String SENDER_ID = "NEXUS_APP";

    public void sendSMS(String phoneNumber, String message) {
        OkHttpClient client = new OkHttpClient();

        String json = "{\n" +
                "  \"message_body\": \"" + message + "\",\n" +
                "  \"from\": \"" + SENDER_ID + "\",\n" +
                "  \"to\": [\n" +
                "    {\n" +
                "      \"phone_number\": \"" + phoneNumber + "\"\n" +
                "    }\n" +
                "  ]\n" +
                "}";

        RequestBody body = RequestBody.create(json, MediaType.parse("application/json"));

        Request request = new Request.Builder()
                .url(SMS_API_URL)
                .post(body)
                .addHeader("accept", "application/json")
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "Bearer " + ACCESS_TOKEN)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Erreur SMS : " + response.body().string());
            }
            System.out.println("✅ SMS envoyé : " + response.body().string());
        } catch (IOException e) {
            throw new RuntimeException("Erreur SMS : " + e.getMessage());
        }
    }
}
