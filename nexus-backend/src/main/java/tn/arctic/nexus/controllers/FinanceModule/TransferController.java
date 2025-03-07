package tn.arctic.nexus.controllers.FinanceModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.FinanceModule.transfer;
import tn.arctic.nexus.services.FinanceModule.TransferService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("transfer")
public class TransferController {

    @Autowired
    TransferService transferService;

    @GetMapping("getAll")
    public List<transfer> getAll() {
        return transferService.getTransfers();
    }

    @GetMapping("{id}")
    public transfer getTransferById(@PathVariable Long id) {
        return transferService.getTransfer(id);
    }

    @PostMapping("create")
    public transfer createTransfer(@RequestBody transfer transfer) {
        return transferService.createTransfer(transfer);
    }

    @PutMapping("update")
    public transfer updateTransfer(@RequestBody transfer transfer) {
        return transferService.updateTransfer(transfer);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTransfer(@PathVariable Long id) {
        boolean flag = transferService.deleteTransfer(id);
        if (flag) {
            return ResponseEntity.ok("Deleted transfer");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transfer not found"); // Return 404 with message
    }
}
