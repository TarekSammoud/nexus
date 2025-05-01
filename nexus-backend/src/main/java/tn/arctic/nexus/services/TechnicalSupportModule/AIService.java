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
    private final String FASTAPI_URL = "http://support-ai.ai.svc.cluster.local:5002/analyze"; // update as needed

    public String analyzeText(String inputText) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> payload = new HashMap<>();

        payload.put("text", inputText);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(FASTAPI_URL, request, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            throw new RuntimeException("Erreur FastAPI: " + response.getStatusCodeValue() + " - " + response.getBody());
        }


    }
}