package tn.arctic.nexus.services.GamesModule;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.Map;

import org.springframework.web.client.RestTemplate;

@Service
public class SpamCheckService implements ISpamCheckService{

    @Override
    public Map<String,Object> checkReview(String reviewText) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://98.66.228.138:5001/predict";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String body = String.format("{\"text\":\"%s\"}", reviewText.replace("\"", "\\\""));
        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                url, HttpMethod.POST, request, Map.class
        );

        return response.getBody();  // returns "OR" or "CG"
    }
}
