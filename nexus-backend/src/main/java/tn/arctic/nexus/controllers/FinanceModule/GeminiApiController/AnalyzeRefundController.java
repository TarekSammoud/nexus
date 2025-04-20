package tn.arctic.nexus.controllers.FinanceModule.GeminiApiController;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.FinanceModule.GeminiApiModels.RefundAnalysisRequest;
import tn.arctic.nexus.entities.FinanceModule.GeminiApiModels.RefundAnalysisResponse;
import tn.arctic.nexus.services.FinanceModule.GeminiApiService.GeminiRefundAnalysisService;

@RestController
public class AnalyzeRefundController {

    @Autowired
    private  GeminiRefundAnalysisService geminiRefundAnalysisService;

    @PostMapping("/api/refund/analyzeTest/")
    public ResponseEntity<RefundAnalysisResponse> analyzeRefundRequest(@RequestBody RefundAnalysisRequest request) {
        RefundAnalysisResponse response = geminiRefundAnalysisService.analyzeRefund(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/api/refund/analyze/{refundId}")
    public ResponseEntity<RefundAnalysisResponse> analyzeRefundRequestTest(@PathVariable Long refundId) {
        RefundAnalysisRequest request = geminiRefundAnalysisService.generateRequestFromRefundId(refundId);
        RefundAnalysisResponse response = geminiRefundAnalysisService.analyzeRefund(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/api/refund/getRequestFromRefund/{refundId}")
    public RefundAnalysisRequest getRefundAnalysisRequest(@PathVariable Long refundId) {
        return geminiRefundAnalysisService.generateRequestFromRefundId(refundId);
    }

}
