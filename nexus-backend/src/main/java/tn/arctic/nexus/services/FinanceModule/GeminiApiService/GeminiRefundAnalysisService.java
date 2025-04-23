package tn.arctic.nexus.services.FinanceModule.GeminiApiService;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tn.arctic.nexus.entities.FinanceModule.GeminiApiModels.RefundAnalysisRequest;
import tn.arctic.nexus.entities.FinanceModule.GeminiApiModels.RefundAnalysisResponse;
import tn.arctic.nexus.entities.FinanceModule.Purchase;
import tn.arctic.nexus.entities.FinanceModule.Refund;
import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.services.FinanceModule.PurchaseService;
import tn.arctic.nexus.services.FinanceModule.RefundService;
import tn.arctic.nexus.services.GamesModule.GameService;

import java.io.IOException;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GeminiRefundAnalysisService {

    private String geminiApiKey="AIzaSyCWFDpVKLuI47-eNX5a9sRus3Ts7oBb1yQ";

    private final String geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    @Autowired
    private RefundService refundService;
    @Autowired
    private GameService gameService;
    @Autowired
    private PurchaseService purchaseService;

    public GeminiRefundAnalysisService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public RefundAnalysisResponse analyzeRefund(RefundAnalysisRequest request) {
        String prompt = buildGeminiPrompt(request);
        String geminiResponse = callGeminiApi(prompt);
        return parseGeminiResponse(geminiResponse);
    }

    private String buildGeminiPrompt(RefundAnalysisRequest request) {
        return "You are a refund analyst for a gaming platform. Your task is to analyze refund requests objectively and decide whether to approve or reject them, replying directly and politely to the user requesting the refund.\n\n" +
                "Instructions:\n" +
                "- Base your decision strictly on objective and professional criteria: user playtime, refund history (including both the number of refunds requested and the number of refunds accepted), purchase history, time since purchase, game reviews, and the platform's refund policy.\n" +
                "- Do NOT consider any sentimental, emotional, personal, or tragic reasons provided by the user.\n" +
                "- If a user has a rich purchase history (many past purchases) and one or no past refunds (requested or accepted), you should approve their refund as a gesture of loyalty, even if their request is slightly outside the standard policy.\n" +
                "- If a user has a very low number of accepted refunds and their case aligns with the platform's refund policy, you should approve the refund with minimal hesitation.\n" +
                "- Always consider the proportion between the number of purchases and the number of refund requests; for example, it is not reasonable for a user with 10 purchases to have 7 to 9 refund requests. Such cases may indicate potential abuse and must be scrutinized strictly.\n" +
                "- For other users, only approve the refund if it strictly aligns with the platform’s policy and these objective criteria.\n" +
                "- Focus on whether the reason aligns with common complaints or legitimate issues reflected in the game reviews, or if it seems to be a personal preference or potential abuse of the refund system.\n" +
                "- Respond politely and professionally, as if speaking directly to the user.\n\n" +
                "Refund Request Details:\n" +
                "Game ID: " + request.getGameID() + "\n" +
                "User-Provided Reason: " + request.getUserProvidedReason() + "\n" +
                "Game Reviews (Summary or Top Positive/Negative): " + request.getGameReviewsSummary() + "\n" +
                "User Refund History (the total of the refunds requested by the user): " + request.getUserRefundHistory() + " past refunds\n" +
                "User Refunds accepted (the total of the refunds accepted to the user): " + request.getRefundsAccepted() + " past refunds\n" +
                "User Purchase History: " + request.getUserPurchaseHistory() + " past purchases\n" +
                "Time Since Purchase: " + request.getTimeSincePurchase() + "\n" +
                "Platform Refund Policy: " + request.getPlatformRefundPolicy() + "\n\n" +
                "Please reply in this exact JSON format:\n" +
                "{\n" +
                "  \"decision\": \"APPROVED\" or \"REJECTED\",\n" +
                "  \"justification\": \"Your justification here.\"\n" +
                "}";
    }
    private String callGeminiApi(String prompt) {
        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(Map.of("text", prompt)));
        requestBody.put("contents", List.of(content));

        String url = geminiApiUrl + geminiApiKey;
        try {
            return restTemplate.postForObject(url, requestBody, String.class);
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"candidates\": [{\"content\": {\"parts\": [{\"text\": \"Error calling Gemini API\"}]}}] }"; // Dummy error response
        }
    }

    private RefundAnalysisResponse parseGeminiResponse(String geminiResponse) {
        try {
            JsonNode root = objectMapper.readTree(geminiResponse);
            if (root.has("candidates") && root.get("candidates").isArray() && root.get("candidates").size() > 0) {
                JsonNode candidate = root.get("candidates").get(0);
                if (candidate.has("content") && candidate.get("content").has("parts") && candidate.get("content").get("parts").isArray() && candidate.get("content").get("parts").size() > 0) {
                    String fullResponse = candidate.get("content").get("parts").get(0).get("text").asText();
                    // Try to extract JSON from the fullResponse
                    int start = fullResponse.indexOf("{");
                    int end = fullResponse.lastIndexOf("}");
                    if (start != -1 && end != -1 && end > start) {
                        String jsonString = fullResponse.substring(start, end + 1);
                        JsonNode data = objectMapper.readTree(jsonString);
                        String decision = data.has("decision") ? data.get("decision").asText() : "Error";
                        String justification = data.has("justification") ? data.get("justification").asText() : "Justification not found.";
                        return new RefundAnalysisResponse(decision, justification);
                    } else {
                        return new RefundAnalysisResponse("Error", "Could not find JSON in Gemini response.");
                    }
                }
            }
            return new RefundAnalysisResponse("Error", "Unexpected Gemini response format.");
        } catch (IOException e) {
            e.printStackTrace();
            return new RefundAnalysisResponse("Error", "Error parsing Gemini response.");
        }
    }


    /// create request
    public RefundAnalysisRequest generateRequestFromRefundId(Long refundID) {
        RefundAnalysisRequest request = new RefundAnalysisRequest();
        Refund refund = refundService.getRefund(refundID);
        if (refund == null) throw new RuntimeException("Refund not found for id " + refundID);
        if (refund.getPurchase() == null) throw new RuntimeException("Purchase is null for refund " + refundID);

        ///game name
        Game game = gameService.getGameById(refund.getPurchase().getProductId());
        if (game == null) throw new RuntimeException("Game not found for id " + refund.getPurchase().getProductId());
        request.setGameID(game.getName());        ///Refund Reason
        request.setUserProvidedReason(refund.getReason());
        ///Game Reviews
        request.setGameReviewsSummary("no reviews"); // add after merge
        /// Refund History
        String wallet = refund.getPurchase().getWallet().getMetamaskPublicKey();
        List<Refund> userRefunds = refundService.getRefundsByWalletPK(wallet);
        request.setUserRefundHistory(userRefunds != null ? userRefunds.size() : 0);
        /// Refund accepted
        int acceptedRefunds = 0;
        if (userRefunds != null) {
            acceptedRefunds = (int) userRefunds.stream()
                    .filter(r -> "Accepted".equals(r.getStatus()))
                    .count();
        }
        request.setRefundsAccepted(acceptedRefunds);
        /// Purchase History
        List<Purchase> userPurchases = purchaseService.getPurchasesByWalletPK(wallet);
        request.setUserPurchaseHistory(userPurchases != null ? userPurchases.size() : 0);
        ///time since purchase
        Date purchaseDate = refund.getPurchase().getCreatedAt();
        Instant purchaseInstant = purchaseDate.toInstant();
        Instant nowInstant = Instant.now();

        Duration duration = Duration.between(purchaseInstant, nowInstant);
        long totalHours = duration.toHours();
        long days = totalHours / 24;
        long hours = totalHours % 24;

        String timeSincePurchase = days + " days, " + hours + " hours";
        System.out.println("////////////////////////// :"+timeSincePurchase);
        request.setTimeSincePurchase(timeSincePurchase);
        /// refund policy
        request.setPlatformRefundPolicy("Refunds are generally accepted within 7 days of purchase, especially for technical issues or if the game is significantly different from expectations. Exceptions may be considered on a case-by-case basis");

        return request;
    }
}
