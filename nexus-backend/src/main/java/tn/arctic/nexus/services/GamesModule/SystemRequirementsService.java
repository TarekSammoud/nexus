package tn.arctic.nexus.services.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.SystemRequirements;
import tn.arctic.nexus.repositories.GamesModule.ISystemRequirementsRepository;

@Service
public class SystemRequirementsService implements ISystemRequirements {

    @Autowired
    ISystemRequirementsRepository systemRequirementsRepository;

    @Override
    public SystemRequirements addSystemRequirements(SystemRequirements sq) {
        return systemRequirementsRepository.save(sq);
    }

    @Override
    public SystemRequirements editSystemRequirements(SystemRequirements sq) {
        return systemRequirementsRepository.save(sq);
    }

    @Override
    public void deleteSystemRequirementsById(Long id) {
        systemRequirementsRepository.deleteById(id);
    }

    @Override
    public SystemRequirements getSystemRequirementsById(Long id) {
        return systemRequirementsRepository.findById(id).orElse(null);
    }
}
