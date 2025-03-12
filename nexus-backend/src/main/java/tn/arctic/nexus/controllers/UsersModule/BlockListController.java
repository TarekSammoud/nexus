package tn.arctic.nexus.controllers.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.BlockList;
import tn.arctic.nexus.entities.FriendRequest;
import tn.arctic.nexus.services.UsersModule.IBlockListService;
import tn.arctic.nexus.services.UsersModule.IFriendRequestService;

import java.util.List;

@RestController
@RequestMapping("/user/BlockList")
public class BlockListController {
    @Autowired
    private IBlockListService   iBlockListService ;

    @GetMapping("/allBlockList")
    public List<BlockList> getAllBlockList() {
        return iBlockListService.retrieveAllBlockList();
    }

    @PostMapping("/addBlockList")
    public BlockList addBlockList(@RequestBody BlockList blockList ) {
        return iBlockListService.addBlockList(blockList);
    }



    @GetMapping("/getBlockList/{id}")
    public BlockList getBlockListById(@PathVariable Long id) {
        return iBlockListService.retrieveBlockList(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBlockList(@PathVariable Long id) {
        iBlockListService.removeBlockList(id);
    }
}
