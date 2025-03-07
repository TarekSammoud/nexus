package tn.arctic.nexus.services.FinanceModule;

import tn.arctic.nexus.entities.FinanceModule.Reward;

import java.util.List;

public interface IRewardService {
    public List<Reward> getRewards();
    public Reward getReward(Long id);
    public Reward addReward(Reward reward);
    public Reward updateReward(Reward reward);
    public boolean deleteReward(Long id);
}
