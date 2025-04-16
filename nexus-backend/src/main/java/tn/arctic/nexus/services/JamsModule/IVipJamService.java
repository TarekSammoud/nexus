package tn.arctic.nexus.services.JamsModule;

import tn.arctic.nexus.entities.VipJam;

import java.util.List;

public interface IVipJamService {
    VipJam createVipJam(VipJam vipJam);
    List<VipJam> getAllVipJams();

    void deleteVipJam(Long id);

    VipJam updateVipJam(Long id, VipJam vipJam);

}
