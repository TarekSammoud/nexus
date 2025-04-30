package tn.arctic.nexus.services.UsersModule;

import tn.arctic.nexus.entities.BlockList;

import java.util.List;

public interface IBlockListService {

    List<BlockList> retrieveAllBlockList();
    BlockList addBlockList (BlockList BlockList);

    BlockList retrieveBlockList(long idblock);
    void removeBlockList(long idblock);

    // Nouvelle méthode pour vérifier si un utilisateur est bloqué
    boolean isUserBlocked(long userId);
}
