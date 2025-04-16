package tn.arctic.nexus.services.FinanceModule;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.FinanceModule.Reward;
import tn.arctic.nexus.repositories.FinanceModule.IRewardRepository;

import java.util.List;

@Service
public class RewardService implements IRewardService {

    @Autowired
    IRewardRepository iRewardRepository;

    @Override
    public List<Reward> getRewards() {
        return iRewardRepository.findAll();
    }

    @Override
    public Reward getReward(Long id) {
        return iRewardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid reward id: " + id));
    }

    @Override
    public Reward addReward(Reward reward) {
        return iRewardRepository.save(reward);
    }

    @Override
    public Reward updateReward(Reward reward) {
        return iRewardRepository.save(reward);
    }

    @Override
    public boolean deleteReward(Long id) {
        if (iRewardRepository.existsById(id)) {
            iRewardRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
