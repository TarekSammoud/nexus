package tn.arctic.nexus.services.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@Service
public class AIService {

    @Autowired
    private SupportTicketService supportTicketService;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String FASTAPI_URL = "http://localhost:8000/analyze";  // or the actual URL of your FastAPI endpoint

    public String analyzeText(String inputText) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> payload = new HashMap<>();
        String texto = "As a customer support agent, please carefully read and respond to the following inquiry with clear instructions on the steps the user should take. The user has reported an issue regarding a ban on their account and the support process. Here is the user's query: " + inputText;

        payload.put("text", texto);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(FASTAPI_URL, request, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            throw new RuntimeException("Erreur FastAPI: " + response.getStatusCodeValue() + " - " + response.getBody());
        }


    }
}