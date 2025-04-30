package tn.arctic.nexus.controllers.FinanceModule;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.FinanceModule.Payment;
import tn.arctic.nexus.entities.FinanceModule.Transfer;
import tn.arctic.nexus.entities.FinanceModule.Wallet;
import tn.arctic.nexus.services.FinanceModule.PaymentService;
import tn.arctic.nexus.services.FinanceModule.WalletService;

import java.util.List;

@RestController
@RequestMapping("wallet")
@CrossOrigin(origins = "http://localhost:4200")

public class WalletController {

    @Autowired
     WalletService walletService;


    @GetMapping("getAll")
    public List<Wallet> getAll() {
        return walletService.getWallets();
    }
    @GetMapping("{id}")
    public Wallet getWalletById(@PathVariable Long id) {
        return walletService.getWalletsById(id);
    }
    @PostMapping("create")
    public Wallet createWallet(@RequestBody Wallet wallet) {
       return walletService.addWallet(wallet);
    }
    @PutMapping("/update")
    public Wallet updateWallet( @RequestBody Wallet wallet) {
        return walletService.updateWallet(wallet);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteWallet(@PathVariable Long id) {
        boolean flag = walletService.deleteWalletById(id);
        if (flag) {
            return ResponseEntity.ok("Deleted wallet");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Wallet not found"); // Return 404 with message
    }

    @GetMapping("/findByPublicKey/{pK}")
    public Wallet getWalletByPublicKey(@PathVariable String pK) {
        return walletService.findByMetamaskPublicKey(pK);
    }
    @GetMapping("/findByUserId/{userId}")
    public Wallet getWalletByUserId(@PathVariable Long userId) {
        return walletService.findByUserId(userId);
    }
    @PostMapping("/create-affect/{userId}")
    public ResponseEntity<Wallet> d(@PathVariable Long userId ,@RequestBody Wallet wallet) {
        try {
            Wallet wallet1 = walletService.CreateAffectWalletToUser(userId, wallet);
            return ResponseEntity.ok(wallet1);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



}
