package tn.arctic.nexus.services.GamesModule;

import java.util.Map;

public interface ISpamCheckService {
    public Map<String,Object> checkReview(String reviewText);
}
