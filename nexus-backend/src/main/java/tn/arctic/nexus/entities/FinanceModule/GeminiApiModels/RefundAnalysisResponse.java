package tn.arctic.nexus.entities.FinanceModule.GeminiApiModels;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RefundAnalysisResponse {

    private String decision;
    private String justification;
}


