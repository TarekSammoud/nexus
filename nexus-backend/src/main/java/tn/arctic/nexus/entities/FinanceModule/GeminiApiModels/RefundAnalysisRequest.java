package tn.arctic.nexus.entities.FinanceModule.GeminiApiModels;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RefundAnalysisRequest {
    private String gameID;
    private String userProvidedReason;
    private String gameReviewsSummary;
    private Integer userRefundHistory;
    private Integer refundsAccepted;
    private Integer userPurchaseHistory;
    private String timeSincePurchase;
    private String platformRefundPolicy;

}
