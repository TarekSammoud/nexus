package tn.arctic.nexus.services.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.GameKey;
import tn.arctic.nexus.repositories.GamesModule.IGameKeyRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class GameKeyService implements IGameKeyService{
    @Autowired
    IGameKeyRepository gameKeyRepository;

    @Override
    public GameKey createGameKey(GameKey gameKey) {
       // gameKey.setKey(gameKey.generateCode());
        String generatedKey = gameKey.generateCode();

        gameKey.setKeyCode(generatedKey);
        Date now = new Date(); // Current date and time
        long expiresAtTime = now.getTime() + 60L * 24 * 60 * 60 * 1000; // 60 days in milliseconds
        gameKey.setExpiresAt(new Date(expiresAtTime));

        gameKey.setStatus("ACTIVE");
        return gameKeyRepository.save(gameKey);
    }

    @Override
    public void deleteGameKey(Long id) {
        gameKeyRepository.deleteById(id);
    }

    @Override
    public boolean redeemGameKey(String gameKey) {
        GameKey gk = this.gameKeyRepository.findGameKeyByKeyCode(gameKey);
        if (gk != null){
            if (gk.getStatus().equals("ACTIVATED") ) {
                //System.out.println("ERROR KEY");
                return false;
            }
            gk.setStatus("ACTIVATED");
            this.gameKeyRepository.save(gk);
            return true;
        }
        return false;
    }

    @Override
    public List<GameKey> getGameKeys() {
        return (List<GameKey>) gameKeyRepository.findAll();
    }

    @Override
    public GameKey getGameKeyById(Long id) {
        return gameKeyRepository.findById(id).orElse(null);
    }

    @Override
    public GameKey getGameKeyByUserId(Long id) {
        return gameKeyRepository.findGameKeyByUserId(id);
    }
}
