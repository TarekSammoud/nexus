package tn.arctic.nexus.controllers.FinanceModule.GeminiApiController;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.Config.JwtUtil;
import tn.arctic.nexus.entities.FinanceModule.GeminiApiModels.RefundAnalysisRequest;
import tn.arctic.nexus.entities.FinanceModule.GeminiApiModels.RefundAnalysisResponse;
import tn.arctic.nexus.services.FinanceModule.GeminiApiService.GeminiRefundAnalysisService;
import tn.arctic.nexus.services.TechnicalSupportModule.EmailService;

@RestController
public class AnalyzeRefundController {

    @Autowired
    private  GeminiRefundAnalysisService geminiRefundAnalysisService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/api/refund/analyzeTest/")
    public ResponseEntity<RefundAnalysisResponse> analyzeRefundRequest(@RequestBody RefundAnalysisRequest request) {
        RefundAnalysisResponse response = geminiRefundAnalysisService.analyzeRefund(request);
        emailService.sendRefundEmail("hamdounisabri2@gmail.com",response);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/api/refund/analyze/{refundId}")
    public ResponseEntity<RefundAnalysisResponse> analyzeRefundRequestTest(@PathVariable Long refundId,@RequestParam String email) {
        RefundAnalysisRequest request = geminiRefundAnalysisService.generateRequestFromRefundId(refundId);
        RefundAnalysisResponse response = geminiRefundAnalysisService.analyzeRefund(request);
        emailService.sendRefundEmail(email,response);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/api/refund/getRequestFromRefund/{refundId}")
    public RefundAnalysisRequest getRefundAnalysisRequest(@PathVariable Long refundId) {
        return geminiRefundAnalysisService.generateRequestFromRefundId(refundId);
    }

}
