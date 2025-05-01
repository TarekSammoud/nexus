package tn.arctic.nexus.controllers.FinanceModule;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.FinanceModule.Payment;
import tn.arctic.nexus.entities.FinanceModule.Purchase;
import tn.arctic.nexus.entities.FinanceModule.Transfer;
import tn.arctic.nexus.services.FinanceModule.PurchaseService;

import java.util.List;

@CrossOrigin(origins = "http://nexus-frontend.frontend.svc.cluster.local:4200")
@RestController
@RequestMapping("purchase")
public class PurchaseController {

    @Autowired
    PurchaseService purchaseService;

    @GetMapping("getAll")
    public List<Purchase> getAll() {
        return purchaseService.getAllPurchases();
    }

    @GetMapping("{id}")
    public Purchase getPurchaseById(@PathVariable Long id) {
        return purchaseService.getPurchaseById(id);
    }

    @PostMapping("create")
    public Purchase createPurchase(@RequestBody Purchase purchase) {
        return purchaseService.createPurchase(purchase);
    }

    @PutMapping("update")
    public Purchase updatePurchase(@RequestBody Purchase purchase) {
        return purchaseService.updatePurchase(purchase);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePurchase(@PathVariable Long id) {
        boolean flag = purchaseService.deletePurchase(id);
        if (flag) {
            return ResponseEntity.ok("Deleted purchase");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Purchase not found"); // Return 404 with message
    }

    @PostMapping("/create-affect/{metamaskPublicKey}")
    public ResponseEntity<Purchase> createAndAffectPurchase(
            @PathVariable String metamaskPublicKey,
            @RequestBody Purchase purchase) {
        try {
            Purchase savedTPurchase = purchaseService.CreateAffectPurchaseToWallet(metamaskPublicKey, purchase);
            return ResponseEntity.ok(savedTPurchase);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PostMapping("/creates-affect/{metamaskPublicKey}")
    public ResponseEntity<List<Purchase>> createAndAffectPurchases(
            @PathVariable String metamaskPublicKey,
            @RequestBody List<Purchase> purchases) {
        try {
            List<Purchase> savedTPurchases = purchaseService.CreateAffectPurchasesToWallet(metamaskPublicKey, purchases);
            return ResponseEntity.ok(savedTPurchases);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/getByWalletPK/{metamaskPublicKey}")
    public ResponseEntity<List<Purchase>> getPaymentsByWalletId(@PathVariable String metamaskPublicKey ) {
        List<Purchase> purchases = purchaseService.getPurchasesByWalletPK(metamaskPublicKey);
        return ResponseEntity.ok(purchases);
    }
}
