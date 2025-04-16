package tn.arctic.nexus.controllers.FinanceModule;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.FinanceModule.Payment;
import tn.arctic.nexus.entities.FinanceModule.Transfer;
import tn.arctic.nexus.services.FinanceModule.TransferService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("transfer")
public class TransferController {

    @Autowired
    TransferService transferService;

    @GetMapping("getAll")
    public List<Transfer> getAll() {
        return transferService.getTransfers();
    }

    @GetMapping("{id}")
    public Transfer getTransferById(@PathVariable Long id) {
        return transferService.getTransfer(id);
    }

    @PostMapping("create")
    public Transfer createTransfer(@RequestBody Transfer transfer) {
        return transferService.createTransfer(transfer);
    }

    @PutMapping("update")
    public Transfer updateTransfer(@RequestBody Transfer transfer) {
        return transferService.updateTransfer(transfer);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTransfer(@PathVariable Long id) {
        boolean flag = transferService.deleteTransfer(id);
        if (flag) {
            return ResponseEntity.ok("Deleted Transfer");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transfer not found"); // Return 404 with message
    }
    @PostMapping("/create-affect/{metamaskPublicKey}")
    public ResponseEntity<Transfer> createAndAffectPayment(
            @PathVariable String metamaskPublicKey,
            @RequestBody Transfer transfer) {
        try {
            Transfer savedTransfer = transferService.CreateAffectTransferToWallet(metamaskPublicKey, transfer);
            return ResponseEntity.ok(savedTransfer);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
