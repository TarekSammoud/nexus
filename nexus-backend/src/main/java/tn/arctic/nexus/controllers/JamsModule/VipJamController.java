package tn.arctic.nexus.controllers.JamsModule;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.VipJam;
import tn.arctic.nexus.services.JamsModule.IVipJamService;

import java.util.List;

@RestController
@RequestMapping("/api/vip-jams")
@CrossOrigin(origins = "http://nexus-frontend.frontend.svc.cluster.local:4200")
public class VipJamController {

    private final IVipJamService vipJamService;

    @Autowired
    public VipJamController(IVipJamService vipJamService) {
        this.vipJamService = vipJamService;
    }

    @PostMapping("/create")
    public ResponseEntity<VipJam> create(@RequestBody VipJam vipJam) {
        return ResponseEntity.ok(vipJamService.createVipJam(vipJam));
    }

    @GetMapping("/all")
    public List<VipJam> getAll() {
        return vipJamService.getAllVipJams();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<VipJam> update(@PathVariable Long id, @RequestBody VipJam vipJam) {
        return ResponseEntity.ok(vipJamService.updateVipJam(id, vipJam));
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteVipJam(@PathVariable Long id) {
        vipJamService.deleteVipJam(id);
        return ResponseEntity.noContent().build();
    }


}
