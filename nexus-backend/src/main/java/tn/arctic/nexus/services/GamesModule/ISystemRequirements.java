package tn.arctic.nexus.services.GamesModule;

import tn.arctic.nexus.entities.SystemRequirements;

public interface ISystemRequirements {
    public SystemRequirements addSystemRequirements(SystemRequirements sq);
    public SystemRequirements editSystemRequirements(SystemRequirements sq);
    public void deleteSystemRequirementsById(Long id);
    public SystemRequirements getSystemRequirementsById(Long id);

}
