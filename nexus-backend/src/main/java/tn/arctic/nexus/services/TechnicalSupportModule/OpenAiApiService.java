/*
package tn.arctic.nexus.services.TechnicalSupportModule;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OpenAiApiService implements IOpenAiApiService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final String API_URL = "https://api.openai.com/v1/chat/completions";

    @Override
    public String getChatGptResponse(String prompt) {
        // Initialize RestTemplate for making HTTP requests
        RestTemplate restTemplate = new RestTemplate();

        // Correctly format the request body as JSON
        String requestBody = "{\n" +
                "  \"model\": \"gpt-3.5-turbo\",\n" +
                "  \"messages\": [\n" +
                "    {\"role\": \"user\", \"content\": \"" + prompt.replace("\"", "\\\"") + "\"}\n" +
                "  ]\n" +
                "}";

        // Set up the HTTP headers, including authorization with the API key
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Wrap the request body and headers into an HttpEntity
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        try {
            // Send the POST request to OpenAI API endpoint and capture the response
            ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, entity, String.class);

            // Check if the response status is OK (200)
            if (response.getStatusCode() == HttpStatus.OK) {
                String responseBody = response.getBody(); // Response body (JSON string)
                return parseResponse(responseBody); // Parse the response and return it
            } else {
                // If response is not OK, return the error status code and message
                return "Error: " + response.getStatusCode() + " - " + response.getBody();
            }

        } catch (Exception e) {
            // Catch any exceptions (e.g., network issues) and return the error message
            return "Error calling OpenAI API: " + e.getMessage();
        }
    }

    // Helper method to parse the JSON response from OpenAI API
    private String parseResponse(String responseBody) {
        try {
            // Use Jackson ObjectMapper to parse the response
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseBody);

            // Extract the actual response from the 'choices' field in the JSON response
            JsonNode messageNode = rootNode.path("choices").get(0).path("message").path("content");

            // Return the message content (the response from ChatGPT)
            return messageNode.asText();
        } catch (Exception e) {
            // Handle any parsing issues and return an error message
            return "Error parsing response: " + e.getMessage();
        }
    }
}
*/
