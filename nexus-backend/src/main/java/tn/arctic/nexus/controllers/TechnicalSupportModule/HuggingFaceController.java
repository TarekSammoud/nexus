package tn.arctic.nexus.controllers.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.services.TechnicalSupportModule.AIService;

@RestController
@RequestMapping("/api/hf")
public class HuggingFaceController {

    @Autowired
    private AIService huggingFaceService;

    @PostMapping("/analyze")
    public String analyze(@RequestBody AnalyzeRequest req) {
        return huggingFaceService.analyzeText(req.getText());
    }

    // Request body model
    public static class AnalyzeRequest {
        private String text;

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
    }
}