package tn.arctic.nexus.services.JamsModule;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tn.arctic.nexus.entities.VipJam;
import tn.arctic.nexus.repositories.JamsModule.IVipJamRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class VipJamService implements IVipJamService {

    private final IVipJamRepository vipJamRepository;

    @Autowired
    public VipJamService(IVipJamRepository vipJamRepository) {
        this.vipJamRepository = vipJamRepository;
    }

    @Override
    public void deleteVipJam(Long id) {
        vipJamRepository.deleteById(id);
    }

    @Override
    public VipJam createVipJam(VipJam vipJam) {
        return applyAIStylingAndSave(vipJam);
    }

    @Override
    public VipJam updateVipJam(Long id, VipJam updatedVipJam) {
        if (!vipJamRepository.existsById(id)) {
            throw new RuntimeException("VIP Jam not found with ID: " + id);
        }
        updatedVipJam.setId(id);
        return applyAIStylingAndSave(updatedVipJam);
    }

    @Override
    public List<VipJam> getAllVipJams() {
        return vipJamRepository.findAll();
    }

    private VipJam applyAIStylingAndSave(VipJam vipJam) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "http://localhost:5001/style";

            Map<String, String> payload = new HashMap<>();
            payload.put("title", vipJam.getName());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map style = response.getBody();
                vipJam.setPrimaryColor((String) style.get("primary_color"));
                vipJam.setFont((String) style.get("font"));
                vipJam.setBannerType((String) style.get("banner_type"));
            }
        } catch (Exception e) {
            System.out.println("⚠️ Failed to fetch style from AI service: " + e.getMessage());
        }

        return vipJamRepository.save(vipJam);
    }
}
