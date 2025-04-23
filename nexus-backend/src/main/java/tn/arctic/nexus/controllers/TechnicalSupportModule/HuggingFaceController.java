package tn.arctic.nexus.controllers.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.AnalyzeRequest;
import tn.arctic.nexus.services.TechnicalSupportModule.AIService;

@RestController
@RequestMapping("/api/hf")
public class HuggingFaceController {

    @Autowired
    private AIService aiService;

    @PostMapping("/analyze")
    public String analyze(@RequestBody AnalyzeRequest req) {
        return aiService.analyzeText(req.getText());
    }

    // Request body model

}