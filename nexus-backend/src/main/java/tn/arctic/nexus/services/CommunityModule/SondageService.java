package tn.arctic.nexus.services.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Sondage;
import tn.arctic.nexus.repositories.CommunityModule.SondageRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SondageService implements ISondageService {

    @Autowired
    private SondageRepository sondageRepository;

    public Sondage createSondage(Sondage sondage) {
        sondage.setActive(true);
        return sondageRepository.save(sondage);
    }

    public List<Sondage> getAllSondages() {
        return sondageRepository.findAll();
    }

    public Optional<Sondage> getSondageById(Long id) {
        return sondageRepository.findById(id);
    }

    public void deleteSondage(Long id) {
        sondageRepository.deleteById(id);
    }


    public Sondage startLive(Long id, String liveUrl) {
        Sondage sondage = sondageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sondage non trouvé avec id : " + id));

        sondage.setLiveUrl(liveUrl);
        return sondageRepository.save(sondage);
    }
}