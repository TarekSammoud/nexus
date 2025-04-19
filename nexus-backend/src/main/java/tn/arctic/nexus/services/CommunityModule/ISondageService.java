package tn.arctic.nexus.services.CommunityModule;

import tn.arctic.nexus.entities.Sondage;

import java.util.List;
import java.util.Optional;

public interface ISondageService {

    Sondage createSondage(Sondage sondage);
    List<Sondage> getAllSondages();
    Optional<Sondage> getSondageById(Long id);
    void deleteSondage(Long id);


   Sondage startLive(Long id, String liveUrl);

    }
