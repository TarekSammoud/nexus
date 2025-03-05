package tn.arctic.nexus.controllers.FinanceModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.FinanceModule.Wallet;
import tn.arctic.nexus.services.FinanceModule.WalletService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("wallet")
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
    @GetMapping("/user/{id}")
    public Wallet getWalletByUserId(@PathVariable Long id) {
        return walletService.getWalletsByUserId(id);
    }
    @GetMapping("/update")
    public Wallet updateWallet(Wallet wallet) {
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



}
