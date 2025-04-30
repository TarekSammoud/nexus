package tn.arctic.nexus.services.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.BlockList;
import tn.arctic.nexus.repositories.UsersModule.IBlockListRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BlockListService implements IBlockListService {

    @Autowired
    private IBlockListRepository iBlockListRepository;

    @Override
    public List<BlockList> retrieveAllBlockList() {
        return iBlockListRepository.findAll();
    }

    @Override
    public BlockList addBlockList(BlockList BlockList) {
        return iBlockListRepository.save(BlockList);
    }

    @Override
    public BlockList retrieveBlockList(long idblock) {
        return iBlockListRepository.findById(idblock).get();
    }

    @Override
    public void removeBlockList(long idblock) {

        iBlockListRepository.deleteById(idblock);
    }

    // Nouvelle méthode pour vérifier si un utilisateur est bloqué
    @Override
    public boolean isUserBlocked(long userId) {
        Optional<BlockList> blockList = iBlockListRepository.findAll().stream()
                .filter(b -> b.getBlockedUser().getId() == userId)
                .findFirst();

        if (blockList.isPresent()) {
            BlockList block = blockList.get();
            // Si la date de fin de blocage est dans le futur, l'utilisateur est bloqué
            return block.getBlockedUntil().after(new Date());
        }
        return false;  // L'utilisateur n'est pas bloqué si il n'est pas trouvé dans la liste
    }
}
