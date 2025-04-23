package tn.arctic.nexus.services.TechnicalSupportModule;

import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class AIService {

    private static final String API_URL = "https://api-inference.huggingface.co/models/databricks/dolly-v2-3b";
    private static final String API_TOKEN = "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"; // Replace with your real token

    public String analyzeText(String text) {
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(API_URL))
                    .header("Authorization", "Bearer " + API_TOKEN)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString("{\"inputs\":\"" + text + "\"}"))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch (Exception e) {
            return "{\"error\": \"" + e.getMessage() + "\"}";
        }
    }
}
