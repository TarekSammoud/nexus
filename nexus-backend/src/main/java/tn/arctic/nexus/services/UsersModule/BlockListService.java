package tn.arctic.nexus.services.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.BlockList;
import tn.arctic.nexus.repositories.UsersModule.IBlockListRepository;
import tn.arctic.nexus.repositories.UsersModule.IFriendRequestRepository;

import java.util.List;

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
}
